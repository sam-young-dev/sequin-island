"""Fetch and prepare terrain data for the interactive Seguin Island map.

Pulls public-domain USGS data, already cropped and reprojected server-side
(so no GDAL install is needed):
  - Elevation: USGS 3DEP lidar-derived DEM (3DEPElevation ImageServer)
  - Imagery:   USGS NAIP aerial photography (USGSNAIPImagery ImageServer)

Both are requested for the same UTM zone 19N (NAD83, EPSG:26919) box, so a
pixel in the heightmap lines up with the same spot in the aerial photo.

Outputs (public/terrain/):
  heightmap.png  16-bit elevation packed into R (high byte) + G (low byte).
                 Browsers decode PNGs to 8 bits per channel, so a true 16-bit
                 grayscale PNG would lose precision when read via canvas.
                 elevation_m = min + (R * 256 + G) / 65535 * (max - min)
  aerial.jpg     NAIP imagery covering the same extent.
  terrain.json   Extent, resolution, elevation range, and decoding info.

Also writes heightmap-preview.png and hillshade-preview.png to the cache dir
for eyeballing the result.

Usage:  python scripts/terrain/fetch_terrain.py [--refresh]
Requires: Python 3.9+, numpy, Pillow.
"""

import argparse
import json
import math
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
CACHE_DIR = Path(__file__).resolve().parent / ".cache"
OUT_DIR = ROOT / "public" / "terrain"

# Island bounds from the OpenStreetMap "Seguin Island" relation (11068163).
ISLAND_BOUNDS = {"south": 43.7038448, "west": -69.7606243, "north": 43.7131628, "east": -69.7541068}
MARGIN_M = 200  # open water to include around the island
DEM_RES_M = 1.0  # 3DEP lidar DEMs along the Maine coast are 1 m
AERIAL_SCALE = 2  # aerial pixels per DEM pixel (~0.5 m imagery)
WATER_FLOOR_M = -1.0  # lidar is hydro-flattened; clamp water noise to this

UTM_EPSG = 26919
DEM_SERVICE = "https://elevation.nationalmap.gov/arcgis/rest/services/3DEPElevation/ImageServer/exportImage"
NAIP_SERVICE = "https://imagery.nationalmap.gov/arcgis/rest/services/USGSNAIPImagery/ImageServer/exportImage"
USER_AGENT = "seguin-island-terrain/1.0"


def to_utm19(lat, lon):
    """Project GRS80 lat/lon to UTM zone 19N easting/northing in metres."""
    a, f, k0 = 6378137.0, 1 / 298.257222101, 0.9996
    e2 = f * (2 - f)
    ep2 = e2 / (1 - e2)
    phi, lam = math.radians(lat), math.radians(lon - (-69.0))

    n = a / math.sqrt(1 - e2 * math.sin(phi) ** 2)
    t = math.tan(phi) ** 2
    c = ep2 * math.cos(phi) ** 2
    aa = math.cos(phi) * lam
    m = a * (
        (1 - e2 / 4 - 3 * e2**2 / 64 - 5 * e2**3 / 256) * phi
        - (3 * e2 / 8 + 3 * e2**2 / 32 + 45 * e2**3 / 1024) * math.sin(2 * phi)
        + (15 * e2**2 / 256 + 45 * e2**3 / 1024) * math.sin(4 * phi)
        - (35 * e2**3 / 3072) * math.sin(6 * phi)
    )
    x = k0 * n * (aa + (1 - t + c) * aa**3 / 6 + (5 - 18 * t + t**2 + 72 * c - 58 * ep2) * aa**5 / 120)
    y = k0 * (
        m
        + n * math.tan(phi) * (
            aa**2 / 2
            + (5 - t + 9 * c + 4 * c**2) * aa**4 / 24
            + (61 - 58 * t + t**2 + 600 * c - 330 * ep2) * aa**6 / 720
        )
    )
    return x + 500000.0, y


def utm_extent():
    corners = [
        to_utm19(ISLAND_BOUNDS[lat], ISLAND_BOUNDS[lon])
        for lat in ("south", "north")
        for lon in ("west", "east")
    ]
    xs, ys = [c[0] for c in corners], [c[1] for c in corners]
    return {
        "xmin": math.floor(min(xs) - MARGIN_M),
        "ymin": math.floor(min(ys) - MARGIN_M),
        "xmax": math.ceil(max(xs) + MARGIN_M),
        "ymax": math.ceil(max(ys) + MARGIN_M),
    }


def export_image(service, extent, width, height, params, dest, refresh):
    if dest.exists() and not refresh:
        print(f"  cached: {dest.name}")
        return
    query = {
        "bbox": f"{extent['xmin']},{extent['ymin']},{extent['xmax']},{extent['ymax']}",
        "bboxSR": UTM_EPSG,
        "imageSR": UTM_EPSG,
        "size": f"{width},{height}",
        "f": "json",
        **params,
    }
    meta = fetch_json(f"{service}?{urllib.parse.urlencode(query)}")
    if "href" not in meta:
        sys.exit(f"Export failed for {dest.name}: {meta}")
    got = meta["extent"]
    if any(abs(got[k] - extent[k]) > 0.01 for k in extent):
        sys.exit(f"Server adjusted the extent for {dest.name}: {got}")
    print(f"  downloading {dest.name} ({width}x{height})")
    download(meta["href"], dest)


