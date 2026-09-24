// Three.js scene for the 3D island map. Loaded on demand by IslandMap.astro.
//
// Scene units are metres. x runs east, z runs south, y is up. Terrain data
// comes from public/terrain/ (scripts/terrain/fetch_terrain.py and
// fetch_features.py); feature coordinates are metres east/north of the
// terrain's south-west corner.
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const TERRAIN_URL = "/terrain/terrain.json";
const FEATURES_URL = "/terrain/features.json";
const BASE_URL = "/terrain/";

const VERTICAL_EXAGGERATION = 1.4;
const SEA_LEVEL = 0;
const SKY_COLOR = 0xd6e2e8;
const WATER_COLOR = 0x3f6f86;
const LABEL_HEIGHT = { lighthouse: 19, default: 9 } as const;
const FLY_DURATION_MS = 1200;
const FOCUS_DISTANCE = 220;

interface TerrainMeta {
  width: number;
  height: number;
  elevation: { min: number; max: number };
  heightmap: { file: string };
  aerial: { file: string };
}

type Coord = [number, number];

interface Features {
  points: Record<string, Coord>;
  lines: { kind: "tramway" | "trail"; name: string | null; coords: Coord[] }[];
  buildings: { kind: "lighthouse" | "building"; name: string | null; height: number; coords: Coord[] }[];
}

export interface IslandMapOptions {
  /** Label elements to pin to the map, each with a data-place key from features.json. */
  labels: HTMLElement[];
  onSelect: (key: string | null) => void;
}

export interface IslandMap {
  select: (key: string | null) => void;
  resetView: () => void;
  dispose: () => void;
}

