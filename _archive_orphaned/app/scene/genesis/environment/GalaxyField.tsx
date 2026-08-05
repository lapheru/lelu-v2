/**
 * ==========================================================
 * LÉLUVERSE
 * GALAXY FIELD
 *
 * Infinite drifting galaxies.
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
} from "three";

interface Galaxy {

  position: Vector3;

  rotation: number;

  speed: number;

  scale: number;

}

export default function GalaxyField() {

  const root =
    useRef<Group>(null);

  const galaxies =
    useMemo<Galaxy[]>(() => {

      return Array
        .from({

          length: 12,

        })

        .map((): Galaxy => ({

          position:

            new Vector3(

              (Math.random() - 0.5) * 1200,

              (Math.random() - 0.5) * 600,

              -300 -

              Math.random() * 900,

            ),

          rotation:

            Math.random() *

            Math.PI * 2,

          speed:

            0.002 +

            Math.random() * 0.006,

          scale:

            20 +

            Math.random() * 70,

        }));

    }, []);

  useFrame((_, delta) => {

    if (!root.current)
      return;

    root.current.children.forEach(

      (galaxy, i) => {

        const data =
          galaxies[i];

        if (!data)
          return;

        galaxy.rotation.z +=

          data.speed *

          delta;

      },

    );

  });

  return (

    <group ref={root}>

      {

        galaxies.map(

          (

            galaxy,

            index,

          ) => (

            <group

              key={index}

              position={galaxy.position}

              rotation={[

                0,

                0,

                galaxy.rotation,

              ]}

              scale={galaxy.scale}

            >

              <mesh>

                <ringGeometry

                  args={[

                    0.8,

                    1.4,

                    64,

                  ]}

                />

                <meshBasicMaterial

                  transparent

                  opacity={0.08}

                  color="#9ecbff"

                />

              </mesh>

              <mesh>

                <sphereGeometry

                  args={[

                    0.15,

                    16,

                    16,

                  ]}

                />

                <meshBasicMaterial

                  color="white"

                />

              </mesh>

            </group>

          ),

        )

      }

    </group>

  );

}