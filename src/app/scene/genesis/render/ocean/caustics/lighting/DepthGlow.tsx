/**
 * ==========================================================
 * LÉLUVERSE
 * DEPTH GLOW
 *
 * Atmospheric glow that fades deeper into the Genesis Ocean.
 *
 * Responsibilities
 * ----------------
 * • Deep water illumination
 * • Ocean ambience
 * • Slow breathing glow
 * • Tide response
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import {
  Group,
  Mesh,
} from "three";
import {
  useMemo,
  useRef,
} from "react";

import type { OceanState } from "../../Ocean";

interface Props {
  oceanState?: OceanState;
}

interface GlowLayer {

  radius: number;

  opacity: number;

  speed: number;

  offset: number;

  color: string;

}

export default function DepthGlow({
  oceanState = {},
}: Props) {

  const group =
    useRef<Group>(null);

  const time =
    useRef(0);

  const layers =
    useMemo<GlowLayer[]>(() => [

      {

        radius: 2.00,

        opacity: 0.06,

        speed: 0.25,

        offset: 0,

        color: "#002a55",

      },

      {

        radius: 1.92,

        opacity: 0.05,

        speed: 0.21,

        offset: 8,

        color: "#003f73",

      },

      {

        radius: 1.84,

        opacity: 0.045,

        speed: 0.18,

        offset: 16,

        color: "#005f99",

      },

      {

        radius: 1.76,

        opacity: 0.04,

        speed: 0.15,

        offset: 24,

        color: "#008dcc",

      },

      {

        radius: 1.68,

        opacity: 0.03,

        speed: 0.12,

        offset: 32,

        color: "#35d7ff",

      },

    ], []);

  useFrame((_, delta) => {

    if (!group.current)
      return;

    time.current += delta;

    const tide =
      oceanState.tide ?? 0.5;

    group.current.children.forEach(
      (child, i) => {

        const mesh =
          child as Mesh;

        const layer =
          layers[i];

        const pulse =
          1 +

          Math.sin(

            time.current *

            layer.speed +

            layer.offset,

          ) *

          0.02 *

          tide;

        mesh.scale.setScalar(
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
        >

          <sphereGeometry
            args={[
              layer.radius,
              64,
              64,
            ]}
          />

          <meshBasicMaterial

            color={
              layer.color
            }

            transparent

            opacity={
              layer.opacity
            }

            depthWrite={false}

            side={2}

          />

        </mesh>

      ))}

    </group>

  );

}