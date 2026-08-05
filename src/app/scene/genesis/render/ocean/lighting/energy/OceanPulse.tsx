/**
 * ==========================================================
 * LÉLUVERSE
 * OCEAN PULSE
 *
 * Central energy pulse that breathes life into
 * the Genesis Ocean.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";

import {
  useRef,
} from "react";

import {
  Mesh,
  AdditiveBlending,
} from "three";

import type {
  OceanState,
} from "../../Ocean";

interface Props {

  oceanState?: OceanState;

}

export default function OceanPulse({

  oceanState = {},

}: Props) {

  const pulse =
    useRef<Mesh>(null);

  useFrame((state) => {

    if (!pulse.current)
      return;

    const time =
      state.clock.elapsedTime;

    const tide =
      oceanState.tide ?? 0.5;

    const caustics =
      oceanState.caustics ?? 0.5;

    const waveHeight =
      oceanState.waveHeight ?? 0.5;

    const current =
      oceanState.current ?? 0.5;

    pulse.current.position.y =

      -0.45 +

      Math.sin(

        time * 0.45,

      ) *

      0.08 *

      tide;

    pulse.current.rotation.y +=

      0.0025 +

      current *

      0.001;

    pulse.current.rotation.z +=

      0.0015;

    const scale =

      1 +

      Math.sin(

        time * 1.8,

      ) *

      0.12 +

      waveHeight *

      0.08 +

      caustics *

      0.05;

    pulse.current.scale.setScalar(

      scale,

    );

  });

  return (

    <mesh
      ref={pulse}
    >

      <sphereGeometry
        args={[
          0.45,
          48,
          48,
        ]}
      />

      <meshBasicMaterial

        color="#58dfff"

        transparent

        opacity={0.08}

        blending={
          AdditiveBlending
        }

        depthWrite={false}

      />

    </mesh>

  );

}