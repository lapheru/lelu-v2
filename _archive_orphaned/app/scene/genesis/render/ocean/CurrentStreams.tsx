/**
 * ==========================================================
 * LÉLUVERSE
 * CURRENT STREAMS
 *
 * Planetary ocean circulation.
 *
 * Responsibilities
 * ----------------
 * • Ocean gyres
 * • Directional currents
 * • Flow streams
 * • Polar circulation
 * • Equatorial movement
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Group } from "three";

import type { OceanState } from "./Ocean";

interface Props {
  oceanState?: OceanState;
}

interface Stream {

  radius: number;

  speed: number;

  tilt: number;

  direction: number;

  opacity: number;

}

export default function CurrentStreams({

  oceanState = {},

}: Props) {

  const group = useRef<Group>(null);

  const time = useRef(0);

  const streams = useMemo<Stream[]>(() => {

    return Array.from({

      length: 24,

    }).map((_, i) => ({

      radius: 2.24 + i * 0.04,

      speed: 0.3 + Math.random() * 0.5,

      tilt: ((i % 6) - 3) * 0.18,

      direction: i % 2 === 0 ? 1 : -1,

      opacity: 0.02 + Math.random() * 0.04,

    }));

  }, []);

  useFrame((_, delta) => {

    if (!group.current) return;

    time.current += delta;

    const current =
      oceanState.current ?? 0.5;

    const tide =
      oceanState.tide ?? 0.5;

    group.current.children.forEach(

      (child, index) => {

        const stream = streams[index];

        if (!stream) return;

        child.rotation.x =
          stream.tilt +
          Math.sin(
            time.current * 0.25 + index,
          ) *
            0.05;

        child.rotation.y +=
          delta *
          stream.speed *
          current *
          stream.direction;

        child.rotation.z =
          Math.cos(
            time.current * 0.18 + index,
          ) *
          0.04;

        const pulse =
          1 +
          Math.sin(
            time.current *
              stream.speed *
              2 +
              index,
          ) *
            0.02 *
            tide;

        child.scale.set(
          pulse,
          pulse,
          pulse,
        );

      },

    );

  });

  return (

    <group ref={group}>

      {streams.map((stream, i) => (

        <mesh

          key={i}

          rotation={[

            Math.PI / 2,

            0,

            0,

          ]}

        >

          <torusGeometry

            args={[

              stream.radius,

              0.006,

              12,

              256,

            ]}

          />

          <meshBasicMaterial

            color={

              i % 4 === 0
                ? "#00ffff"
                : i % 4 === 1
                ? "#33ddff"
                : i % 4 === 2
                ? "#66cfff"
                : "#99eeff"

            }

            transparent

            opacity={stream.opacity}

          />

        </mesh>

      ))}

    </group>

  );

}