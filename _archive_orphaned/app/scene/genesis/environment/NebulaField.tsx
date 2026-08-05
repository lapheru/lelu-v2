/**
 * ==========================================================
 * LÉLUVERSE
 * NEBULA FIELD
 *
 * Living procedural nebula clouds.
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

interface Nebula {

  position: Vector3;

  scale: number;

  speed: number;

  color: Color;

  rotation: number;

}

export default function NebulaField() {

  const root =
    useRef<Group>(null);

  const nebulae =
    useMemo<Nebula[]>(() => {

      const colors = [

        "#7f5cff",

        "#4dc3ff",

        "#ff6fb3",

        "#7dffbe",

        "#ffd36f",

        "#c29bff",

      ];

      return Array
        .from({

          length: 24,

        })

        .map((): Nebula => ({

          position:

            new Vector3(

              (Math.random() - 0.5) * 3000,

              (Math.random() - 0.5) * 1800,

              -400 -

              Math.random() * 2500,

            ),

          scale:

            60 +

            Math.random() * 180,

          speed:

            0.002 +

            Math.random() * 0.003,

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

  useFrame((_, delta) => {

    if (!root.current)
      return;

    root.current.children.forEach(

      (cloud, i) => {

        const data =
          nebulae[i];

        if (!data)
          return;

        cloud.rotation.z +=

          data.speed *

          delta;

        cloud.rotation.x +=

          data.speed *

          0.25 *

          delta;

      },

    );

  });

  return (

    <group ref={root}>

      {

        nebulae.map(

          (

            nebula,

            index,

          ) => (

            <mesh

              key={index}

              position={nebula.position}

              rotation={[

                0,

                0,

                nebula.rotation,

              ]}

              scale={nebula.scale}

            >

              <sphereGeometry

                args={[

                  1,

                  24,

                  24,

                ]}

              />

              <meshBasicMaterial

                transparent

                opacity={0.035}

                color={nebula.color}

                depthWrite={false}

              />

            </mesh>

          ),

        )

      }

    </group>

  );

}