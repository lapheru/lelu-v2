/**
 * ==========================================================
 * LÉLUVERSE
 * GALAXY CLUSTER FIELD
 *
 * Massive galaxy clusters drifting
 * through deep space.
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

interface Cluster {

  center: Vector3;

  radius: number;

  speed: number;

  rotation: number;

  galaxies: Vector3[];

}

export default function GalaxyClusterField() {

  const root =
    useRef<Group>(null);

  const clusters =
    useMemo<Cluster[]>(() => {

      return Array
        .from({

          length: 6,

        })

        .map((): Cluster => {

          const radius =

            50 +

            Math.random() * 80;

          return {

            center:

              new Vector3(

                (Math.random() - 0.5) * 2500,

                (Math.random() - 0.5) * 1800,

                -800 -

                Math.random() * 2500,

              ),

            radius,

            speed:

              0.001 +

              Math.random() * 0.002,

            rotation:

              Math.random() *

              Math.PI * 2,

            galaxies:

              Array
                .from({

                  length:

                    20 +

                    Math.floor(

                      Math.random() * 30,

                    ),

                })

                .map(() => {

                  const angle =

                    Math.random() *

                    Math.PI * 2;

                  const r =

                    Math.random() *

                    radius;

                  return new Vector3(

                    Math.cos(angle) * r,

                    Math.sin(angle) * r,

                    (Math.random() - 0.5) * 60,

                  );

                }),

          };

        });

    }, []);

  useFrame((_, delta) => {

    if (!root.current)
      return;

    root.current.children.forEach(

      (cluster, index) => {

        const data =
          clusters[index];

        if (!data)
          return;

        cluster.rotation.z +=

          data.speed *

          delta;

      },

    );

  });

  return (

    <group ref={root}>

      {

        clusters.map(

          (

            cluster,

            index,

          ) => (

            <group

              key={index}

              position={cluster.center}

              rotation={[

                0,

                0,

                cluster.rotation,

              ]}

            >

              {

                cluster.galaxies.map(

                  (

                    galaxy,

                    galaxyIndex,

                  ) => (

                    <group

                      key={galaxyIndex}

                      position={galaxy}

                      scale={

                        4 +

                        Math.random() * 8

                      }

                    >

                      <mesh>

                        <ringGeometry

                          args={[

                            0.6,

                            1.1,

                            32,

                          ]}

                        />

                        <meshBasicMaterial

                          transparent

                          opacity={0.08}

                          color="#7db8ff"

                        />

                      </mesh>

                      <mesh>

                        <sphereGeometry

                          args={[

                            0.15,

                            10,

                            10,

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

          ),

        )

      }

    </group>

  );

}