/**
 * ==========================================================
 * LÉLUVERSE
 * BIOLUMINESCENCE
 *
 * Living ocean organisms that emit soft pulses
 * of blue light throughout the Genesis Ocean.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";

import {
  useMemo,
  useRef,
} from "react";

import {
  Group,
  Mesh,
} from "three";

import type {
  OceanState,
} from "../../Ocean";

interface Props {

  oceanState?: OceanState;

}

interface Particle {

  radius: number;

  angle: number;

  depth: number;

  size: number;

  speed: number;

  pulse: number;

  offset: number;

  opacity: number;

}

export default function Bioluminescence({

  oceanState = {},

}: Props) {

  const group =
    useRef<Group>(null);

  const particles =
    useMemo<Particle[]>(() => {

      return Array.from({

        length: 420,

      }, (): Particle => ({

        radius:
          Math.random() * 2.2,

        angle:
          Math.random() *
          Math.PI *
          2,

        depth:
          -0.2 -
          Math.random() *
          2.6,

        size:
          0.006 +
          Math.random() *
          0.028,

        speed:
          0.05 +
          Math.random() *
          0.25,

        pulse:
          1 +
          Math.random() *
          3,

        offset:
          Math.random() *
          100,

        opacity:
          0.12 +
          Math.random() *
          0.25,

      }));

    }, []);

  useFrame((state) => {

    if (!group.current)
      return;

    const time =
      state.clock.elapsedTime;

    const current =
      oceanState.current ?? 0.5;

    group.current.children.forEach(

      (child, i) => {

        const mesh =
          child as Mesh;

        const particle =
          particles[i];

        const angle =

          particle.angle +

          time *

          particle.speed *

          current;

        mesh.position.x =

          Math.cos(angle) *

          particle.radius;

        mesh.position.z =

          Math.sin(angle) *

          particle.radius;

        mesh.position.y =

          particle.depth +

          Math.sin(

            time *

            0.8 +

            particle.offset,

          ) *

          0.05;

        const glow =

          1 +

          Math.sin(

            time *

            particle.pulse +

            particle.offset,

          ) *

          0.45;

        mesh.scale.setScalar(

          particle.size *

          glow,

        );

      },

    );

  });

  return (

    <group ref={group}>

      {particles.map((

        particle,

        i,

      ) => (

        <mesh
          key={i}
        >

          <sphereGeometry
            args={[
              1,
              10,
              10,
            ]}
          />

          <meshBasicMaterial

            color="#49cfff"

            transparent

            opacity={
              particle.opacity
            }

            depthWrite={false}

          />

        </mesh>

      ))}

    </group>

  );

}