import {
  useFrame,
} from "@react-three/fiber";

import {
  useMemo,
  useRef,
} from "react";

import {
  Group,
  Mesh,
  DoubleSide,
  Vector3,
} from "three";

import type { OceanState } from "../../Ocean";

interface Props {
  oceanState?: OceanState;
}

interface DriftParticle {

  direction: Vector3;

  radius: number;

  size: number;

  speed: number;

  offset: number;

  opacity: number;

}

const SURFACE_RADIUS = 3.18;

export default function FoamDrift({
  oceanState = {},
}: Props) {

  const group =
    useRef<Group>(null);

  const particles =
    useMemo<DriftParticle[]>(() => {

      return Array.from({

        length: 260,

      }, (): DriftParticle => ({

        direction:
          new Vector3(
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
          ).normalize(),

        radius:
          SURFACE_RADIUS +
          Math.random() * 0.025,

        size:
          0.03 +
          Math.random() * 0.10,

        speed:
          0.05 +
          Math.random() * 0.18,

        offset:
          Math.random() * 100,

        opacity:
          0.05 +
          Math.random() * 0.08,

      }));

    }, []);

  useFrame((state) => {

    if (!group.current)
      return;

    const time =
      state.clock.elapsedTime;

    const tide =
      oceanState.tide ?? 0.5;

    const current =
      oceanState.current ?? 0.5;

    group.current.children.forEach((child, i) => {

      const mesh =
        child as Mesh;

      const particle =
        particles[i];

      const angle =
        time *
        particle.speed +
        particle.offset;

      const direction =
        particle.direction.clone();

      direction.x +=
        Math.sin(angle) *
        0.04 *
        current;

      direction.y +=
        Math.cos(angle * 0.8) *
        0.025 *
        tide;

      direction.z +=
        Math.cos(angle) *
        0.04 *
        current;

      direction.normalize();

      const radius =
        particle.radius +
        Math.sin(angle * 2) *
        0.02 *
        tide;

      mesh.position.copy(
        direction.multiplyScalar(radius),
      );

      mesh.quaternion.setFromUnitVectors(
        new Vector3(0, 0, 1),
        direction,
      );

      mesh.rotateZ(
        time * 0.25,
      );

      const pulse =
        1 +
        Math.sin(angle * 2 + particle.offset) *
        0.15;

      mesh.scale.setScalar(
        particle.size *
        pulse,
      );

    });

  });

  return (

    <group ref={group}>

      {particles.map((

        particle,

        i,

      ) => (

        <mesh
          key={i}
          frustumCulled={false}
          renderOrder={2}
        >

          <circleGeometry
            args={[
              1,
              10,
            ]}
          />

          <meshBasicMaterial

            color="#ffffff"

            transparent

            opacity={
              particle.opacity
            }

            side={
              DoubleSide
            }

            depthWrite={false}

            depthTest

            toneMapped={false}

          />

        </mesh>

      ))}

    </group>

  );

}