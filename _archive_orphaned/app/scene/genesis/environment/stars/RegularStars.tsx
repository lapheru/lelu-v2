/**
 * ==========================================================
 * LÉLUVERSE
 * REGULAR STARS
 *
 * Foundation star system.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";

import {
  useMemo,
  useRef,
} from "react";

import {
  Group,
  Mesh,
} from "three";

import type {
  LivingStar,
} from "./StarTypes";

import {
  StarBehavior,
} from "./StarBehavior";

const COUNT = 1000;

const RANGE = 450;

export default function RegularStars() {

  const root = useRef<Group>(null);

  const stars = useMemo<LivingStar[]>(() => {

    return Array.from({

      length: COUNT,

    }).map((_, index) => ({

      id: index,

      position: [

        (Math.random() - .5) * RANGE * 2,

        (Math.random() - .5) * RANGE * 2,

        -Math.random() * RANGE,

      ],

      velocity: [

        (Math.random() - .5) * .02,

        (Math.random() - .5) * .02,

        .3 + Math.random() * 1.5,

      ],

      acceleration: [0, 0, 0],

      size:

        .01 + Math.random() * .04,

      brightness:

        .4 + Math.random() * .6,

      opacity: 1,

      energy: 1,

      age: 0,

      lifetime: 999999,

      pulse:

        Math.random() * Math.PI * 2,

      rotation: 0,

      group: 0,

      target: null,

      behavior:

        StarBehavior.REGULAR,

    }));

  }, []);

  useFrame(({ clock }, delta) => {

    if (!root.current) return;

    const t = clock.elapsedTime;

    root.current.children.forEach((child, index) => {

      const mesh = child as Mesh;

      const star = stars[index];

      star.age += delta;

      mesh.position.x +=

        star.velocity[0];

      mesh.position.y +=

        star.velocity[1];

      mesh.position.z +=

        star.velocity[2] *

        delta * 18;

      mesh.position.x +=

        Math.sin(

          t * .08 +

          star.pulse,

        ) *

        delta * .08;

      mesh.position.y +=

        Math.cos(

          t * .05 +

          star.pulse,

        ) *

        delta * .08;

      if (

        mesh.position.z > 20

      ) {

        mesh.position.z = -RANGE;

        mesh.position.x =

          (Math.random() - .5) *

          RANGE * 2;

        mesh.position.y =

          (Math.random() - .5) *

          RANGE * 2;

      }

      mesh.scale.setScalar(

        .7 +

        Math.sin(

          t * 2 +

          star.pulse,

        ) * .25,

      );

    });

  });

  return (

    <group ref={root}>

      {

        stars.map((star) => (

          <mesh

            key={star.id}

            position={star.position}

          >

            <sphereGeometry

              args={[

                star.size,

                5,

                5,

              ]}

            />

            <meshBasicMaterial

              color="#FFFFFF"

            />

          </mesh>

        ))

      }

    </group>

  );

}