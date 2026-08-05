/**
 * ==========================================================
 * LÉLUVERSE
 * UNDERWATER LIGHT
 *
 * Dynamic underwater illumination that breathes
 * through the Genesis Ocean.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";

import {
  useRef,
} from "react";

import {
  PointLight,
} from "three";

import type {
  OceanState,
} from "../../Ocean";

interface Props {

  oceanState?: OceanState;

}

export default function UnderwaterLight({

  oceanState = {},

}: Props) {

  const light =
    useRef<PointLight>(null);

  useFrame((state) => {

    if (!light.current)
      return;

    const time =
      state.clock.elapsedTime;

    const tide =
      oceanState.tide ?? 0.5;

    const caustics =
      oceanState.caustics ?? 0.5;

    const waveHeight =
      oceanState.waveHeight ?? 0.5;

    light.current.position.set(

      Math.sin(
        time * 0.18,
      ) * 0.6,

      -0.9 +

      Math.sin(
        time * 0.45,
      ) *

      0.18 *

      tide,

      Math.cos(
        time * 0.18,
      ) * 0.6,

    );

    light.current.intensity =

      1.4 +

      Math.sin(
        time * 1.2,
      ) *

      0.25 *

      tide +

      caustics *

      0.5 +

      waveHeight *

      0.3;

    light.current.distance =

      8 +

      Math.sin(
        time * 0.4,
      ) *

      0.4;

  });

  return (

    <pointLight

      ref={light}

      color="#6fdcff"

      intensity={1.6}

      distance={8}

      decay={2}

      position={[
        0,
        -0.9,
        0,
      ]}

    />

  );

}