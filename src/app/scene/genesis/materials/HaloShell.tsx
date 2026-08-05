/**
 * ==========================================================
 * LÉLUVERSE
 * HALO SHELL
 *
 * Ethereal outer aura surrounding
 * the Genesis Core.
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

import HaloMaterial
  from "./HaloMaterial";

import { useGenesis } from "../GenesisCore";

export default function HaloShell() {

  const { engineRuntime } = useGenesis();

  const shell =

    useRef<Mesh>(null);

  const material =

    useMemo(

      () => new HaloMaterial(),

      [],

    );

  useFrame((_, delta) => {

    if (!material?.uniforms) {

      return;

    }

    const activity =
      engineRuntime?.getEngineBus().getWeights().halo ??
      0;

    const uTime = material.uniforms.uTime;
    const uActivity = material.uniforms.uActivity;
    const uIntensity = material.uniforms.uIntensity;

    if (uTime?.value !== undefined) {

      uTime.value += delta;

    }

    if (uActivity?.value !== undefined) {

      uActivity.value = activity;

    }

    if (uIntensity?.value !== undefined) {

      uIntensity.value =

        1 +

        activity * 0.45;

    }

    if (!shell.current) {

      return;

    }

    shell.current.rotation.y +=

      delta * 0.01;

    shell.current.rotation.x -=

      delta * 0.004;

    const breathe =

      1 +

      Math.sin(

        performance.now() * 0.0012

      ) *

      0.02;

    shell.current.scale.setScalar(

      breathe

    );

  });

  return (

    <mesh

      ref={shell}

      renderOrder={206}

      material={material}

    >      <sphereGeometry
        args={[
          1.28,
          96,
          96,
        ]}
      />

    </mesh>

  );

}