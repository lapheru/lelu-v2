/**
 * ==========================================================
 * LÉLUVERSE
 * AMBIENT OCEAN LIGHT
 *
 * Global ambient illumination for the Genesis Ocean.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import {
  useRef,
} from "react";

import {
  AmbientLight,
} from "three";

import type {
  OceanState,
} from "../../Ocean";

interface Props {

  oceanState?: OceanState;

}

export default function AmbientOceanLight({

  oceanState = {},

}: Props) {

  const light =
    useRef<AmbientLight>(null);

  useFrame((state) => {

    if (!light.current)
      return;

    const time =
      state.clock.elapsedTime;

    const tide =
      oceanState.tide ?? 0.5;

    const energy =
      oceanState.caustics ?? 0.5;

    light.current.intensity =

      0.45 +

      Math.sin(
        time * 0.35,
      ) *

      0.05 *

      tide +

      energy *

      0.15;

  });

  return (

    <ambientLight

      ref={light}

      color="#bfe8ff"

      intensity={0.55}

    />

  );

}