export interface GenesisSceneLayer {
  id: string;
  label: string;
  parent: string | null;
}

export const GENESIS_SCENE_GRAPH: GenesisSceneLayer[] = [
  { id: "cosmos", label: "Cosmos", parent: null },
  { id: "ocean", label: "Ocean", parent: "cosmos" },
  { id: "core", label: "Genesis Core", parent: "ocean" },
  { id: "core-atmosphere", label: "Core Atmosphere", parent: "core" },
  { id: "core-memory-veins", label: "Core Memory Veins", parent: "core" },
];
