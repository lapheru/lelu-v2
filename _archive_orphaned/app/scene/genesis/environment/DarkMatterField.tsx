/**
 * ==========================================================
 * LÉLUVERSE
 * DARK MATTER FIELD
 *
 * Invisible currents shaping
 * the universe.
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

interface DarkMatterCurrent {

  position: Vector3;

  direction: Vector3;

  speed: number;

  radius: number;

  pulse: number;

  color: Color;

}

export default function DarkMatterField() {

  const root =
    useRef<Group>(null);

  const currents =
    useMemo<DarkMatterCurrent[]>(() => {

      return Array
        .from({

          length: 18,

        })

        .map((): DarkMatterCurrent => ({

          position:

            new Vector3(

              (Math.random() - 0.5) * 5000,

              (Math.random() - 0.5) * 3000,

              -Math.random() * 6000,

            ),

          direction:

            new Vector3(

              Math.random() - 0.5,

              Math.random() - 0.5,

              Math.random() - 0.5,

            ).normalize(),

          speed:

            0.05 +

            Math.random() * 0.15,

          radius:

            8 +

            Math.random() * 20,

          pulse:

            Math.random() *

            Math.PI * 2,

          color:

            new Color(

              "#5533ff",

            ),

        }));

    }, []);

  useFrame(({ clock }, delta) => {

    if (!root.current)
      return;

    const t =
      clock.elapsedTime;

    root.current.children.forEach(

      (current, i) => {

        const data =
          currents[i];

        if (!data)
          return;

        current.position.addScaledVector(

          data.direction,

          data.speed *

          delta *

          10,

        );

        current.rotation.y +=

          delta *

          0.05;

        const scale =

          1 +

          Math.sin(

            t +

            data.pulse,

          ) *

          0.2;

        current.scale.setScalar(

          scale,

        );

        if (

          current.position.x >

          2600

        )

          current.position.x =

            -2600;

        if (

          current.position.x <

          -2600

        )

          current.position.x =

            2600;

        if (

          current.position.y >

          1800

        )

          current.position.y =

            -1800;

        if (

          current.position.y <

          -1800

        )

          current.position.y =

            1800;

      },

    );

  });

  return (

    <group ref={root}>

      {

        currents.map(

          (

            current,

            index,

          ) => (

            <mesh

              key={index}

              position={current.position}

            >

              <sphereGeometry

                args={[

                  current.radius,

                  20,

                  20,

                ]}

              />

              <meshBasicMaterial

                transparent

                opacity={0.03}

                color={current.color}

              />

            </mesh>

          ),

        )

      }

    </group>

  );

}