export async function createIslandMap(container: HTMLElement, options: IslandMapOptions): Promise<IslandMap> {
  // Throws if WebGL is unavailable; the caller shows a fallback.
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });

  let meta: TerrainMeta, features: Features, heights: Float32Array, aerial: THREE.Texture;
  try {
    [meta, features] = await Promise.all([fetchJson<TerrainMeta>(TERRAIN_URL), fetchJson<Features>(FEATURES_URL)]);
    [heights, aerial] = await Promise.all([
      loadHeights(BASE_URL + meta.heightmap.file, meta),
      new THREE.TextureLoader().loadAsync(BASE_URL + meta.aerial.file),
    ]);
  } catch (error) {
    // Free the GPU context so a retry doesn't stack up renderers.
    renderer.forceContextLoss();
    renderer.dispose();
    throw error;
  }

  const W = meta.width;
  const H = meta.height;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Scene position of a point given in metres east/north of the south-west corner. */
  const toScene = (east: number, north: number, y = 0) => new THREE.Vector3(east - W / 2, y, H / 2 - north);

  /** Exaggerated ground height at a point, bilinearly sampled from the 1 m grid. */
  const groundAt = (east: number, north: number) => {
    const px = clamp(east - 0.5, 0, W - 1);
    const py = clamp(H - north - 0.5, 0, H - 1);
    const x0 = Math.floor(px);
    const y0 = Math.floor(py);
    const x1 = Math.min(x0 + 1, W - 1);
    const y1 = Math.min(y0 + 1, H - 1);
    const fx = px - x0;
    const fy = py - y0;
    const top = heights[y0 * W + x0] * (1 - fx) + heights[y0 * W + x1] * fx;
    const bottom = heights[y1 * W + x0] * (1 - fx) + heights[y1 * W + x1] * fx;
    return (top * (1 - fy) + bottom * fy) * VERTICAL_EXAGGERATION;
  };

  // Renderer, scene, camera ------------------------------------------------
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.classList.add("island-map__canvas");
  container.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(SKY_COLOR);
  scene.fog = new THREE.Fog(SKY_COLOR, 2200, 7000);

  const camera = new THREE.PerspectiveCamera(40, 1, 5, 12000);

  scene.add(new THREE.HemisphereLight(0xeef4ff, 0x6a6352, 2.4));
  // High sun from the south-west, so walls facing the default south-east view are lit.
  const sun = new THREE.DirectionalLight(0xfff4e0, 2.2);
  sun.position.set(-500, 1000, 500);
  scene.add(sun);

  // Terrain ------------------------------------------------------------------
  // A 2 m mesh keeps the vertex count reasonable; phones get 3 m.
  const step = container.clientWidth < 700 ? 3 : 2;
  const terrainGeometry = new THREE.PlaneGeometry(W, H, Math.round(W / step), Math.round(H / step));
  terrainGeometry.rotateX(-Math.PI / 2);
  const pos = terrainGeometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    pos.setY(i, groundAt(pos.getX(i) + W / 2, H / 2 - pos.getZ(i)));
  }
  terrainGeometry.computeVertexNormals();

  aerial.colorSpace = THREE.SRGBColorSpace;
  aerial.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const terrain = new THREE.Mesh(terrainGeometry, new THREE.MeshStandardMaterial({ map: aerial, roughness: 1 }));
  scene.add(terrain);

  // The lidar is flattened to -1 m over water, so an opaque sea at 0 m hides
  // the photo's water and the square edge of the terrain.
  const water = new THREE.Mesh(
    new THREE.PlaneGeometry(20000, 20000),
    new THREE.MeshStandardMaterial({ color: WATER_COLOR, roughness: 0.45, metalness: 0.1 }),
  );
  water.rotation.x = -Math.PI / 2;
  water.position.y = SEA_LEVEL;
  scene.add(water);

  // Buildings (the lidar ground model has none) -----------------------------
  const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xf3efe6, roughness: 0.9 });
  const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8c3b2c, roughness: 0.8 });
  let beam: THREE.Object3D | null = null;

  for (const building of features.buildings) {
    const grounds = building.coords.map(([e, n]) => groundAt(e, n));
    const base = Math.min(...grounds) - 1;
    const top = Math.max(...grounds);

    if (building.kind === "lighthouse") {
      const lighthouse = buildLighthouse(building.coords, building.height);
      const [cx, cy] = centroid(building.coords);
      lighthouse.tower.position.copy(toScene(cx, cy, groundAt(cx, cy)));
      scene.add(lighthouse.tower);
      beam = reducedMotion ? null : lighthouse.beam;
      if (!beam) lighthouse.beam.visible = false;
      continue;
    }

    // Shape y is north so that rotating the extrusion upright puts it at -z.
    const shape = new THREE.Shape(building.coords.map(([e, n]) => new THREE.Vector2(e - W / 2, n - H / 2)));
    const geometry = new THREE.ExtrudeGeometry(shape, { depth: top - base + building.height, bevelEnabled: false });
    geometry.rotateX(-Math.PI / 2);
    geometry.translate(0, base, 0);
    // ExtrudeGeometry groups: 0 = end caps (roof and floor), 1 = walls.
    scene.add(new THREE.Mesh(geometry, [roofMaterial, wallMaterial]));
  }

  // Tramway and trails, draped over the ground --------------------------------
  const trailMaterial = new THREE.MeshStandardMaterial({ color: 0xeadcb8, roughness: 1 });
  const tramwayMaterial = new THREE.MeshStandardMaterial({ color: 0x4a2418, roughness: 0.7 });
  for (const line of features.lines) {
    const points = densify(line.coords, 1.5).map(([e, n]) => toScene(e, n, groundAt(e, n) + 0.8));
    if (points.length < 2) continue;
    const curve = new THREE.CatmullRomCurve3(points);
    const isTramway = line.kind === "tramway";
    const geometry = new THREE.TubeGeometry(curve, points.length * 2, isTramway ? 0.8 : 0.45, 5, false);
    scene.add(new THREE.Mesh(geometry, isTramway ? tramwayMaterial : trailMaterial));
  }

  // Labels -------------------------------------------------------------------
  const anchors = new Map<string, THREE.Vector3>();
  for (const [key, [e, n]] of Object.entries(features.points)) {
    const lift = key === "lighthouse" ? LABEL_HEIGHT.lighthouse : LABEL_HEIGHT.default;
    anchors.set(key, toScene(e, n, Math.max(groundAt(e, n), SEA_LEVEL) + lift));
  }
  const labels = options.labels.filter((el) => anchors.has(el.dataset.place ?? ""));
  const labelClick = (event: Event) => {
    const key = (event.currentTarget as HTMLElement).dataset.place ?? null;
    select(key);
    options.onSelect(key);
  };
  labels.forEach((el) => el.addEventListener("click", labelClick));

  // Labels are laid out in priority order (the selected one first, then the
  // order given) and any that would overlap an earlier one are hidden, so the
  // zoomed-out view shows the main places and zooming in reveals the rest.
  const projected = new THREE.Vector3();
  const labelSizes = new Map<HTMLElement, [number, number]>();
  const labelSize = (el: HTMLElement): [number, number] => {
    let size = labelSizes.get(el);
    if (!size) {
      size = [el.offsetWidth, el.offsetHeight];
      if (size[0]) labelSizes.set(el, size); // 0 until the labels are shown
    }
    return size;
  };
  let selectedKey: string | null = null;
  const updateLabels = () => {
    const { clientWidth: w, clientHeight: h } = container;
    const placed: DOMRect[] = [];
    const ordered = [...labels].sort((a, b) => Number(b.dataset.place === selectedKey) - Number(a.dataset.place === selectedKey));
    for (const el of ordered) {
      projected.copy(anchors.get(el.dataset.place!)!).project(camera);
      let visible = projected.z < 1 && Math.abs(projected.x) < 1.1 && Math.abs(projected.y) < 1.1;
      if (visible) {
        const x = ((projected.x + 1) / 2) * w;
        const y = ((1 - projected.y) / 2) * h;
        // The label is centred above its anchor (see .island-map__label).
        const [lw, lh] = labelSize(el);
        const rect = new DOMRect(x - lw / 2 - 4, y - lh - 4, lw + 8, lh + 8);
        visible = !placed.some((other) => overlaps(rect, other));
        if (visible) {
          placed.push(rect);
          el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
        }
      }
      el.style.visibility = visible ? "visible" : "hidden";
    }
  };

  // Controls and camera moves ---------------------------------------------------
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.screenSpacePanning = false;
  controls.minDistance = 60;
  controls.maxDistance = 2800;
  controls.maxPolarAngle = 1.42; // stop just above the horizon
  controls.zoomToCursor = true;

  const homeTarget = toScene(W / 2, H / 2, 10);
  // Back off on narrow (portrait) screens so the whole island still fits.
  const homePosition = () => {
    const aspect = container.clientWidth / Math.max(container.clientHeight, 1);
    const scale = clamp(1.3 / aspect, 1, 2);
    return homeTarget.clone().addScaledVector(new THREE.Vector3(300, 620, 860), scale);
  };
  camera.position.copy(homePosition());
  controls.target.copy(homeTarget);

  // Keep the orbit centre over the map so the island can't be panned away.
  const bounds = new THREE.Box3(toScene(0, H, 0), toScene(W, 0, 120));
  controls.addEventListener("change", () => {
    const clamped = controls.target.clone().clamp(bounds.min, bounds.max);
    if (!clamped.equals(controls.target)) {
      camera.position.add(clamped.clone().sub(controls.target));
      controls.target.copy(clamped);
    }
  });

  let flight: {
    start: number;
    fromTarget: THREE.Vector3;
    toTarget: THREE.Vector3;
    fromPosition: THREE.Vector3;
    toPosition: THREE.Vector3;
  } | null = null;
  controls.addEventListener("start", () => (flight = null));

  const flyTo = (toTarget: THREE.Vector3, toPosition: THREE.Vector3) => {
    if (reducedMotion) {
      controls.target.copy(toTarget);
      camera.position.copy(toPosition);
      return;
    }
    flight = {
      start: performance.now(),
      fromTarget: controls.target.clone(),
      toTarget,
      fromPosition: camera.position.clone(),
      toPosition,
    };
  };

  function select(key: string | null) {
    selectedKey = key;
    labels.forEach((el) => el.toggleAttribute("data-selected", el.dataset.place === key));
    const anchor = key ? anchors.get(key) : null;
    if (!anchor) return;
    // Keep the current viewing direction, but not so flat that hills block the view.
    const target = anchor.clone().setY(anchor.y - 6);
    const direction = camera.position.clone().sub(controls.target).normalize();
    direction.y = Math.max(direction.y, 0.35);
    direction.normalize();
    flyTo(target, target.clone().addScaledVector(direction, FOCUS_DISTANCE));
  }

  const resetView = () => {
    select(null);
    flyTo(homeTarget.clone(), homePosition());
  };

  // Render loop ------------------------------------------------------------------
  const resize = () => {
    const { clientWidth: w, clientHeight: h } = container;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();

  const timer = new THREE.Timer();
  const frame = (time: number) => {
    timer.update(time);
    if (flight) {
      const t = Math.min((performance.now() - flight.start) / FLY_DURATION_MS, 1);
      const k = easeInOutCubic(t);
      controls.target.lerpVectors(flight.fromTarget, flight.toTarget, k);
      camera.position.lerpVectors(flight.fromPosition, flight.toPosition, k);
      if (t === 1) flight = null;
    }
    if (beam) beam.rotation.y -= timer.getDelta() * 0.6;
    controls.update();
    renderer.render(scene, camera);
    updateLabels();
  };

  // Only animate while the map is on screen.
  const visibility = new IntersectionObserver(([entry]) => {
    renderer.setAnimationLoop(entry.isIntersecting ? frame : null);
  });
  visibility.observe(container);

  return {
    select,
    resetView,
    dispose() {
      visibility.disconnect();
      resizeObserver.disconnect();
      renderer.setAnimationLoop(null);
      labels.forEach((el) => el.removeEventListener("click", labelClick));
      controls.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          for (const material of [object.material].flat()) material.dispose();
        }
      });
      aerial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}

