/**
 * ==========================================================
 * LÉLUVERSE
 * ORBIT STARS
 *
 * Living orbital systems.
 * Stars create vortexes,
 * figure eights and miniature galaxies.
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

const COUNT = 260;

const SYSTEMS = 8;

export default function OrbitStars() {

  const root = useRef<Group>(null);

  const stars = useMemo<LivingStar[]>(() => {

    return Array.from({

      length: COUNT,

    }).map((_, index) => {

      const system = Math.floor(

        Math.random() * SYSTEMS,

      );

      return {

        id: index,

        position: [0, 0, 0],

        velocity: [

          (system - SYSTEMS / 2) * 70,

          (Math.random() - .5) * 180,

          -100 - Math.random() * 250,

        ],

        acceleration: [

          Math.random() * Math.PI * 2,

          3 + Math.random() * 16,

          .2 + Math.random() * 1.4,

        ],

        size:

          .02 + Math.random() * .05,

        brightness: 1,

        opacity: 1,

        energy: 1,

        age: 0,

        lifetime: 999999,

        pulse:

          Math.random() * Math.PI * 2,

        rotation: 0,

        group: system,

        target: null,

        behavior:

          StarBehavior.ORBIT,

      };

    });

  }, []);

  useFrame(({ clock }, delta) => {

    if (!root.current) return;

    const t = clock.elapsedTime;

    root.current.children.forEach((child, index) => {

      const mesh = child as Mesh;

      const star = stars[index];

      star.age += delta;

      const theta =

        star.acceleration[0] +

        t * star.acceleration[2];

      const orbit =

        star.acceleration[1] +

        Math.sin(

          t * .5 +

          star.pulse,

        ) * 2;

      mesh.position.x =

        star.velocity[0] +

        Math.cos(theta) * orbit;

      mesh.position.y =

        star.velocity[1] +

        Math.sin(theta * 2) *

        orbit * .5;

      mesh.position.z =

        star.velocity[2] +

        Math.sin(theta) * 8;

      mesh.rotation.x += delta;

      mesh.rotation.y += delta * .6;

      mesh.rotation.z += delta * .4;

      mesh.scale.setScalar(

        .8 +

        Math.sin(

          t * 3 +

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

          >

            <sphereGeometry

              args={[

                star.size,

                5,

                5,

              ]}

            />

            <meshBasicMaterial

              color="#9FD9FF"

            />

          </mesh>

        ))

      }

    </group>

  );

}