/**
 * ==========================================================
 * LÉLUVERSE
 * PLASMA FIELD
 *
 * Living plasma rivers flowing
 * throughout the universe.
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

interface PlasmaStream {

  position: Vector3;

  direction: Vector3;

  speed: number;

  length: number;

  width: number;

  color: Color;

  pulse: number;

}

export default function PlasmaField() {

  const root =
    useRef<Group>(null);

  const streams =
    useMemo<PlasmaStream[]>(() => {

      const colors = [

        "#00ffff",

        "#4da6ff",

        "#8f7cff",

        "#5effd6",

        "#ffffff",

      ];

      return Array
        .from({

          length: 40,

        })

        .map((): PlasmaStream => ({

          position:

            new Vector3(

              (Math.random() - 0.5) * 4000,

              (Math.random() - 0.5) * 2500,

              -300 -

              Math.random() * 3000,

            ),

          direction:

            new Vector3(

              Math.random() - 0.5,

              Math.random() - 0.5,

              0,

            ).normalize(),

          speed:

            0.1 +

            Math.random() * 0.3,

          length:

            15 +

            Math.random() * 40,

          width:

            0.3 +

            Math.random() * 1.5,

          pulse:

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

      (stream, i) => {

        const data =
          streams[i];

        if (!data)
          return;

        stream.position.addScaledVector(

          data.direction,

          data.speed *

          delta,

        );

        stream.rotation.z +=

          delta *

          0.05;

        const pulse =

          1 +

          Math.sin(

            t *

            2 +

            data.pulse,

          ) *

          0.25;

        stream.scale.y =

          pulse;

        if (

          stream.position.x >

          2000

        )

          stream.position.x =

            -2000;

        if (

          stream.position.x <

          -2000

        )

          stream.position.x =

            2000;

        if (

          stream.position.y >

          1500

        )

          stream.position.y =

            -1500;

        if (

          stream.position.y <

          -1500

        )

          stream.position.y =

            1500;

      },

    );

  });

  return (

    <group ref={root}>

      {

        streams.map(

          (

            stream,

            index,

          ) => (

            <mesh

              key={index}

              position={stream.position}

            >

              <cylinderGeometry

                args={[

                  stream.width,

                  stream.width,

                  stream.length,

                  12,

                ]}

              />

              <meshBasicMaterial

                transparent

                opacity={0.18}

                color={stream.color}

              />

            </mesh>

          ),

        )

      }

    </group>

  );

}