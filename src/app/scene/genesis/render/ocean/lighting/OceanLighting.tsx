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

import Bioluminescence
  from "./energy/Bioluminescence";

import EnergyBloom
  from "./energy/EnergyBloom";

import OceanPulse
  from "./energy/OceanPulse";

import GodRays
  from "./sunlight/GodRays";

import SunReflection
  from "./sunlight/SunReflection";

import SurfaceHighlights
  from "./sunlight/SurfaceHighlights";

import UnderwaterLight
  from "./underwater/UnderwaterLight";

import WaterVolume
  from "./underwater/WaterVolume";

import DepthFade
  from "./underwater/DepthFade";

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

      <Bioluminescence
        oceanState={oceanState}
      />

      <EnergyBloom
        oceanState={oceanState}
      />

      <OceanPulse
        oceanState={oceanState}
      />

      <GodRays
        oceanState={oceanState}
      />

      <SunReflection
        oceanState={oceanState}
      />

      <SurfaceHighlights
        oceanState={oceanState}
      />

      <UnderwaterLight
        oceanState={oceanState}
      />

      <WaterVolume
        oceanState={oceanState}
      />

      <DepthFade
        oceanState={oceanState}
      />

    </group>

  );

}