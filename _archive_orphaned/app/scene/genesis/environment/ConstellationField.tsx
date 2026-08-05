/**
 * ==========================================================
 * LÉLUVERSE
 * CONSTELLATION FIELD
 *
 * Living constellations that will
 * later power astronomy and astrology.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";

import {
  useMemo,
  useRef,
} from "react";

import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  Vector3,
} from "three";

interface Constellation {

  stars: Vector3[];

  color: Color;

  pulse: number;

}

export default function ConstellationField() {

  const root =
    useRef<Group>(null);

  const constellations =
    useMemo<Constellation[]>(() => {

      return Array
        .from({

          length: 24,

        })

        .map((): Constellation => {

          const stars =
            Array
              .from({

                length:

                  5 +

                  Math.floor(

                    Math.random() * 5,

                  ),

              })

              .map(() =>

                new Vector3(

                  (Math.random() - 0.5) * 4500,

                  (Math.random() - 0.5) * 2500,

                  -1500 -

                  Math.random() * 3500,

                ),

              );

          return {

            stars,

            color:

              new Color(

                "#ffffff",

              ),

            pulse:

              Math.random() *

              Math.PI * 2,

          };

        });

    }, []);

  useFrame(({ clock }) => {

    if (!root.current)
      return;

    const t =
      clock.elapsedTime;

    root.current.children.forEach(

      (group, index) => {

        const data =
          constellations[index];

        if (!data)
          return;

        const scale =

          1 +

          Math.sin(

            t +

            data.pulse,

          ) * 0.03;

        group.scale.setScalar(

          scale,

        );

      },

    );

  });

  return (

    <group ref={root}>

      {

        constellations.map(

          (

            constellation,

            index,

          ) => {

            const geometry =
              new BufferGeometry();

            const vertices:
              number[] = [];

            constellation.stars.forEach(

              star => {

                vertices.push(

                  star.x,

                  star.y,

                  star.z,

                );

              },

            );

            geometry.setAttribute(

              "position",

              new Float32BufferAttribute(

                vertices,

                3,

              ),

            );

            const line =
              new Line(

                geometry,

                new LineBasicMaterial({

                  color:

                    constellation.color,

                  transparent:

                    true,

                  opacity:

                    0.18,

                }),

              );

            return (

              <group

                key={index}

              >

                <primitive

                  object={line}

                />

                {

                  constellation.stars.map(

                    (

                      star,

                      starIndex,

                    ) => {

                      const mesh =
                        new Mesh(

                          new SphereGeometry(

                            1.2,

                            10,

                            10,

                          ),

                          new MeshBasicMaterial({

                            color:

                              "#ffffff",

                          }),

                        );

                      mesh.position.copy(

                        star,

                      );

                      return (

                        <primitive

                          key={starIndex}

                          object={mesh}

                        />

                      );

                    },

                  )

                }

              </group>

            );

          },

        )

      }

    </group>

  );

}