/**
 * ==========================================================
 * LÉLUVERSE
 * HORIZON LIGHT
 *
 * Integrated atmospheric horizon glow.
 *
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";

import {
  useMemo,
  useRef,
} from "react";

import {
  AdditiveBlending,
  DoubleSide,
  Group,
  Mesh,
} from "three";

import type {
  OceanState,
} from "../../Ocean";

interface Props {
  oceanState?: OceanState;
}

interface HorizonGlow {

  radius:number;

  angle:number;

  depth:number;

  size:number;

  speed:number;

  offset:number;

}

export default function HorizonLight({

  oceanState = {},

}:Props){

  const group =
    useRef<Group>(null);

  const lights =
    useMemo<HorizonGlow[]>(()=>{

      return Array.from(

        {
          length:36,
        },

        ():HorizonGlow=>({

          radius:
            2.2 +
            Math.random()*0.8,

          angle:
            Math.random() *
            Math.PI *
            2,

          depth:
            -0.8 -
            Math.random()*1.2,

          size:
            0.08 +
            Math.random()*0.16,

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

        const light =
          lights[i];

        const angle =
          light.angle +
          time *
          light.speed;

        mesh.position.x =
          Math.cos(angle) *
          light.radius;

        mesh.position.z =
          Math.sin(angle) *
          light.radius;

        mesh.position.y =
          light.depth +
          Math.sin(
            time +
            light.offset,
          ) *
          0.05 *
          tide;

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
      name="HorizonLight"
    >

      {

        lights.map((light,i)=>(

          <mesh
            key={i}
          >

            <planeGeometry

              args={[

                light.size,

                light.size,

              ]}

            />

            <meshBasicMaterial

              color="#bfeeff"

              transparent

              opacity={0.02}

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