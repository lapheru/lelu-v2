/**
 * ==========================================================
 * LÉLUVERSE
 * GOD RAYS
 *
 * Soft underwater volumetric light shafts.
 *
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
  DoubleSide,
  AdditiveBlending,
} from "three";

import type {
  OceanState,
} from "../../Ocean";

interface Props {
  oceanState?: OceanState;
}

interface Ray {

  radius:number;

  angle:number;

  depth:number;

  width:number;

  length:number;

  speed:number;

  offset:number;

}

export default function GodRays({

  oceanState = {},

}:Props){

  const group =
    useRef<Group>(null);

  const rays =
    useMemo<Ray[]>(()=>{

      return Array.from(

        {
          length:24,
        },

        ():Ray=>({

          radius:
            0.5 +
            Math.random()*2.5,

          angle:
            Math.random() *
            Math.PI *
            2,

          depth:
            -1.5 -
            Math.random()*2,

          width:
            0.03 +
            Math.random()*0.05,

          length:
            1.2 +
            Math.random()*2.5,

          speed:
            0.01 +
            Math.random()*0.03,

          offset:
            Math.random()*100,

        }),

      );

    },[]);

  useFrame((state)=>{

    if(!group.current)
      return;

    const time =
      state.clock.elapsedTime;

    const tide =
      oceanState.tide ?? 0.5;

    group.current.children.forEach(

      (child,i)=>{

        const mesh =
          child as Mesh;

        const ray =
          rays[i];

        const angle =
          ray.angle +
          time *
          ray.speed;

        mesh.position.x =
          Math.cos(angle) *
          ray.radius;

        mesh.position.z =
          Math.sin(angle) *
          ray.radius;

        mesh.position.y =
          ray.depth +
          Math.sin(
            time * 0.5 +
            ray.offset,
          ) *
          0.05 *
          tide;

        /*
         * Fixed underwater shaft.
         * Do NOT face the core.
         */

        mesh.rotation.x =
          Math.PI * 0.5;

        mesh.rotation.y =
          angle;

      },

    );

  });

  return (

    <group
      ref={group}
      name="GodRays"
    >

      {

        rays.map((ray,i)=>(

          <mesh
            key={i}
          >

            <planeGeometry

              args={[

                ray.width,

                ray.length,

              ]}

            />

            <meshBasicMaterial

              color="#c8f6ff"

              transparent

              opacity={0.025}

              side={DoubleSide}

              depthWrite={false}

              depthTest={true}

              blending={AdditiveBlending}

            />

          </mesh>

        ))

      }

    </group>

  );

}