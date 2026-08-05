/**
 * ==========================================================
 * LÉLUVERSE
 * SUN REFLECTION
 *
 * Animated sunlight reflections dancing across
 * the Genesis Ocean.
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

interface Reflection {

  radius: number;

  angle: number;

  height: number;

  size: number;

  speed: number;

  offset: number;

  opacity: number;

}

export default function SunReflection({

  oceanState = {},

}: Props) {

  const group =
    useRef<Group>(null);

  const reflections =
    useMemo<Reflection[]>(() => {

      return Array.from({

        length: 180,

      }, (): Reflection => ({

        radius:
          Math.random() * 2.3,

        angle:
          Math.random() *
          Math.PI * 2,

        height:
          2.23 +
          Math.random() * 0.02,

        size:
          0.03 +
          Math.random() * 0.12,

        speed:
          0.10 +
          Math.random() * 0.30,

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

        const reflection =
          reflections[i];

        const angle =

          reflection.angle +

          time *

          reflection.speed;

        mesh.position.x =

          Math.cos(angle) *

          reflection.radius;

        mesh.position.z =

          Math.sin(angle) *

          reflection.radius;

        mesh.position.y =

          reflection.height +

          Math.sin(

            time * 3 +

            reflection.offset,

          ) *

          0.025 *

          tide *

          waveHeight;

        mesh.rotation.z +=

          0.004;

        const pulse =

          1 +

          Math.sin(

            time * 4 +

            reflection.offset,

          ) *

          0.35;

        mesh.scale.setScalar(

          reflection.size *

          pulse,

        );

      },

    );

  });

  return (

    <group ref={group}>

      {reflections.map((

        reflection,

        i,

      ) => (

        <mesh
          key={i}
        >

          <circleGeometry
            args={[
              1,
              20,
            ]}
          />

          <meshBasicMaterial

            color="#fff7c8"

            transparent

            opacity={
              reflection.opacity
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