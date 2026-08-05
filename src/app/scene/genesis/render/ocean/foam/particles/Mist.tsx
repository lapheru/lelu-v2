/**
 * ==========================================================
 * LÉLUVERSE
 * MIST
 *
 * Surface mist that hugs the Genesis Ocean instead of
 * forming a floating cloud above it.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Group, Mesh, DoubleSide, Vector3 } from "three";
import type { OceanState } from "../../Ocean";

interface Props {
  oceanState?: OceanState;
}

interface MistParticle {
  direction: Vector3;
  radius: number;
  size: number;
  speed: number;
  offset: number;
  opacity: number;
}

const SURFACE_RADIUS = 3.16;

export default function Mist({
  oceanState = {},
}: Props) {
  const group = useRef<Group>(null);
  const time = useRef(0);

  const particles = useMemo<MistParticle[]>(
    () =>
      Array.from({ length: 120 }, () => {
        const direction = new Vector3(
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
        ).normalize();

        return {
          direction,
          radius: SURFACE_RADIUS + Math.random() * 0.04,
          size: 0.06 + Math.random() * 0.12,
          speed: 0.03 + Math.random() * 0.08,
          offset: Math.random() * Math.PI * 2,
          opacity: 0.01 + Math.random() * 0.02,
        };
      }),
    [],
  );
    useFrame((_, delta) => {
    if (!group.current) return;

    time.current += delta;

    const tide = oceanState.tide ?? 0.5;
    const current = oceanState.current ?? 0.5;

    group.current.children.forEach((child, i) => {
      const mesh = child as Mesh;
      const particle = particles[i];

      const angle =
        time.current * particle.speed +
        particle.offset;

      const dir = particle.direction.clone();

      dir.x +=
        Math.sin(angle) *
        0.03 *
        current;

      dir.z +=
        Math.cos(angle) *
        0.03 *
        current;

      dir.normalize();

      mesh.position.copy(
        dir.multiplyScalar(
          particle.radius +
          Math.sin(angle * 2) *
            0.02 *
            tide,
        ),
      );

      mesh.lookAt(0, 0, 0);

      mesh.rotation.z += delta * 0.02;

      const pulse =
        1 +
        Math.sin(
          angle * 3,
        ) *
          0.08;

      mesh.scale.setScalar(
        particle.size *
          pulse,
      );
    });
  });

  return (
    <group ref={group}>
      {particles.map((particle, i) => (
        <mesh key={i}>
          <circleGeometry args={[1, 8]} />

          <meshBasicMaterial
            color="#f7fdff"
            transparent
            opacity={particle.opacity}
            side={DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}