/**
 * ==========================================================
 * LÉLUVERSE
 * CAUSTICS
 *
 * Master renderer for every caustic system.
 *
 * Responsibilities
 * ----------------
 * • Assemble every caustic subsystem
 * • Control overall motion
 * • Coordinate underwater lighting
 * ==========================================================
 */

import { Group } from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import type { OceanState } from "../Ocean";

import CausticField from "./CausticField";

import RefractedLight from "./lighting/RefractedLight";
import WaterScattering from "./lighting/WaterScattering";
import DepthGlow from "./lighting/DepthGlow";
import CausticProjector from "./lighting/CausticProjector";

interface Props {
  oceanState?: OceanState;
}

export default function Caustics({
  oceanState = {},
}: Props) {

  const root = useRef<Group>(null);

  useFrame((_, delta) => {

    if (!root.current) return;

    const current =
      oceanState.current ?? 0.5;

    root.current.rotation.y +=
      delta *
      0.01 *
      current;

  });

  return (

    <group ref={root}>

      <CausticField
        oceanState={oceanState}
      />

      <RefractedLight
        oceanState={oceanState}
      />

      <WaterScattering
        oceanState={oceanState}
      />

      <DepthGlow
        oceanState={oceanState}
      />

      <CausticProjector
        oceanState={oceanState}
      />

    </group>

  );

}