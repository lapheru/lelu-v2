/**
 * ==========================================================
 * LÉLUVERSE
 * WATER VOLUME
 *
 * Volumetric body of the Genesis Ocean.
 * Creates the feeling of light scattering through
 * the water column.
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

interface VolumeLayer {

  radius: number;

  opacity: number;

  y: number;

  speed: number;

  offset: number;

}

export default function WaterVolume({

  oceanState = {},

}: Props) {

  const group =
    useRef<Group>(null);

  const layers =
    useMemo<VolumeLayer[]>(() => {

      return Array.from({

        length: 12,

      }, (_, i): VolumeLayer => ({

        radius:
          2.15 +
          i * 0.16,

        opacity:
          0.035 -
          i * 0.002,

        y:
          2.12 -
          i * 0.22,

        speed:
          0.04 +
          i * 0.015,

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

    const wave =
      oceanState.waveHeight ?? 0.5;

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

          0.03 *

          tide;

        mesh.rotation.y +=

          0.0005;

        const scale =

          layer.radius *

          (

            1 +

            Math.sin(

              time *

              0.5 +

              layer.offset,

            ) *

            0.02 *

            wave

          );

        mesh.scale.setScalar(

          scale,

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

            color="#4fc9ff"

            transparent

            opacity={
              Math.max(
                layer.opacity,
                0.003,
              )
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