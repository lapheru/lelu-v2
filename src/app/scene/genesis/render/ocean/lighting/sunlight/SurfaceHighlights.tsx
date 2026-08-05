/**
 * ==========================================================
 * LÉLUVERSE
 * SURFACE HIGHLIGHTS
 *
 * Bright shimmering highlights that move across
 * the ocean surface with the waves.
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

import type {
  OceanState,
} from "../../Ocean";

interface Props {

  oceanState?: OceanState;

}

interface Highlight {

  x: number;

  z: number;

  y: number;

  size: number;

  speed: number;

  offset: number;

  opacity: number;

}

export default function SurfaceHighlights({

  oceanState = {},

}: Props) {

  const group =
    useRef<Group>(null);

  const highlights =
    useMemo<Highlight[]>(() => {

      return Array.from({

        length: 260,

      }, (): Highlight => ({

        x:
          (Math.random() - 0.5) * 4.6,

        z:
          (Math.random() - 0.5) * 4.6,

        y:
          2.22 +
          Math.random() * 0.03,

        size:
          0.015 +
          Math.random() * 0.05,

        speed:
          0.2 +
          Math.random() * 0.45,

        offset:
          Math.random() * 100,

        opacity:
          0.04 +
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

    const waveHeight =
      oceanState.waveHeight ?? 0.5;

    group.current.children.forEach(

      (child, i) => {

        const mesh =
          child as Mesh;

        const highlight =
          highlights[i];

        mesh.position.x =

          highlight.x +

          Math.sin(

            time *

            highlight.speed +

            highlight.offset,

          ) *

          0.15;

        mesh.position.z =

          highlight.z +

          Math.cos(

            time *

            highlight.speed +

            highlight.offset,

          ) *

          0.15;

        mesh.position.y =

          highlight.y +

          Math.sin(

            time * 4 +

            highlight.offset,

          ) *

          0.02 *

          tide *

          waveHeight;

        mesh.rotation.z +=
          0.01;

        const pulse =

          1 +

          Math.sin(

            time * 6 +

            highlight.offset,

          ) *

          0.35;

        mesh.scale.setScalar(

          highlight.size *

          pulse,

        );

      },

    );

  });

  return (

    <group ref={group}>

      {highlights.map((

        highlight,

        i,

      ) => (

        <mesh
          key={i}
        >

          <circleGeometry
            args={[
              1,
              16,
            ]}
          />

          <meshBasicMaterial

            color="#fffde8"

            transparent

            opacity={
              highlight.opacity
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