/**
 * ==========================================================
 * LÉLUVERSE
 * COSMIC DUST FIELD
 *
 * Floating interstellar dust.
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
} from "three";

interface DustParticle {

  position: Vector3;

  speed: number;

  size: number;

}

export default function CosmicDustField() {

  const root =
    useRef<Group>(null);

  const particles =
    useMemo<DustParticle[]>(() => {

      return Array
        .from({

          length: 1500,

        })

        .map((): DustParticle => ({

          position:

            new Vector3(

              (Math.random() - 0.5) * 4000,

              (Math.random() - 0.5) * 2500,

              -Math.random() * 3500,

            ),

          speed:

            0.01 +

            Math.random() * 0.04,

          size:

            0.05 +

            Math.random() * 0.18,

        }));

    }, []);

  useFrame((_, delta) => {

    if (!root.current)
      return;

    root.current.children.forEach(

      (particle, i) => {

        const data =
          particles[i];

        if (!data)
          return;

        particle.position.z +=

          data.speed *

          delta;

        particle.rotation.y +=

          0.05 *

          delta;

        if (

          particle.position.z >

          300

        ) {

          particle.position.z =

            -3500;

        }

      },

    );

  });

  return (

    <group ref={root}>

      {

        particles.map(

          (

            particle,

            index,

          ) => (

            <mesh

              key={index}

              position={particle.position}

            >

              <sphereGeometry

                args={[

                  particle.size,

                  6,

                  6,

                ]}

              />

              <meshBasicMaterial

                transparent

                opacity={0.15}

                color="#ffffff"

              />

            </mesh>

          ),

        )

      }

    </group>

  );

}