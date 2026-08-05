/**
 * ==========================================================
 * LÉLUVERSE
 * SPACE STORM FIELD
 *
 * Living cosmic storms.
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

interface Storm {

  position: Vector3;

  velocity: Vector3;

  radius: number;

  rotation: number;

  spin: number;

  pulse: number;

  color: Color;

}

export default function SpaceStormField() {

  const root =
    useRef<Group>(null);

  const storms =
    useMemo<Storm[]>(() => {

      const colors = [

        "#66ccff",

        "#8d7cff",

        "#00ffff",

        "#ff55ff",

        "#ffee66",

      ];

      return Array
        .from({

          length: 12,

        })

        .map((): Storm => ({

          position:

            new Vector3(

              (Math.random() - 0.5) * 3500,

              (Math.random() - 0.5) * 2200,

              -400 -

              Math.random() * 2600,

            ),

          velocity:

            new Vector3(

              (Math.random() - 0.5) * 0.03,

              (Math.random() - 0.5) * 0.03,

              0,

            ),

          radius:

            20 +

            Math.random() * 70,

          rotation:

            Math.random() *

            Math.PI * 2,

          spin:

            0.02 +

            Math.random() * 0.06,

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

      (storm, i) => {

        const data =
          storms[i];

        if (!data)
          return;

        storm.position.addScaledVector(

          data.velocity,

          delta *

          60,

        );

        storm.rotation.z +=

          data.spin *

          delta;

        const pulse =

          1 +

          Math.sin(

            t +

            data.pulse,

          ) *

          0.2;

        storm.scale.setScalar(

          pulse,

        );

        if (

          storm.position.x >

          1800

        )

          storm.position.x =

            -1800;

        if (

          storm.position.x <

          -1800

        )

          storm.position.x =

            1800;

        if (

          storm.position.y >

          1200

        )

          storm.position.y =

            -1200;

        if (

          storm.position.y <

          -1200

        )

          storm.position.y =

            1200;

      },

    );

  });

  return (

    <group ref={root}>

      {

        storms.map(

          (

            storm,

            index,

          ) => (

            <group

              key={index}

              position={storm.position}

              rotation={[

                0,

                0,

                storm.rotation,

              ]}

            >

              <mesh>

                <ringGeometry

                  args={[

                    storm.radius,

                    storm.radius * 1.4,

                    64,

                  ]}

                />

                <meshBasicMaterial

                  transparent

                  opacity={0.12}

                  color={storm.color}

                />

              </mesh>

              <mesh>

                <sphereGeometry

                  args={[

                    storm.radius * 0.18,

                    20,

                    20,

                  ]}

                />

                <meshBasicMaterial

                  transparent

                  opacity={0.5}

                  color={storm.color}

                />

              </mesh>

            </group>

          ),

        )

      }

    </group>

  );

}