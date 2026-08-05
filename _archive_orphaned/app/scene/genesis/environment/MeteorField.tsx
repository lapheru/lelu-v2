/**
 * ==========================================================
 * LÉLUVERSE
 * METEOR FIELD
 *
 * Random meteor showers
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

interface Meteor {

  position: Vector3;

  velocity: Vector3;

  size: number;

  tail: number;

  life: number;

  maxLife: number;

  color: Color;

}

export default function MeteorField() {

  const root =
    useRef<Group>(null);

  const meteors =
    useMemo<Meteor[]>(() => {

      return Array
        .from({

          length: 120,

        })

        .map((): Meteor => {

          const maxLife =

            4 +

            Math.random() * 8;

          return {

            position:

              new Vector3(

                (Math.random() - 0.5) * 5000,

                1800 +

                Math.random() * 1200,

                -Math.random() * 5000,

              ),

            velocity:

              new Vector3(

                -4 -

                Math.random() * 6,

                -2 -

                Math.random() * 3,

                0.2 +

                Math.random() * 0.4,

              ),

            size:

              0.15 +

              Math.random() * 0.6,

            tail:

              4 +

              Math.random() * 12,

            life:

              maxLife,

            maxLife,

            color:

              new Color(

                "#ffffff",

              ),

          };

        });

    }, []);

  useFrame((_, delta) => {

    if (!root.current)
      return;

    root.current.children.forEach(

      (meteor, i) => {

        const data =
          meteors[i];

        if (!data)
          return;

        meteor.position.addScaledVector(

          data.velocity,

          delta *

          20,

        );

        data.life -=

          delta;

        if (

          data.life <=

          0

        ) {

          data.life =

            data.maxLife;

          meteor.position.set(

            (Math.random() - 0.5) * 5000,

            1800 +

            Math.random() * 1200,

            -Math.random() * 5000,

          );

        }

      },

    );

  });

  return (

    <group ref={root}>

      {

        meteors.map(

          (

            meteor,

            index,

          ) => (

            <group

              key={index}

              position={meteor.position}

            >

              <mesh>

                <sphereGeometry

                  args={[

                    meteor.size,

                    8,

                    8,

                  ]}

                />

                <meshBasicMaterial

                  color="white"

                />

              </mesh>

              <mesh

                position={[

                  meteor.tail * -0.5,

                  0,

                  0,

                ]}

                rotation={[

                  0,

                  0,

                  Math.PI / 2,

                ]}

              >

                <cylinderGeometry

                  args={[

                    meteor.size * 0.15,

                    meteor.size,

                    meteor.tail,

                    8,

                  ]}

                />

                <meshBasicMaterial

                  transparent

                  opacity={0.22}

                  color={meteor.color}

                />

              </mesh>

            </group>

          ),

        )

      }

    </group>

  );

}