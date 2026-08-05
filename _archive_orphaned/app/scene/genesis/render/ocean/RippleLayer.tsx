/**
 * ==========================================================
 * LÉLUVERSE
 * RIPPLE LAYER
 *
 * Planet-wide ripple propagation.
 *
 * Responsibilities
 * ----------------
 * • Expanding ripples
 * • Interference patterns
 * • Traveling wave fronts
 * • Surface pulse
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Group } from "three";

import type { OceanState } from "./Ocean";

interface Props {
  oceanState?: OceanState;
}

interface Ripple {

  radius: number;

  speed: number;

  offset: number;

  tiltX: number;

  tiltY: number;

}

export default function RippleLayer({

  oceanState = {},

}: Props) {

  const rippleGroup = useRef<Group>(null);

  const time = useRef(0);

  const ripples = useMemo<Ripple[]>(() => {

    return Array.from({

      length: 40,

    }).map((_, i) => ({

      radius: 2.18 + i * 0.035,

      speed: 0.4 + i * 0.015,

      offset: i * 0.35,

      tiltX: Math.sin(i) * 0.4,

      tiltY: Math.cos(i) * 0.4,

    }));

  }, []);

  useFrame((_, delta) => {

    if (!rippleGroup.current) return;

    time.current += delta;

    const tide =

      oceanState.tide ??

      0.5;

    const tsunami =

      oceanState.tsunami ??

      0;

    rippleGroup.current.children.forEach(

      (child, index) => {

        const ripple = ripples[index];

        if (!ripple) return;

        child.rotation.x =

          ripple.tiltX +

          Math.sin(

            time.current *

              0.18 +

              ripple.offset,

          ) *

            0.08;

        child.rotation.y +=

          delta *

          ripple.speed *

          0.08;

        child.rotation.z =

          ripple.tiltY +

          Math.cos(

            time.current *

              0.14 +

              ripple.offset,

          ) *

            0.08;

        const pulse =

          1 +

          Math.sin(

            time.current *

              ripple.speed +

              ripple.offset,

          ) *

            0.025 *

            tide +

          tsunami * 0.08;

        child.scale.set(

          pulse,

          pulse,

          pulse,

        );

      },

    );

  });

  return (

    <group ref={rippleGroup}>

      {ripples.map((ripple, i) => (

        <mesh

          key={i}

          rotation={[

            Math.PI / 2,

            0,

            0,

          ]}

        >

          <torusGeometry

            args={[

              ripple.radius,

              0.0025,

              16,

              256,

            ]}

          />

          <meshBasicMaterial

            color={

              i % 4 === 0

                ? "#8cefff"

                : i % 4 === 1

                ? "#57ddff"

                : i % 4 === 2

                ? "#2fc7ff"

                : "#00a8ff"

            }

            transparent

            opacity={

              0.02 +

              (i % 5) *

                0.008

            }

          />

        </mesh>

      ))}

    </group>

  );

}