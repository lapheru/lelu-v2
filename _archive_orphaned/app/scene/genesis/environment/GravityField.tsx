/**
 * ==========================================================
 * LÉLUVERSE
 * GRAVITY FIELD
 *
 * Invisible gravity wells that
 * influence the universe.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";

import {
  useMemo,
  useRef,
} from "react";

import {
  Group,
  Vector3,
  Color,
} from "three";

interface GravityWell {

  position: Vector3;

  radius: number;

  strength: number;

  pulse: number;

  rotation: number;

  color: Color;

}

export default function GravityField() {

  const root =
    useRef<Group>(null);

  const wells =
    useMemo<GravityWell[]>(() => {

      const colors = [

        "#4466ff",

        "#6644ff",

        "#33bbff",

      ];

      return Array
        .from({

          length: 18,

        })

        .map((): GravityWell => ({

          position:

            new Vector3(

              (Math.random() - 0.5) * 3500,

              (Math.random() - 0.5) * 2200,

              -300 -

              Math.random() * 2600,

            ),

          radius:

            20 +

            Math.random() * 60,

          strength:

            0.5 +

            Math.random() * 2,

          pulse:

            Math.random() *

            Math.PI * 2,

          rotation:

            Math.random() *

            Math.PI * 2,

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

  useFrame(({ clock }, delta) => {

    if (!root.current)
      return;

    const t =
      clock.elapsedTime;

    root.current.children.forEach(

      (well, i) => {

        const data =
          wells[i];

        if (!data)
          return;

        well.rotation.z +=

          delta *

          0.03;

        const pulse =

          1 +

          Math.sin(

            t +

            data.pulse,

          ) *

          0.15;

        well.scale.setScalar(

          pulse,

        );

      },

    );

  });

  return (

    <group ref={root}>

      {

        wells.map(

          (

            well,

            index,

          ) => (

            <group

              key={index}

              position={well.position}

            >

              <mesh>

                <ringGeometry

                  args={[

                    well.radius,

                    well.radius * 1.1,

                    64,

                  ]}

                />

                <meshBasicMaterial

                  transparent

                  opacity={0.08}

                  color={well.color}

                />

              </mesh>

              <mesh>

                <sphereGeometry

                  args={[

                    well.radius * 0.12,

                    16,

                    16,

                  ]}

                />

                <meshBasicMaterial

                  transparent

                  opacity={0.4}

                  color={well.color}

                />

              </mesh>

            </group>

          ),

        )

      }

    </group>

  );

}