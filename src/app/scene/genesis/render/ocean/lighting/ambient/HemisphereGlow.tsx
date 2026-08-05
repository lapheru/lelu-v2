/**
 * ==========================================================
 * LÉLUVERSE
 * HEMISPHERE GLOW
 *
 * Sky and ocean hemisphere lighting.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import {
  useRef,
} from "react";

import {
  HemisphereLight,
} from "three";

import type {
  OceanState,
} from "../../Ocean";

interface Props {

  oceanState?: OceanState;

}

export default function HemisphereGlow({

  oceanState = {},

}: Props) {

  const light =
    useRef<HemisphereLight>(null);

  useFrame((state) => {

    if (!light.current)
      return;

    const time =
      state.clock.elapsedTime;

    const tide =
      oceanState.tide ?? 0.5;

    const caustics =
      oceanState.caustics ?? 0.5;

    light.current.intensity =

      0.75 +

      Math.sin(
        time * 0.25,
      ) *

      0.08 *

      tide +

      caustics *

      0.2;

    light.current.color.setHSL(

      0.56,

      0.45,

      0.70 +

      Math.sin(
        time * 0.18,
      ) *
      0.03,

    );

    light.current.groundColor.setHSL(

      0.60,

      0.35,

      0.18 +

      Math.sin(
        time * 0.14,
      ) *
      0.02,

    );

  });

  return (

    <hemisphereLight

      ref={light}

      color="#d7f4ff"

      groundColor="#0a2f52"

      intensity={0.8}

    />

  );

}