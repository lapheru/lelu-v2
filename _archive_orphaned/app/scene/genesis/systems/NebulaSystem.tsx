/**
 * ==========================================================
 * LÉLUVERSE
 * NEBULA SYSTEM
 *
 * Soft Milky Way / Aurora Background
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  Group,
  AdditiveBlending,
} from "three";

export default function NebulaSystem() {

  const nebula =
    useRef<Group>(null);

  useFrame((_, delta) => {

    if (!nebula.current) return;

    nebula.current.rotation.z +=
      delta * 0.002;

    nebula.current.rotation.y +=
      delta * 0.001;

    nebula.current.position.x =
      Math.sin(
        performance.now() * 0.00005,
      ) * 0.3;

    nebula.current.position.y =
      Math.cos(
        performance.now() * 0.00004,
      ) * 0.2;

  });

  return (

    <group
      ref={nebula}
      position={[0,0,-18]}
    >

      {/* Purple Aurora */}

      <mesh position={[-6,3,0]}>

        <planeGeometry
          args={[18,8]}
        />

        <meshBasicMaterial

          color="#5d4cff"

          transparent

          opacity={0.08}

          blending={AdditiveBlending}

          depthWrite={false}

        />

      </mesh>

      {/* Blue Mist */}

      <mesh position={[5,-2,-1]}
            rotation={[0,0,0.3]}>

        <planeGeometry
          args={[20,10]}
        />

        <meshBasicMaterial

          color="#3d8bff"

          transparent

          opacity={0.07}

          blending={AdditiveBlending}

          depthWrite={false}

        />

      </mesh>

      {/* Cyan Glow */}

      <mesh position={[0,5,-2]}
            rotation={[0,0,-0.4]}>

        <planeGeometry
          args={[16,7]}
        />

        <meshBasicMaterial

          color="#57f0ff"

          transparent

          opacity={0.05}

          blending={AdditiveBlending}

          depthWrite={false}

        />

      </mesh>

      {/* Pink Dust */}

      <mesh position={[7,4,-3]}
            rotation={[0,0,0.7]}>

        <planeGeometry
          args={[14,6]}
        />

        <meshBasicMaterial

          color="#ff77d5"

          transparent

          opacity={0.04}

          blending={AdditiveBlending}

          depthWrite={false}

        />

      </mesh>

    </group>

  );

}