/**
 * ==========================================================
 * LÉLUVERSE
 * SOLAR SYSTEM
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { useRef } from "react";

import { useGenesis } from "../GenesisCore";

export default function SolarSystem() {

  const { state } = useGenesis();

  const orbit = useRef<Group>(null);

  useFrame((_, delta) => {

    if (!orbit.current) return;
    orbit.current.rotation.y += delta * 0.15;

  });

  const visible = state.online;

  return (

    <group
      ref={orbit}
      visible={visible}
    >

      <mesh position={[2,0,0]}>

        <sphereGeometry args={[0.12,32,32]} />

        <meshStandardMaterial color="#5da9ff" />

      </mesh>

      <mesh position={[-3,0,0]}>

        <sphereGeometry args={[0.18,32,32]} />

        <meshStandardMaterial color="#d67f42" />

      </mesh>

    </group>

  );

}