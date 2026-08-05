import test from "node:test";
import assert from "node:assert/strict";

import { GENESIS_SCENE_GRAPH } from "./sceneGraph";

test("Genesis keeps a single authoritative scene graph", () => {
  const ids = GENESIS_SCENE_GRAPH.map((layer) => layer.id);

  assert.deepEqual(ids, [
    "cosmos",
    "ocean",
    "core",
    "core-atmosphere",
    "core-memory-veins",
  ]);

  assert.equal(new Set(ids).size, ids.length);
  assert.equal(ids.filter((id) => id === "core").length, 1);
  assert.equal(ids.filter((id) => id === "ocean").length, 1);
});