/** Tapered white tower with a dark lantern and a slowly sweeping beam. */
function buildLighthouse(ring: Coord[], height: number) {
  const [cx, cy] = centroid(ring);
  const radius = ring.reduce((sum, [e, n]) => sum + Math.hypot(e - cx, n - cy), 0) / ring.length;

  const tower = new THREE.Group();
  const white = new THREE.MeshStandardMaterial({ color: 0xf7f5ef, roughness: 0.7 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x1f2326, roughness: 0.5, metalness: 0.4 });
  const lamp = new THREE.MeshStandardMaterial({ color: 0xfff1b8, emissive: 0xffd36b, emissiveIntensity: 1.5 });

  const shaftHeight = height - 3.5;
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.8, radius, shaftHeight + 1, 24), white);
  shaft.position.y = (shaftHeight + 1) / 2 - 1;
  const gallery = new THREE.Mesh(new THREE.CylinderGeometry(radius * 1.05, radius * 1.05, 0.5, 24), dark);
  gallery.position.y = shaftHeight;
  const glass = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.55, radius * 0.55, 2, 16), lamp);
  glass.position.y = shaftHeight + 1.25;
  const roof = new THREE.Mesh(new THREE.ConeGeometry(radius * 0.7, 1.5, 16), dark);
  roof.position.y = shaftHeight + 3;
  tower.add(shaft, gallery, glass, roof);

  // Two opposed beams, like a rotating lens. Additive and fog-free so they glow.
  const beam = new THREE.Group();
  beam.position.y = glass.position.y;
  const beamLength = 280;
  const beamGeometry = new THREE.ConeGeometry(9, beamLength, 24, 8, true);
  beamGeometry.translate(0, -beamLength / 2, 0);
  // Fade from the lantern outwards: with additive blending, black is invisible.
  const beamPos = beamGeometry.attributes.position;
  const fade = new Float32Array(beamPos.count * 3);
  for (let i = 0; i < beamPos.count; i++) {
    const k = (1 + beamPos.getY(i) / beamLength) ** 2;
    fade.set([k, k * 0.95, k * 0.8], i * 3);
  }
  beamGeometry.setAttribute("color", new THREE.BufferAttribute(fade, 3));
  beamGeometry.rotateZ(Math.PI / 2);
  const beamMaterial = new THREE.MeshBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
    fog: false,
  });
  for (const angle of [0, Math.PI]) {
    const cone = new THREE.Mesh(beamGeometry, beamMaterial);
    cone.rotation.y = angle;
    beam.add(cone);
  }
  tower.add(beam);

  return { tower, beam };
}

