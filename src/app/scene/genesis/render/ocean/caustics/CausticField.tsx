/**
 * ==========================================================
 * LÉLUVERSE
 * CAUSTIC FIELD
 *
 * Primary animated caustic network.
 *
 * Responsibilities
 * ----------------
 * • Surface caustic patches
 * • Midwater caustics
 * • Deep caustic shimmer
 * ==========================================================
 */

import { Group } from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import type { OceanState } from "../Ocean";

import MidwaterPatches from "./field/MidwaterPatches";
import DeepPatches from "./field/DeepPatches";

interface Props {
  oceanState?: OceanState;
}

export default function CausticField({
  oceanState = {},
}: Props) {

  const root = useRef<Group>(null);

  useFrame((_, delta) => {

    if (!root.current) return;

    const tide =
      oceanState.tide ?? 0.5;

    root.current.rotation.y +=
      delta *
      0.005 *
      tide;

  });

  return (

    <group ref={root}>

      <MidwaterPatches
        oceanState={oceanState}
      />

      <DeepPatches
        oceanState={oceanState}
      />

    </group>

  );

}