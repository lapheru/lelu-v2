/**
 * ==========================================================
 * LÉLUVERSE
 * TIME SYSTEM
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";

import { Group } from "three";

import { useRef } from "react";

import { useGenesis } from "../GenesisCore";

export default function TimeSystem() {

  const group =
    useRef<Group>(null);

  const { state } =
    useGenesis();

  useFrame((_, delta) => {

    if (!group.current) {
      return;
    }

    const genesis =
      state as any;

    const speed =
      genesis.speed ?? 1;

    group.current.rotation.z +=

      delta *

      speed *

      0.1;

  });

  return (

    <group
      ref={group}
    />

  );

}