/** Decode the RG-packed heightmap into metres. */
async function loadHeights(url: string, meta: TerrainMeta): Promise<Float32Array> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to load ${url}: ${response.status}`);
  // Skip colour management so the packed channel values come through exactly.
  const bitmap = await createImageBitmap(await response.blob(), {
    colorSpaceConversion: "none",
    premultiplyAlpha: "none",
  });
  const canvas = document.createElement("canvas");
  canvas.width = meta.width;
  canvas.height = meta.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  const { data } = ctx.getImageData(0, 0, meta.width, meta.height);

  const { min, max } = meta.elevation;
  const scale = (max - min) / 65535;
  const heights = new Float32Array(meta.width * meta.height);
  for (let i = 0; i < heights.length; i++) {
    heights[i] = min + (data[i * 4] * 256 + data[i * 4 + 1]) * scale;
  }
  return heights;
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to load ${url}: ${response.status}`);
  return response.json();
}

/** Add points along each segment so draped lines follow the ground. */
function densify(coords: Coord[], spacing: number): Coord[] {
  const out: Coord[] = [coords[0]];
  for (let i = 1; i < coords.length; i++) {
    const [x0, y0] = coords[i - 1];
    const [x1, y1] = coords[i];
    const steps = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0) / spacing));
    for (let s = 1; s <= steps; s++) {
      out.push([x0 + ((x1 - x0) * s) / steps, y0 + ((y1 - y0) * s) / steps]);
    }
  }
  return out;
}

function overlaps(a: DOMRect, b: DOMRect) {
  return a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
}

function centroid(coords: Coord[]): Coord {
  const sum = coords.reduce(([sx, sy], [x, y]) => [sx + x, sy + y], [0, 0]);
  return [sum[0] / coords.length, sum[1] / coords.length];
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}
