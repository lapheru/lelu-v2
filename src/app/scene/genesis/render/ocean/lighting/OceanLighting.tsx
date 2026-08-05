/**
 * ==========================================================
 * LÉLUVERSE
 * OCEAN LIGHTING
 *
 * Master lighting controller for the Genesis Ocean.
 *
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import {
  useRef,
} from "react";

import {
  Group,
} from "three";

import AmbientOceanLight
  from "./ambient/AmbientOceanLight";

import HemisphereGlow
  from "./ambient/HemisphereGlow";

import HorizonLight
  from "./ambient/HorizonLight";

import type {
  OceanState,
} from "../Ocean";

interface Props {

  oceanState?: OceanState;

}

export default function OceanLighting({

  oceanState = {},

}: Props) {

  const group =
    useRef<Group>(null);

  useFrame((state) => {

    if (!group.current)
      return;

    const time =
      state.clock.elapsedTime;

    const tide =
      oceanState.tide ?? 0.5;

    group.current.rotation.y =
      time * 0.005;

    group.current.position.y =
      Math.sin(
        time * 0.4,
      ) *
      0.02 *
      tide;

  });

  return (

    <group
      ref={group}
    >

      <AmbientOceanLight
        oceanState={oceanState}
      />

      <HemisphereGlow
        oceanState={oceanState}
      />

      <HorizonLight
        oceanState={oceanState}
      />

    </group>

  );

}