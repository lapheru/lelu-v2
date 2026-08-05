/**
 * ==========================================================
 * LÉLUVERSE
 * COMET FIELD
 *
 * Ancient comets wandering
 * through the universe.
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

interface Comet {

  position: Vector3;

  velocity: Vector3;

  size: number;

  tail: number;

  color: Color;

}

export default function CometField() {

  const root =
    useRef<Group>(null);

  const comets =
    useMemo<Comet[]>(() => {

      return Array
        .from({

          length: 30,

        })

        .map((): Comet => ({

          position:

            new Vector3(

              (Math.random() - 0.5) * 5000,

              (Math.random() - 0.5) * 3000,

              -Math.random() * 5000,

            ),

          velocity:

            new Vector3(

              0.2 +

              Math.random() * 0.5,

              (Math.random() - 0.5) * 0.15,

              0.05 +

              Math.random() * 0.15,

            ),

          size:

            0.6 +

            Math.random() * 2.2,

          tail:

            10 +

            Math.random() * 30,

          color:

            new Color(

              "#dff6ff",

            ),

        }));

    }, []);

  useFrame((_, delta) => {

    if (!root.current)
      return;

    root.current.children.forEach(

      (comet, i) => {

        const data =
          comets[i];

        if (!data)
          return;

        comet.position.addScaledVector(

          data.velocity,

          delta * 30,

        );

        comet.rotation.z +=

          delta * 0.5;

        if (

          comet.position.x >
          2600

        ) {

          comet.position.x =
            -2600;

        }

        if (

          comet.position.y >
          1700

        ) {

          comet.position.y =
            -1700;

        }

      },

    );

  });

  return (

    <group ref={root}>

      {

        comets.map(

          (

            comet,

            index,

          ) => (

            <group

              key={index}

              position={comet.position}

            >

              <mesh>

                <sphereGeometry

                  args={[

                    comet.size,

                    12,

                    12,

                  ]}

                />

                <meshBasicMaterial

                  color="white"

                />

              </mesh>

              <mesh

                position={[

                  -comet.tail / 2,

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

                    comet.size * 0.25,

                    comet.size,

                    comet.tail,

                    12,

                  ]}

                />

                <meshBasicMaterial

                  transparent

                  opacity={0.18}

                  color={comet.color}

                />

              </mesh>

            </group>

          ),

        )

      }

    </group>

  );

}