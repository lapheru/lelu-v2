/**
 * ==========================================================
 * LÉLUVERSE
 * DEEP PATCHES
 *
 * Deepest caustic light layer.
 *
 * Responsibilities
 * ----------------
 * • Deep ocean shimmer
 * • Slow drifting illumination
 * • Fading caustics
 * • Abyssal light movement
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
  DoubleSide,
} from "three";

import type { OceanState } from "../../Ocean";

interface Props {
  oceanState?: OceanState;
}

interface Patch {

  x: number;

  y: number;

  z: number;

  rx: number;

  ry: number;

  rz: number;

  size: number;

  speed: number;

  offset: number;

  opacity: number;

}

export default function DeepPatches({
  oceanState = {},
}: Props) {

  const group =
    useRef<Group>(null);

  const time =
    useRef(0);

  const patches = useMemo<Patch[]>(() => {

    return Array.from({

      length: 220,

    }, (): Patch => ({

      x:
        (Math.random() - 0.5) * 4,

      y:
        1.1 +
        (Math.random() - 0.5) * 0.45,

      z:
        (Math.random() - 0.5) * 4,

      rx:
        Math.random() * Math.PI,

      ry:
        Math.random() * Math.PI * 2,

      rz:
        Math.random() * Math.PI * 2,

      size:
        0.12 +
        Math.random() * 0.30,

      speed:
        0.04 +
        Math.random() * 0.15,

      offset:
        Math.random() * 100,

      opacity:
        0.015 +
        Math.random() * 0.035,

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

        const patch =
          patches[i];

        mesh.position.x =
          patch.x +
          Math.sin(
            time.current *
              patch.speed +
              patch.offset,
          ) *
          0.18 *
          current;

        mesh.position.z =
          patch.z +
          Math.cos(
            time.current *
              patch.speed +
              patch.offset,
          ) *
          0.18 *
          current;

        mesh.position.y =
          patch.y +
          Math.sin(
            time.current *
              0.45 +
              patch.offset,
          ) *
          0.05 *
          tide;

        mesh.rotation.x +=
          delta *
          0.04;

        mesh.rotation.y +=
          delta *
          0.06;

        mesh.rotation.z +=
          delta *
          0.03;

        const pulse =
          1 +
          Math.sin(
            time.current *
              0.9 +
              patch.offset,
          ) *
          0.12;

        mesh.scale.setScalar(
          patch.size *
          pulse,
        );

      },
    );

  });

  return (

    <group ref={group}>

      {patches.map((
        patch,
        i,
      ) => (

        <mesh

          key={i}

          position={[
            patch.x,
            patch.y,
            patch.z,
          ]}

          rotation={[
            patch.rx,
            patch.ry,
            patch.rz,
          ]}

        >

          <circleGeometry
            args={[
              1,
              20,
            ]}
          />

          <meshBasicMaterial

            color="#4ecfff"

            transparent

            opacity={
              patch.opacity
            }

            side={
              DoubleSide
            }

            depthWrite={false}

          />

        </mesh>

      ))}

    </group>

  );

}