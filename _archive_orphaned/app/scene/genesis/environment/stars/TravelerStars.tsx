/**
 * ==========================================================
 * LÉLUVERSE
 * TRAVELER STARS
 *
 * Fast moving stars that cross
 * the universe from every direction.
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

const COUNT = 220;

const RANGE = 500;

export default function TravelerStars() {

  const root = useRef<Group>(null);

  const stars = useMemo<LivingStar[]>(() => {

    return Array.from({

      length: COUNT,

    }).map((_, index) => ({

      id: index,

      position: [

        (Math.random() - .5) * RANGE,

        (Math.random() - .5) * RANGE,

        -Math.random() * RANGE,

      ],

      velocity: [

        (Math.random() - .5) * 1.5,

        (Math.random() - .5) * 1.5,

        3 + Math.random() * 8,

      ],

      acceleration: [0, 0, 0],

      size:

        .03 + Math.random() * .07,

      brightness: 1,

      opacity: 1,

      energy: 1,

      age: 0,

      lifetime:

        4 + Math.random() * 8,

      pulse:

        Math.random() * Math.PI * 2,

      rotation: 0,

      group: 0,

      target: null,

      behavior:

        StarBehavior.TRAVELER,

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

        star.velocity[0] *

        delta * 8;

      mesh.position.y +=

        star.velocity[1] *

        delta * 8;

      mesh.position.z +=

        star.velocity[2] *

        delta * 8;

      mesh.position.x +=

        Math.sin(

          t +

          star.pulse,

        ) *

        delta;

      mesh.position.y +=

        Math.cos(

          t * .8 +

          star.pulse,

        ) *

        delta;

      mesh.scale.setScalar(

        1 +

        Math.sin(

          t * 8 +

          star.pulse,

        ) * .4,

      );

      if (

        star.age >

        star.lifetime ||

        mesh.position.z > 30 ||

        Math.abs(mesh.position.x) > RANGE ||

        Math.abs(mesh.position.y) > RANGE

      ) {

        star.age = 0;

        star.lifetime =

          4 + Math.random() * 8;

        mesh.position.set(

          (Math.random() - .5) * RANGE,

          (Math.random() - .5) * RANGE,

          -RANGE,

        );

      }

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

              color="#AEEBFF"

            />

          </mesh>

        ))

      }

    </group>

  );

}