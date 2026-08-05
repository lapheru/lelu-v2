/**
 * ==========================================================
 * LÉLUVERSE
 * MIDWATER PATCHES
 *
 * Mid-depth caustic light patterns.
 *
 * Responsibilities
 * ----------------
 * • Suspended caustics
 * • Slow drifting illumination
 * • Ocean depth shimmer
 * • Current response
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

export default function MidwaterPatches({
  oceanState = {},
}: Props) {

  const group =
    useRef<Group>(null);

  const time =
    useRef(0);

  const patches = useMemo<Patch[]>(() => {

    return Array.from({

      length: 180,

    }, (): Patch => ({

      x:
        (Math.random() - 0.5) * 4.2,

      y:
        1.65 +
        (Math.random() - 0.5) * 0.35,

      z:
        (Math.random() - 0.5) * 4.2,

      rx:
        Math.random() * Math.PI,

      ry:
        Math.random() * Math.PI * 2,

      rz:
        Math.random() * Math.PI * 2,

      size:
        0.08 +
        Math.random() * 0.22,

      speed:
        0.08 +
        Math.random() * 0.25,

      offset:
        Math.random() * 100,

      opacity:
        0.025 +
        Math.random() * 0.05,

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
          0.15 *
          current;

        mesh.position.y =
          patch.y +
          Math.sin(
            time.current *
              0.6 +
              patch.offset,
          ) *
          0.08 *
          tide;

        mesh.position.z =
          patch.z +
          Math.cos(
            time.current *
              patch.speed +
              patch.offset,
          ) *
          0.15 *
          current;

        mesh.rotation.x +=
          delta *
          0.08;

        mesh.rotation.y +=
          delta *
          0.12;

        const pulse =
          1 +
          Math.sin(
            time.current *
              1.2 +
              patch.offset,
          ) *
          0.15;

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

            color="#7fe8ff"

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