// Places labelled on the 3D island map. Keys match the "points" in
// public/terrain/features.json (see scripts/terrain/fetch_features.py).
export interface MapPlace {
  key: string;
  name: string;
  description: string;
}

export const mapPlaces: MapPlace[] = [
  {
    key: "lighthouse",
    name: "Seguin Light",
    description:
      "The granite tower, built in 1857, stands on the island's summit and is Maine's highest lighthouse above sea level. It still shows its first-order Fresnel lens.",
  },
  {
    key: "museum",
    name: "Keeper's House Museum",
    description:
      "The 1857 keeper's house is attached to the tower and now holds the museum and gift shop. The volunteer caretakers live here during the summer season.",
  },
  {
    key: "fog-signal",
    name: "Fog Signal House",
    description:
      "Seguin is one of the foggiest places on the coast. The fog signal house held the equipment that sounded the horn when the light couldn't be seen.",
  },
  {
    key: "oil-house",
    name: "Oil House",
    description:
      "The lamp's fuel was stored in this small building, set apart from the other buildings because of the fire risk.",
  },
  {
    key: "tramway",
    name: "Tramway",
    description:
      "The steep tramway was built to haul supplies up from the boathouse to the light station. Its track runs straight up the hillside from the cove.",
  },
  {
    key: "landing",
    name: "Landing",
    description:
      "Visitors come ashore in the cove between the main island and its eastern lobe. From here, a trail climbs to the light station.",
  },
  {
    key: "boat-house",
    name: "Boat House",
    description: "The boat house sits at the bottom of the tramway, just above the landing in the cove.",
  },
  {
    key: "cobble-beach",
    name: "Cobble Beach",
    description: "This beach of rounded stones faces east, just south of the eastern lobe. The Cobble Beach Trail leads down to it.",
  },
];
