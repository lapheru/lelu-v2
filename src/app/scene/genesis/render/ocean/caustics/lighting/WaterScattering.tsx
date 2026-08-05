/**
 * ==========================================================
 * LÉLUVERSE
 * WATER SCATTERING
 *
 * Volumetric light scattering throughout the Genesis Ocean.
 *
 * Responsibilities
 * ----------------
 * • Floating light particles
 * • Soft blue haze
 * • Water volume illumination
 * • Current driven movement
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

import type { OceanState } from "../../Ocean";

interface Props {
  oceanState?: OceanState;
}

interface Particle {

  x: number;

  y: number;

  z: number;

  size: number;

  speed: number;

  offset: number;

  opacity: number;

}

export default function WaterScattering({
  oceanState = {},
}: Props) {

  const group =
    useRef<Group>(null);

  const time =
    useRef(0);

  const particles =
    useMemo<Particle[]>(() => {

      return Array.from({

        length: 260,

      }, (): Particle => ({

        x:
          (Math.random() - 0.5) * 4.8,

        y:
          (Math.random() - 0.5) * 4.4,

        z:
          (Math.random() - 0.5) * 4.8,

        size:
          0.015 +
          Math.random() * 0.05,

        speed:
          0.05 +
          Math.random() * 0.25,

        offset:
          Math.random() * 100,

        opacity:
          0.02 +
          Math.random() * 0.04,

      }));

    }, []);

  useFrame((_, delta) => {

    if (!group.current)
      return;

    time.current += delta;

    const tide =
      oceanState.tide ?? 0.5;

    const current =
      oceanState.current ?? 0.5;

    group.current.children.forEach(
      (child, i) => {

        const mesh =
          child as Mesh;

        const particle =
          particles[i];

        mesh.position.x =
          particle.x +
          Math.sin(
            time.current *
            particle.speed +
            particle.offset,
          ) *
          0.12 *
          current;

        mesh.position.z =
          particle.z +
          Math.cos(
            time.current *
            particle.speed +
            particle.offset,
          ) *
          0.12 *
          current;

        mesh.position.y =
          particle.y +
          Math.sin(
            time.current *
            0.7 +
            particle.offset,
          ) *
          0.08 *
          tide;

        mesh.rotation.x +=
          delta * 0.08;

        mesh.rotation.y +=
          delta * 0.06;

        const pulse =
          1 +
          Math.sin(
            time.current * 1.5 +
            particle.offset,
          ) *
          0.25;

        mesh.scale.setScalar(
          particle.size *
          pulse,
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
              8,
              8,
            ]}
          />

          <meshBasicMaterial

            color="#8feeff"

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