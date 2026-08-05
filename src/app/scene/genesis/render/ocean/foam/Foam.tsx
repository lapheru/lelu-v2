/**
 * ==========================================================
 * LÉLUVERSE
 * FOAM
 *
 * Master renderer for every foam system.
 *
 * Responsibilities
 * ----------------
 * • Surface whitecaps
 * • Crest foam
 * • Shore foam
 * • Bubble spray
 * • Foam clusters
 * • Ocean mist
 * • Foam drift
 * • Foam trails
 * ==========================================================
 */

import { Group } from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import type { OceanState } from "../Ocean";

import Whitecaps from "./surface/Whitecaps";
import CrestFoam from "./surface/CrestFoam";
import ShoreFoam from "./surface/ShoreFoam";

import BubbleSpray from "./particles/BubbleSpray";
import FoamClusters from "./particles/FoamClusters";
import Mist from "./particles/Mist";

import FoamDrift from "./flow/FoamDrift";
import FoamTrails from "./flow/FoamTrails";

interface Props {
  oceanState?: OceanState;
}

export default function Foam({
  oceanState = {},
}: Props) {

  const root =
    useRef<Group>(null);

  useFrame((_, delta) => {

    if (!root.current)
      return;

    const tide =
      oceanState.tide ?? 0.5;

    const current =
      oceanState.current ?? 0.5;

    root.current.rotation.y +=
      delta *
      0.012 *
      current;

    root.current.rotation.x =
      Math.sin(
        performance.now() *
        0.00015,
      ) *
      0.01 *
      tide;

    root.current.rotation.z =
      Math.cos(
        performance.now() *
        0.00017,
      ) *
      0.01 *
      tide;

  });

  return (

    <group ref={root}>

      <Whitecaps
        oceanState={oceanState}
      />

      <CrestFoam
        oceanState={oceanState}
      />

      <ShoreFoam
        oceanState={oceanState}
      />

      <BubbleSpray
        oceanState={oceanState}
      />

      <FoamClusters
        oceanState={oceanState}
      />

      <Mist
        oceanState={oceanState}
      />

      <FoamDrift
        oceanState={oceanState}
      />

      <FoamTrails
        oceanState={oceanState}
      />

    </group>

  );

}