/**
 * ==========================================================
 * LÉLUVERSE
 * TRAVELER FIELD
 *
 * Ancient wandering stars carrying
 * memories, knowledge and events.
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

interface Traveler {

  position: Vector3;

  velocity: Vector3;

  size: number;

  pulse: number;

  speed: number;

  color: Color;

}

export default function TravelerField() {

  const root =
    useRef<Group>(null);

  const travelers =
    useMemo<Traveler[]>(() => {

      const colors = [

        "#ffffff",

        "#8fd3ff",

        "#b18cff",

        "#ffe066",

        "#66ffd8",

      ];

      return Array
        .from({

          length: 80,

        })

        .map((): Traveler => ({

          position:

            new Vector3(

              (Math.random() - 0.5) * 5000,

              (Math.random() - 0.5) * 3000,

              -Math.random() * 5000,

            ),

          velocity:

            new Vector3(

              (Math.random() - 0.5) * 0.5,

              (Math.random() - 0.5) * 0.5,

              (Math.random() - 0.5) * 0.2,

            ),

          size:

            0.2 +

            Math.random() * 0.8,

          pulse:

            Math.random() *

            Math.PI * 2,

          speed:

            0.3 +

            Math.random() * 0.7,

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

      (traveler, i) => {

        const data =
          travelers[i];

        if (!data)
          return;

        traveler.position.addScaledVector(

          data.velocity,

          data.speed *

          delta *

          20,

        );

        const pulse =

          1 +

          Math.sin(

            t *

            2 +

            data.pulse,

          ) *

          0.25;

        traveler.scale.setScalar(

          pulse,

        );

        if (

          traveler.position.x >

          2600

        )

          traveler.position.x =

            -2600;

        if (

          traveler.position.x <

          -2600

        )

          traveler.position.x =

            2600;

        if (

          traveler.position.y >

          1800

        )

          traveler.position.y =

            -1800;

        if (

          traveler.position.y <

          -1800

        )

          traveler.position.y =

            1800;

        if (

          traveler.position.z >

          500

        )

          traveler.position.z =

            -5000;

      },

    );

  });

  return (

    <group ref={root}>

      {

        travelers.map(

          (

            traveler,

            index,

          ) => (

            <mesh

              key={index}

              position={

                traveler.position

              }

            >

              <sphereGeometry

                args={[

                  traveler.size,

                  10,

                  10,

                ]}

              />

              <meshBasicMaterial

                color={

                  traveler.color

                }

                transparent

                opacity={0.9}

              />

            </mesh>

          ),

        )

      }

    </group>

  );

}