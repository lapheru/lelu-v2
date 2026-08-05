/**
 * ==========================================================
 * LÉLUVERSE
 * CAUSTIC PROJECTOR
 *
 * Projects animated caustic light throughout
 * the Genesis Ocean.
 *
 * Responsibilities
 * ----------------
 * • Project moving caustic patterns
 * • Sweep refracted light
 * • Layered illumination
 * • Tide & current response
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import {
  useMemo,
  useRef,
} from "react";

import {
  Group,
  SpotLight,
} from "three";

import type { OceanState } from "../../Ocean";

interface Props {
  oceanState?: OceanState;
}

interface Projector {

  x: number;

  y: number;

  z: number;

  speed: number;

  offset: number;

  intensity: number;

  angle: number;

  distance: number;

  color: string;

}

export default function CausticProjector({
  oceanState = {},
}: Props) {

  const group =
    useRef<Group>(null);

  const time =
    useRef(0);

  const projectors =
    useMemo<Projector[]>(() => [

      {

        x: 0,

        y: 5,

        z: 0,

        speed: 0.35,

        offset: 0,

        intensity: 2,

        angle: 0.7,

        distance: 10,

        color: "#d8fbff",

      },

      {

        x: 2,

        y: 4.6,

        z: -2,

        speed: 0.25,

        offset: 15,

        intensity: 1.5,

        angle: 0.6,

        distance: 9,

        color: "#87ebff",

      },

      {

        x: -2,

        y: 4.8,

        z: 2,

        speed: 0.28,

        offset: 30,

        intensity: 1.5,

        angle: 0.6,

        distance: 9,

        color: "#9ff5ff",

      },

    ], []);

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

        const light =
          child as SpotLight;

        const projector =
          projectors[i];

        light.position.x =

          projector.x +

          Math.sin(

            time.current *

            projector.speed +

            projector.offset,

          ) *

          0.4 *

          current;

        light.position.z =

          projector.z +

          Math.cos(

            time.current *

            projector.speed +

            projector.offset,

          ) *

          0.4 *

          current;

        light.position.y =

          projector.y +

          Math.sin(

            time.current *

            0.8 +

            projector.offset,

          ) *

          0.15 *

          tide;

        light.intensity =

          projector.intensity +

          Math.sin(

            time.current *

            1.4 +

            projector.offset,

          ) *

          0.3;

      },

    );

  });

  return (

    <group ref={group}>

      {projectors.map((

        projector,

        i,

      ) => (

        <spotLight

          key={i}

          color={
            projector.color
          }

          position={[
            projector.x,
            projector.y,
            projector.z,
          ]}

          intensity={
            projector.intensity
          }

          angle={
            projector.angle
          }

          distance={
            projector.distance
          }

          penumbra={1}

          decay={2}

          castShadow={false}

        />

      ))}

    </group>

  );

}