/**
 * ==========================================================
 * LÉLUVERSE
 * COSMIC LIGHTNING FIELD
 *
 * Massive electromagnetic arcs
 * spanning deep space.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";

import {
  useMemo,
  useRef,
} from "react";

import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  Vector3,
} from "three";

interface LightningBolt {

  start: Vector3;

  end: Vector3;

  pulse: number;

  speed: number;

  color: Color;

}

export default function CosmicLightningField() {

  const root =
    useRef<Group>(null);

  const bolts =
    useMemo<LightningBolt[]>(() => {

      const colors = [

        "#66ccff",

        "#8f7dff",

        "#ffffff",

        "#55ffff",

      ];

      return Array
        .from({

          length: 16,

        })

        .map((): LightningBolt => ({

          start:

            new Vector3(

              (Math.random() - 0.5) * 4500,

              (Math.random() - 0.5) * 2500,

              -Math.random() * 5000,

            ),

          end:

            new Vector3(

              (Math.random() - 0.5) * 4500,

              (Math.random() - 0.5) * 2500,

              -Math.random() * 5000,

            ),

          pulse:

            Math.random() *

            Math.PI * 2,

          speed:

            2 +

            Math.random() * 4,

          color:

            new Color(

              colors[
                Math.floor(

                  Math.random() *

                  colors.length,

                )
              ],

            ),

        }));

    }, []);

  const lines =
    useMemo(() => {

      return bolts.map(

        bolt => {

          const geometry =
            new BufferGeometry();

          const points:
            number[] = [];

          const segments =
            12;

          for (

            let i = 0;

            i <= segments;

            i++

          ) {

            const t =
              i / segments;

            const point =
              new Vector3()

                .lerpVectors(

                  bolt.start,

                  bolt.end,

                  t,

                )

                .add(

                  new Vector3(

                    (Math.random() - 0.5) * 60,

                    (Math.random() - 0.5) * 60,

                    (Math.random() - 0.5) * 60,

                  ),

                );

            points.push(

              point.x,

              point.y,

              point.z,

            );

          }

          geometry.setAttribute(

            "position",

            new Float32BufferAttribute(

              points,

              3,

            ),

          );

          return geometry;

        },

      );

    }, [bolts]);

  useFrame(({ clock }) => {

    if (!root.current)
      return;

    const t =
      clock.elapsedTime;

    root.current.children.forEach(

      (

        child,

        i,

      ) => {

        const bolt =
          bolts[i];

        if (!bolt)
          return;

        const line =
          child as Line;

        const material =
          line.material as LineBasicMaterial;

        material.opacity =

          0.1 +

          Math.abs(

            Math.sin(

              t *

              bolt.speed +

              bolt.pulse,

            ),

          ) * 0.9;

      },

    );

  });

  return (

    <group ref={root}>

      {

        lines.map(

          (

            geometry,

            index,

          ) => {

            const bolt =
              bolts[index];

            if (!bolt)
              return null;

            return (

              <primitive

                key={index}

                object={

                  new Line(

                    geometry,

                    new LineBasicMaterial({

                      color:

                        bolt.color,

                      transparent:

                        true,

                      opacity:

                        0.5,

                    }),

                  )

                }

              />

            );

          },

        )

      }

    </group>

  );

}