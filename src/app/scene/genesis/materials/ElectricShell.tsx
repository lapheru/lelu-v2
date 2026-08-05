/**
 * ==========================================================
 * LÉLUVERSE
 * ELECTRIC SHELL
 *
 * Living electromagnetic field
 * surrounding the Crystal Shell.
 * ==========================================================
 */

import {
  useFrame,
} from "@react-three/fiber";

import {
  useMemo,
  useRef,
} from "react";

import {
  Mesh,
} from "three";

import ElectricMaterial
  from "./ElectricMaterial";

import { useGenesis } from "../GenesisCore";

export default function ElectricShell() {

  const { engineRuntime } = useGenesis();

  const shell =

    useRef<Mesh>(null);

  const material =

    useMemo(

      () => new ElectricMaterial(),

      [],

    );

  useFrame((_, delta) => {

    if (!material?.uniforms) {

      return;

    }

    const activity =
      engineRuntime?.getEngineBus().getWeights().electric ??
      0;

    const uTime = material.uniforms.uTime;
    const uActivity = material.uniforms.uActivity;
    const uIntensity = material.uniforms.uIntensity;

    if (uTime?.value !== undefined) {

      uTime.value +=
        delta;

    }

    if (uActivity?.value !== undefined) {

      uActivity.value =
        activity;

    }

    if (uIntensity?.value !== undefined) {

      uIntensity.value =

        1 +

        activity * 0.35;

    }

    if (!shell.current) {

      return;

    }

    shell.current.rotation.y +=

      delta * 0.22;

    shell.current.rotation.z -=

      delta * 0.11;

    const pulse =

      1 +

      Math.sin(

        performance.now() * 0.0025

      ) *

      0.015;

    shell.current.scale.setScalar(

      pulse

    );

  });

  return (

    <mesh

      ref={shell}

      renderOrder={205}

      material={material}

    >

      <icosahedronGeometry

        args={[

          1.12,

          64,

        ]}

      />

    </mesh>

  );

}