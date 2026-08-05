/**
 * ==========================================================
 * LÉLUVERSE
 * RETROGRADE STARS
 *
 * Stars that pause, reverse,
 * spiral, then continue forward.
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

const COUNT = 180;

const RANGE = 450;

export default function RetrogradeStars() {

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

        (Math.random() - .5) * .5,

        (Math.random() - .5) * .5,

        .6 + Math.random() * 1.5,

      ],

      acceleration: [0, 0, 0],

      size:

        .02 + Math.random() * .05,

      brightness:

        .6 + Math.random() * .4,

      opacity: 1,

      energy: 1,

      age: 0,

      lifetime:

        6 + Math.random() * 8,

      pulse:

        Math.random() * Math.PI * 2,

      rotation: 0,

      group: 0,

      target: null,

      behavior:

        StarBehavior.RETROGRADE,

    }));

  }, []);

  useFrame(({ clock }, delta) => {

    if (!root.current) return;

    const t = clock.elapsedTime;

    root.current.children.forEach((child, index) => {

      const mesh = child as Mesh;

      const star = stars[index];

      star.age += delta;

      const cycle =

        Math.sin(

          t * .45 +

          star.pulse,

        );

      const direction =

        cycle >= 0 ? 1 : -1;

      const speed =

        Math.abs(cycle);

      mesh.position.z +=

        star.velocity[2] *

        direction *

        speed *

        delta *

        12;

      mesh.position.x +=

        Math.cos(

          t +

          star.pulse,

        ) *

        delta *

        .8;

      mesh.position.y +=

        Math.sin(

          t * .9 +

          star.pulse,

        ) *

        delta *

        .8;

      mesh.rotation.x += delta;

      mesh.rotation.y += delta * .7;

      mesh.rotation.z += delta * .5;

      mesh.scale.setScalar(

        .8 +

        Math.sin(

          t * 4 +

          star.pulse,

        ) * .25,

      );

      if (

        mesh.position.z > 25 ||

        mesh.position.z < -RANGE

      ) {

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

              color="#87D9FF"

            />

          </mesh>

        ))

      }

    </group>

  );

}