/**
 * ==========================================================
 * LÉLUVERSE
 * CLUSTER STARS
 *
 * Living galaxies that bloom,
 * merge, collapse and migrate.
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

const COUNT = 420;

const CLUSTERS = 10;

export default function ClusterStars() {

  const root = useRef<Group>(null);

  const stars = useMemo<LivingStar[]>(() => {

    return Array.from({

      length: COUNT,

    }).map((_, index) => {

      const cluster = Math.floor(

        Math.random() * CLUSTERS,

      );

      const angle =

        Math.random() * Math.PI * 2;

      const radius =

        Math.random() * 18;

      const centerX =

        (cluster - CLUSTERS / 2) * 55 +

        (Math.random() - .5) * 20;

      const centerY =

        (Math.random() - .5) * 160;

      const centerZ =

        -120 - Math.random() * 250;

      return {

        id: index,

        position: [

          centerX + Math.cos(angle) * radius,

          centerY + Math.sin(angle) * radius,

          centerZ,

        ],

        velocity: [

          centerX,

          centerY,

          centerZ,

        ],

        acceleration: [

          angle,

          radius,

          cluster,

        ],

        size:

          .015 + Math.random() * .05,

        brightness:

          .5 + Math.random() * .5,

        opacity: 1,

        energy: 1,

        age: 0,

        lifetime: 999999,

        pulse:

          Math.random() * Math.PI * 2,

        rotation: 0,

        group: cluster,

        target: null,

        behavior:

          StarBehavior.CLUSTER,

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

      const angle =

        star.acceleration[0] +

        t * .15 +

        star.group;

      const radius =

        star.acceleration[1] *

        (

          1 +

          Math.sin(

            t * .35 +

            star.pulse,

          ) * .3

        );

      mesh.position.x =

        star.velocity[0] +

        Math.cos(angle) * radius;

      mesh.position.y =

        star.velocity[1] +

        Math.sin(angle) * radius;

      mesh.position.z =

        star.velocity[2] +

        Math.sin(angle * 2) * 4;

      mesh.scale.setScalar(

        .7 +

        Math.sin(

          t * 2 +

          star.pulse,

        ) * .25,

      );

    });

    root.current.rotation.y += delta * .01;

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

              color="#E8F8FF"

            />

          </mesh>

        ))

      }

    </group>

  );

}