def fetch_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=120) as resp:
        return json.load(resp)


def download(url, dest, attempts=4):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    for attempt in range(1, attempts + 1):
        try:
            with urllib.request.urlopen(req, timeout=300) as resp:
                dest.write_bytes(resp.read())
            return
        except urllib.error.HTTPError as err:
            # The output directory is sometimes a few seconds behind the export.
            if attempt == attempts or err.code < 500:
                raise
            print(f"  HTTP {err.code}, retrying ({attempt}/{attempts - 1})")
            time.sleep(3 * attempt)


def hillshade(dem, res, azimuth=315.0, altitude=45.0):
    dy, dx = np.gradient(dem, res)
    slope = np.arctan(np.hypot(dx, dy))
    aspect = np.arctan2(-dx, dy)
    az, alt = math.radians(360 - azimuth + 90), math.radians(altitude)
    shade = np.sin(alt) * np.cos(slope) + np.cos(alt) * np.sin(slope) * np.cos(az - aspect)
    return np.clip(shade * 255, 0, 255).astype(np.uint8)


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--refresh", action="store_true", help="re-download instead of using cached rasters")
    args = parser.parse_args()

    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    extent = utm_extent()
    width = round((extent["xmax"] - extent["xmin"]) / DEM_RES_M)
    height = round((extent["ymax"] - extent["ymin"]) / DEM_RES_M)
    print(f"Extent (EPSG:{UTM_EPSG}): {extent}  ->  {width}x{height} m")

    dem_path = CACHE_DIR / "dem.tif"
    aerial_path = CACHE_DIR / "aerial.jpg"
    export_image(
        DEM_SERVICE, extent, width, height,
        {"format": "tiff", "pixelType": "F32", "noData": -9999,
         "interpolation": "RSP_BilinearInterpolation"},
        dem_path, args.refresh,
    )
    export_image(
        NAIP_SERVICE, extent, width * AERIAL_SCALE, height * AERIAL_SCALE,
        {"format": "jpg", "compressionQuality": 90, "bandIds": "0,1,2",
         "interpolation": "RSP_BilinearInterpolation"},
        aerial_path, args.refresh,
    )

    dem = np.array(Image.open(dem_path), dtype=np.float32)
    nodata = dem <= -9000
    if nodata.any():
        print(f"  {nodata.mean():.1%} nodata pixels -> treated as water")
    dem[nodata] = WATER_FLOOR_M
    dem = np.maximum(dem, WATER_FLOOR_M)

    hmin, hmax = float(dem.min()), float(dem.max())
    peak_row, peak_col = np.unravel_index(np.argmax(dem), dem.shape)
    print(f"  elevation {hmin:.2f} m .. {hmax:.2f} m (peak at px {peak_col},{peak_row})")

    encoded = np.round((dem - hmin) / (hmax - hmin) * 65535).astype(np.uint32)
    rgb = np.zeros((*dem.shape, 3), dtype=np.uint8)
    rgb[..., 0] = encoded >> 8
    rgb[..., 1] = encoded & 0xFF
    Image.fromarray(rgb, "RGB").save(OUT_DIR / "heightmap.png", optimize=True)

    Image.open(aerial_path).convert("RGB").save(OUT_DIR / "aerial.jpg", quality=85, optimize=True, progressive=True)

    meta = {
        "name": "Seguin Island",
        "crs": f"EPSG:{UTM_EPSG}",
        "extent": extent,
        "width": width,
        "height": height,
        "metersPerPixel": DEM_RES_M,
        "elevation": {"min": round(hmin, 3), "max": round(hmax, 3), "units": "m"},
        "heightmap": {
            "file": "heightmap.png",
            "encoding": "elevation = min + (R * 256 + G) / 65535 * (max - min)",
        },
        "aerial": {"file": "aerial.jpg", "width": width * AERIAL_SCALE, "height": height * AERIAL_SCALE},
        "sources": {
            "elevation": "USGS 3D Elevation Program (3DEP), public domain",
            "imagery": "USGS National Agriculture Imagery Program (NAIP), public domain",
            "bounds": "OpenStreetMap contributors (ODbL), relation 11068163",
        },
    }
    (OUT_DIR / "terrain.json").write_text(json.dumps(meta, indent=2) + "\n")

    scaled = ((dem - hmin) / (hmax - hmin) * 255).astype(np.uint8)
    Image.fromarray(scaled, "L").save(CACHE_DIR / "heightmap-preview.png")
    Image.fromarray(hillshade(dem, DEM_RES_M), "L").save(CACHE_DIR / "hillshade-preview.png")

    for p in sorted(OUT_DIR.iterdir()):
        print(f"  wrote {p.relative_to(ROOT)} ({p.stat().st_size / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
