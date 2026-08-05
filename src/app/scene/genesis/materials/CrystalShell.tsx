/**
 * ==========================================================
 * LÉLUVERSE
 * CRYSTAL SHELL
 *
 * Animated crystalline mantle
 * surrounding the Genesis Core.
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

import CrystalMaterial
  from "./CrystalMaterial";

interface Props {

  activity: number;

}

export default function CrystalShell({

  activity,

}: Props) {

  const shell =

    useRef<Mesh>(null);

  const material =

    useMemo(

      () => new CrystalMaterial(),

      [],

    );

  useFrame((_, delta) => {

    if (!material?.uniforms) {

      return;

    }

    const uTime = material.uniforms.uTime;
    const uActivity = material.uniforms.uActivity;

    if (uTime?.value !== undefined) {

      uTime.value += delta;

    }

    if (uActivity?.value !== undefined) {

      uActivity.value =
        activity;

    }

    if (!shell.current) {

      return;

    }

    shell.current.rotation.y +=
      delta * 0.04;

    shell.current.rotation.x +=
      delta * 0.015;

  });

  return (

    <mesh

      ref={shell}

      renderOrder={204}

      material={material}

    >

      <icosahedronGeometry

        args={[

          0.68,

          64,

        ]}

      />

    </mesh>

  );

}