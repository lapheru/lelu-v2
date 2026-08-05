/**
 * ==========================================================
 * LÉLUVERSE
 * QUASAR FIELD
 *
 * Ancient galactic cores emitting
 * powerful energy jets.
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

interface Quasar {

  position: Vector3;

  rotation: number;

  speed: number;

  pulse: number;

  size: number;

  color: Color;

}

export default function QuasarField() {

  const root =
    useRef<Group>(null);

  const quasars =
    useMemo<Quasar[]>(() => {

      return Array
        .from({

          length: 5,

        })

        .map((): Quasar => ({

          position:

            new Vector3(

              (Math.random() - 0.5) * 6000,

              (Math.random() - 0.5) * 3500,

              -1500 -

              Math.random() * 6000,

            ),

          rotation:

            Math.random() *

            Math.PI * 2,

          speed:

            0.01 +

            Math.random() * 0.02,

          pulse:

            Math.random() *

            Math.PI * 2,

          size:

            10 +

            Math.random() * 20,

          color:

            new Color(

              "#66ddff",

            ),

        }));

    }, []);

  useFrame(({ clock }, delta) => {

    if (!root.current)
      return;

    const t =
      clock.elapsedTime;

    root.current.children.forEach(

      (quasar, i) => {

        const data =
          quasars[i];

        if (!data)
          return;

        quasar.rotation.y +=

          data.speed *

          delta;

        const scale =

          1 +

          Math.sin(

            t *

            2 +

            data.pulse,

          ) *

          0.15;

        quasar.scale.setScalar(

          scale,

        );

      },

    );

  });

  return (

    <group ref={root}>

      {

        quasars.map(

          (

            quasar,

            index,

          ) => (

            <group

              key={index}

              position={quasar.position}

            >

              <mesh>

                <sphereGeometry

                  args={[

                    quasar.size,

                    24,

                    24,

                  ]}

                />

                <meshBasicMaterial

                  color="white"

                />

              </mesh>

              <mesh

                rotation={[

                  Math.PI / 2,

                  0,

                  0,

                ]}

              >

                <cylinderGeometry

                  args={[

                    0.6,

                    0.6,

                    quasar.size * 15,

                    12,

                  ]}

                />

                <meshBasicMaterial

                  transparent

                  opacity={0.25}

                  color={quasar.color}

                />

              </mesh>

              <mesh

                rotation={[

                  0,

                  0,

                  Math.PI / 2,

                ]}

              >

                <cylinderGeometry

                  args={[

                    0.6,

                    0.6,

                    quasar.size * 15,

                    12,

                  ]}

                />

                <meshBasicMaterial

                  transparent

                  opacity={0.25}

                  color={quasar.color}

                />

              </mesh>

            </group>

          ),

        )

      }

    </group>

  );

}