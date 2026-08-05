/**
 * ==========================================================
 * LÉLUVERSE
 * BLACK HOLE SYSTEM
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { useRef } from "react";

export default function BlackHoleSystem() {

  const hole = useRef<Mesh>(null);

  useFrame((_, delta) => {

    if (!hole.current) return;

    hole.current.rotation.y += delta;

    hole.current.visible = true;

  });

  return (

    <mesh ref={hole}>

      <sphereGeometry args={[0.5, 64, 64]} />

      <meshStandardMaterial

        color="black"

        emissive="#2200aa"

        emissiveIntensity={0.2}

      />

    </mesh>

  );

}