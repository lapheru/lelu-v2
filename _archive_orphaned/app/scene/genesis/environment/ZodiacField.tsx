/**
 * ==========================================================
 * LÉLUVERSE
 * ZODIAC FIELD
 *
 * Twelve zodiac anchors surrounding
 * the celestial sphere.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";

import {
  useMemo,
  useRef,
} from "react";

import {
  Color,
  Group,
  Vector3,
} from "three";

interface ZodiacSign {

  name: string;

  position: Vector3;

  color: Color;

  pulse: number;

}

export default function ZodiacField() {

  const root =
    useRef<Group>(null);

  const zodiac =
    useMemo<ZodiacSign[]>(() => {

      const names = [

        "Aries",

        "Taurus",

        "Gemini",

        "Cancer",

        "Leo",

        "Virgo",

        "Libra",

        "Scorpio",

        "Sagittarius",

        "Capricorn",

        "Aquarius",

        "Pisces",

      ];

      const radius =
        2600;

      return names.map(

        (

          name,

          index,

        ): ZodiacSign => {

          const angle =

            (

              index /

              names.length

            ) *

            Math.PI *

            2;

          return {

            name,

            position:

              new Vector3(

                Math.cos(

                  angle,

                ) *

                radius,

                Math.sin(

                  angle,

                ) *

                700,

                Math.sin(

                  angle,

                ) *

                radius,

              ),

            color:

              new Color(

                "#ffffff",

              ),

            pulse:

              Math.random() *

              Math.PI *

              2,

          };

        },

      );

    }, []);

  useFrame(

    ({

      clock,

    }) => {

      if (

        !root.current

      )

        return;

      const t =

        clock.elapsedTime;

      root.current.children.forEach(

        (

          sign,

          index,

        ) => {

          const data =

            zodiac[index];

          if (!data)
            return;

          sign.lookAt(

            0,

            0,

            0,

          );

          const scale =

            1 +

            Math.sin(

              t +

              data.pulse,

            ) *

            0.2;

          sign.scale.setScalar(

            scale,

          );

        },

      );

    },

  );

  return (

    <group ref={root}>

      {

        zodiac.map(

          (

            sign,

            index,

          ) => (

            <mesh

              key={index}

              position={

                sign.position

              }

            >

              <sphereGeometry

                args={[

                  6,

                  16,

                  16,

                ]}

              />

              <meshBasicMaterial

                color={

                  sign.color

                }

              />

            </mesh>

          ),

        )

      }

    </group>

  );

}