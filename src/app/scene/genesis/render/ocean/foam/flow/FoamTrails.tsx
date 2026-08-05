/**
 * ==========================================================
 * LÉLUVERSE
 * FOAM TRAILS
 *
 * Long flowing trails of foam that wrap around
 * the Genesis Ocean instead of forming a halo.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

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

interface Trail {

  radius: number;

  angle: number;

  height: number;

  width: number;

  length: number;

  speed: number;

  offset: number;

  opacity: number;

}

const SURFACE_RADIUS = 3.18;

export default function FoamTrails({
  oceanState = {},
}: Props) {

  const group =
    useRef<Group>(null);

  const time =
    useRef(0);

  const directions =
    useRef<Vector3[]>([]);

  const trails =
    useMemo<Trail[]>(() => {

      directions.current =
        Array.from({ length: 140 }, () =>
          new Vector3(
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
          ).normalize(),
        );

      return Array.from({

        length: 140,

      }, (): Trail => ({

        radius:
          SURFACE_RADIUS +
          Math.random() * 0.03,

        angle:
          Math.random() *
          Math.PI * 2,

        height: 0,

        width:
          0.03 +
          Math.random() * 0.04,

        length:
          0.10 +
          Math.random() * 0.18,

        speed:
          0.05 +
          Math.random() * 0.18,

        offset:
          Math.random() * 100,

        opacity:
          0.05 +
          Math.random() * 0.10,

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

    group.current.children.forEach((child, i) => {

      const mesh =
        child as Mesh;

      const trail =
        trails[i];

      const dir =
        directions.current[i].clone();

      const t =
        time.current *
        trail.speed +
        trail.offset;

      dir.x +=
        Math.sin(t) *
        0.04 *
        current;

      dir.y +=
        Math.cos(
          t * 0.8
        ) *
        0.025 *
        tide;

      dir.z +=
        Math.cos(t) *
        0.04 *
        current;

      dir.normalize();

      const radius =
        trail.radius +

        Math.sin(
          t * 2
        ) *
        0.02 *
        tide;

      mesh.position.copy(
        dir.multiplyScalar(
          radius
        )
      );

      mesh.quaternion.setFromUnitVectors(
        new Vector3(0, 0, 1),
        dir
      );

      mesh.rotateZ(
        t
      );

      const stretch =
        1 +

        Math.sin(
          t * 2 +
          trail.offset
        ) *
        0.15;

      mesh.scale.set(
        trail.length *
        stretch,
        trail.width,
        1
      );

    });

  });
    return (

    <group ref={group}>

      {trails.map((trail, i) => (

        <mesh
          key={i}
          frustumCulled={false}
          renderOrder={2}
        >

          <planeGeometry
            args={[
              1,
              1,
            ]}
          />

          <meshBasicMaterial

            color="#ffffff"

            transparent

            opacity={
              trail.opacity
            }

            side={
              DoubleSide
            }

            depthWrite={false}

            depthTest={true}

          />

        </mesh>

      ))}

    </group>

  );

}