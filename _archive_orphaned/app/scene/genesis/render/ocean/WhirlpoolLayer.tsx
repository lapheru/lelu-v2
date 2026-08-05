/**
 * ==========================================================
 * LÉLUVERSE
 * WHIRLPOOL LAYER
 *
 * Massive rotating ocean vortices.
 *
 * Responsibilities
 * ----------------
 * • Ocean vortices
 * • Rotating spiral fields
 * • Suction effect
 * • Drift across the planet
 * • Tsunami amplification
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Group } from "three";

import type { OceanState } from "./Ocean";

interface Props {
  oceanState?: OceanState;
}

interface Whirlpool {

  radius: number;

  orbit: number;

  speed: number;

  size: number;

  direction: number;

}

export default function WhirlpoolLayer({

  oceanState = {},

}: Props) {

  const group = useRef<Group>(null);

  const time = useRef(0);

  const whirlpools = useMemo<Whirlpool[]>(() => {

    return Array.from({

      length: 8,

    }).map((_, i) => ({

      radius: 2.3,

      orbit: (Math.PI * 2 * i) / 8,

      speed: 0.2 + Math.random() * 0.35,

      size: 0.08 + Math.random() * 0.05,

      direction: i % 2 === 0 ? 1 : -1,

    }));

  }, []);

  useFrame((_, delta) => {

    if (!group.current) return;

    time.current += delta;

    const current =
      oceanState.current ?? 0.5;

    const tide =
      oceanState.tide ?? 0.5;

    const tsunami =
      oceanState.tsunami ?? 0;

    group.current.children.forEach(

      (child, index) => {

        const whirlpool = whirlpools[index];

        if (!whirlpool) return;

        const orbit =
          whirlpool.orbit +
          time.current *
            whirlpool.speed *
            current;

        child.position.x =
          Math.cos(orbit) *
          whirlpool.radius;

        child.position.z =
          Math.sin(orbit) *
          whirlpool.radius;

        child.position.y =
          Math.sin(
            orbit * 2,
          ) *
          0.35;

        child.rotation.y +=
          delta *
          4 *
          whirlpool.direction;

        child.rotation.z +=
          delta *
          2;

        const scale =
          whirlpool.size *
          (1 +
            Math.sin(
              time.current * 2 +
                index,
            ) *
              0.3 *
              tide +
            tsunami * 0.5);

        child.scale.set(
          scale,
          scale,
          scale,
        );

      },

    );

  });

  return (

    <group ref={group}>

      {whirlpools.map((_, i) => (

        <group key={i}>

          {/* Outer Spiral */}

          <mesh>

            <torusGeometry
              args={[
                1,
                0.05,
                24,
                256,
              ]}
            />

            <meshBasicMaterial

              color="#00d9ff"

              transparent

              opacity={0.12}

            />

          </mesh>

          {/* Inner Core */}

          <mesh>

            <sphereGeometry
              args={[
                0.45,
                32,
                32,
              ]}
            />

            <meshBasicMaterial

              color="#001a44"

              transparent

              opacity={0.45}

            />

          </mesh>

          {/* Energy Ring */}

          <mesh
            rotation={[
              Math.PI / 2,
              0,
              0,
            ]}
          >

            <torusGeometry
              args={[
                0.7,
                0.025,
                16,
                128,
              ]}
            />

            <meshBasicMaterial

              color="#66ecff"

              transparent

              opacity={0.2}

            />

          </mesh>

        </group>

      ))}

    </group>

  );

}