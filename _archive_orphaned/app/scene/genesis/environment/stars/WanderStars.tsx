/**
 * ==========================================================
 * LÉLUVERSE
 * WANDER STARS
 *
 * Curious stars that wander,
 * change direction, gather into
 * small pods, then separate.
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

const COUNT = 240;

const RANGE = 450;

export default function WanderStars() {

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

        (Math.random() - .5),

        (Math.random() - .5),

        (Math.random() - .5),

      ],

      acceleration: [0, 0, 0],

      size:

        .02 + Math.random() * .05,

      brightness:

        .5 + Math.random() * .5,

      opacity: 1,

      energy: 1,

      age: 0,

      lifetime: 999999,

      pulse:

        Math.random() * Math.PI * 2,

      rotation: 0,

      group:

        Math.floor(

          Math.random() * 6,

        ),

      target: null,

      behavior:

        StarBehavior.WANDER,

    }));

  }, []);

  useFrame(({ clock }, delta) => {

    if (!root.current) return;

    const t = clock.elapsedTime;

    root.current.children.forEach((child, index) => {

      const mesh = child as Mesh;

      const star = stars[index];

      star.age += delta;

      if (Math.random() > .995) {

        star.velocity = [

          (Math.random() - .5),

          (Math.random() - .5),

          (Math.random() - .5),

        ];

      }

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

        delta * .6;

      mesh.position.y +=

        Math.cos(

          t * .8 +

          star.pulse,

        ) *

        delta * .6;

      mesh.scale.setScalar(

        .8 +

        Math.sin(

          t * 3 +

          star.pulse,

        ) * .2,

      );

      if (

        Math.abs(mesh.position.x) > RANGE ||

        Math.abs(mesh.position.y) > RANGE ||

        mesh.position.z > 30 ||

        mesh.position.z < -RANGE

      ) {

        mesh.position.set(

          (Math.random() - .5) * RANGE,

          (Math.random() - .5) * RANGE,

          -Math.random() * RANGE,

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

              color="#FFFFFF"

            />

          </mesh>

        ))

      }

    </group>

  );

}