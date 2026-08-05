/**
 * ==========================================================
 * LÉLUVERSE
 * BLACK HOLE FIELD
 *
 * Living singularities that warp
 * the surrounding universe.
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

interface BlackHole {

  position: Vector3;

  radius: number;

  rotation: number;

  speed: number;

  pulse: number;

  color: Color;

}

export default function BlackHoleField() {

  const root =
    useRef<Group>(null);

  const holes =
    useMemo<BlackHole[]>(() => {

      return Array
        .from({

          length: 8,

        })

        .map((): BlackHole => ({

          position:

            new Vector3(

              (Math.random() - 0.5) * 4500,

              (Math.random() - 0.5) * 2500,

              -600 -
              Math.random() * 3500,

            ),

          radius:

            6 +
            Math.random() * 20,

          rotation:

            Math.random() *
            Math.PI * 2,

          speed:

            0.03 +
            Math.random() * 0.04,

          pulse:

            Math.random() *
            Math.PI * 2,

          color:

            new Color(

              "#7b5cff",

            ),

        }));

    }, []);

  useFrame(({ clock }, delta) => {

    if (!root.current)
      return;

    const t =
      clock.elapsedTime;

    root.current.children.forEach(

      (hole, i) => {

        const data =
          holes[i];

        if (!data)
          return;

        hole.rotation.z +=

          data.speed *
          delta;

        const pulse =

          1 +

          Math.sin(

            t +
            data.pulse,

          ) * 0.08;

        hole.scale.setScalar(

          pulse,

        );

      },

    );

  });

  return (

    <group ref={root}>

      {

        holes.map(

          (hole, index) => (

            <group

              key={index}

              position={hole.position}

            >

              <mesh>

                <sphereGeometry

                  args={[

                    hole.radius,

                    32,

                    32,

                  ]}

                />

                <meshBasicMaterial

                  color="black"

                />

              </mesh>

              <mesh>

                <torusGeometry

                  args={[

                    hole.radius * 1.8,

                    hole.radius * 0.15,

                    24,

                    96,

                  ]}

                />

                <meshBasicMaterial

                  transparent

                  opacity={0.25}

                  color={hole.color}

                />

              </mesh>

              <mesh>

                <ringGeometry

                  args={[

                    hole.radius * 2.3,

                    hole.radius * 2.7,

                    96,

                  ]}

                />

                <meshBasicMaterial

                  transparent

                  opacity={0.08}

                  color="#66ccff"

                />

              </mesh>

            </group>

          ),

        )

      }

    </group>

  );

}