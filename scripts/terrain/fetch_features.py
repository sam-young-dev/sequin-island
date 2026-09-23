"""Fetch map features (points of interest, trails, buildings) for the island map.

Queries OpenStreetMap through the Overpass API and projects everything onto
the same UTM grid as the terrain produced by fetch_terrain.py, so run that
first (this script reads public/terrain/terrain.json for the extent).

Output (public/terrain/features.json), all coordinates in metres from the
south-west corner of the terrain extent ([east, north]):
  points     named places, keyed to match the copy in src/data/island-map.ts
  lines      tramway and trails
  buildings  footprints with a height for simple extrusion

OSM data is (c) OpenStreetMap contributors, ODbL. The site must credit it.

Usage:  python scripts/terrain/fetch_features.py [--refresh]
"""

import argparse
import json
import sys
import urllib.parse
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from fetch_terrain import CACHE_DIR, ISLAND_BOUNDS, OUT_DIR, ROOT, USER_AGENT, to_utm19  # noqa: E402

OVERPASS_URL = "https://overpass-api.de/api/interpreter"

# Named places to label, by OSM element. Keys must match src/data/island-map.ts.
POINTS = {
    "lighthouse": ("way", 1217645105),
    "museum": ("node", 7481901167),
    "fog-signal": ("way", 800024616),
    "oil-house": ("way", 800024617),
    "tramway": ("way", 800024609),
    "landing": ("node", 7481901568),
    "boat-house": ("way", 800024591),
    "cobble-beach": ("relation", 11068158),
}

DEFAULT_BUILDING_HEIGHT_M = 5.0
LIGHTHOUSE_HEIGHT_M = 16.0  # OSM tag on Seguin Light; used if the tag is missing


def overpass(refresh):
    cache = CACHE_DIR / "osm.json"
    if cache.exists() and not refresh:
        print(f"  cached: {cache.name}")
        return json.loads(cache.read_text())
    b = ISLAND_BOUNDS
    bbox = f"{b['south']},{b['west']},{b['north']},{b['east']}"
    query = f"""
[out:json][timeout:60];
(
  nwr({bbox})["name"];
  way({bbox})["building"];
  way({bbox})["man_made"="lighthouse"];
  way({bbox})["highway"~"path|footway|steps|track"];
  way({bbox})["railway"];
  relation(11068158);
);
out tags geom;
"""
    data = urllib.parse.urlencode({"data": query}).encode()
    req = urllib.request.Request(OVERPASS_URL, data=data, headers={"User-Agent": USER_AGENT})
    print("  querying Overpass")
    with urllib.request.urlopen(req, timeout=120) as resp:
        result = json.load(resp)
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    cache.write_text(json.dumps(result))
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--refresh", action="store_true", help="re-query Overpass instead of using the cache")
    args = parser.parse_args()

    terrain = json.loads((OUT_DIR / "terrain.json").read_text())
    ext = terrain["extent"]

    def local(lat, lon):
        x, y = to_utm19(lat, lon)
        return [round(x - ext["xmin"], 2), round(y - ext["ymin"], 2)]

    elements = overpass(args.refresh)["elements"]
    by_id = {(e["type"], e["id"]): e for e in elements}

    points = {}
    for key, ref in POINTS.items():
        el = by_id.get(ref)
        if el is None:
            sys.exit(f"OSM element {ref} for '{key}' not found; update POINTS")
        if "lat" in el:
            points[key] = local(el["lat"], el["lon"])
        else:  # "geom" output gives ways/relations bounds rather than a center
            bb = el["bounds"]
            points[key] = local((bb["minlat"] + bb["maxlat"]) / 2, (bb["minlon"] + bb["maxlon"]) / 2)

    lines = []
    buildings = []
    for el in elements:
        if el["type"] != "way" or "geometry" not in el:
            continue
        tags = el.get("tags", {})
        coords = [local(p["lat"], p["lon"]) for p in el["geometry"]]
        closed = len(coords) > 2 and coords[0] == coords[-1]
        if "railway" in tags:
            lines.append({"kind": "tramway", "name": tags.get("name"), "coords": coords})
        elif tags.get("highway") in ("path", "footway", "steps", "track"):
            lines.append({"kind": "trail", "name": tags.get("name"), "coords": coords})
        elif tags.get("man_made") == "lighthouse":
            height = float(tags.get("height", LIGHTHOUSE_HEIGHT_M))
            buildings.append({"kind": "lighthouse", "name": tags.get("name"), "height": height, "coords": coords[:-1] if closed else coords})
        elif "building" in tags and closed:
            height = float(tags.get("height", DEFAULT_BUILDING_HEIGHT_M))
            buildings.append({"kind": "building", "name": tags.get("name"), "height": height, "coords": coords[:-1]})

    out = {
        "attribution": "© OpenStreetMap contributors (ODbL)",
        "units": "metres east/north of the terrain extent's south-west corner",
        "points": points,
        "lines": lines,
        "buildings": buildings,
    }
    dest = OUT_DIR / "features.json"
    dest.write_text(json.dumps(out, separators=(",", ":")) + "\n")
    print(f"  {len(points)} points, {len(lines)} lines, {len(buildings)} buildings")
    print(f"  wrote {dest.relative_to(ROOT)} ({dest.stat().st_size / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
