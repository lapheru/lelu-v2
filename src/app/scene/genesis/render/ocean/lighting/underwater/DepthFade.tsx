/**
 * ==========================================================
 * LÉLUVERSE
 * DEPTH FADE
 *
 * Simulates the gradual loss of light as the
 * Genesis Ocean becomes deeper.
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

interface Layer {

  radius: number;

  y: number;

  opacity: number;

  speed: number;

  offset: number;

}

export default function DepthFade({

  oceanState = {},

}: Props) {

  const group =
    useRef<Group>(null);

  const layers =
    useMemo<Layer[]>(() => {

      return Array.from({

        length: 8,

      }, (_, i): Layer => ({

        radius:
          2.2 +
          i * 0.08,

        y:
          -0.2 -
          i * 0.45,

        opacity:
          0.02 +
          i * 0.02,

        speed:
          0.05 +
          i * 0.02,

        offset:
          Math.random() * 100,

      }));

    }, []);

  useFrame((state) => {

    if (!group.current)
      return;

    const time =
      state.clock.elapsedTime;

    const tide =
      oceanState.tide ?? 0.5;

    group.current.children.forEach(

      (child, i) => {

        const mesh =
          child as Mesh;

        const layer =
          layers[i];

        mesh.position.y =

          layer.y +

          Math.sin(

            time *

            layer.speed +

            layer.offset,

          ) *

          0.05 *

          tide;

        mesh.rotation.y +=

          0.0008;

        const pulse =

          1 +

          Math.sin(

            time *

            0.4 +

            layer.offset,

          ) *

          0.015;

        mesh.scale.setScalar(

          layer.radius *

          pulse,

        );

      },

    );

  });

  return (

    <group ref={group}>

      {layers.map((

        layer,

        i,

      ) => (

        <mesh

          key={i}

          position={[
            0,
            layer.y,
            0,
          ]}

          rotation={[
            -Math.PI / 2,
            0,
            0,
          ]}

        >

          <circleGeometry
            args={[
              1,
              64,
            ]}
          />

          <meshBasicMaterial

            color="#001f3f"

            transparent

            opacity={
              layer.opacity
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