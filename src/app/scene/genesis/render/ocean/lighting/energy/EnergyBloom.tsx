/**
 * ==========================================================
 * LÉLUVERSE
 * ENERGY BLOOM
 *
 * Distributed ocean energy field.
 *
 * No crown stacking.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";

import {
  useMemo,
  useRef,
} from "react";

import {
  DoubleSide,
  Group,
  Mesh,
  AdditiveBlending,
} from "three";

import type {
  OceanState,
} from "../../Ocean";


interface Props {

  oceanState?: OceanState;

}


interface Bloom {

  x:number;

  y:number;

  z:number;

  size:number;

  speed:number;

  pulse:number;

  offset:number;

}


export default function EnergyBloom({

  oceanState = {},

}: Props) {


  const group =
    useRef<Group>(null);


  const blooms =
    useMemo<Bloom[]>(()=>{

      return Array.from(
        {
          length:36,
        },

        ():Bloom=>({

          x:
            (Math.random()-0.5)*4,

          y:
            (Math.random()-0.5)*3,

          z:
            (Math.random()-0.5)*4,

          size:
            0.08 +
            Math.random()*0.22,

          speed:
            0.1 +
            Math.random()*0.3,

          pulse:
            0.5 +
            Math.random()*2,

          offset:
            Math.random()*100,

        })

      );

    },[]);



  useFrame((state,delta)=>{


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


        const bloom =
          blooms[i];


        mesh.position.x =

          bloom.x +

          Math.sin(
            time*bloom.speed +
            bloom.offset
          ) *
          0.15;


        mesh.position.y =

          bloom.y +

          Math.sin(
            time*0.8 +
            bloom.offset
          ) *
          0.1 *
          tide;


        mesh.position.z =

          bloom.z +

          Math.cos(
            time*bloom.speed +
            bloom.offset
          ) *
          0.15;


        const pulse =

          1 +

          Math.sin(
            time*bloom.pulse +
            bloom.offset
          ) *
          0.25;


        mesh.scale.setScalar(

          bloom.size *
          pulse

        );


        mesh.rotation.z +=

          delta *
          0.4;


      }

    );


  });



  return (

    <group ref={group}>

      {
        blooms.map((_,i)=>(

          <mesh key={i}>

            <circleGeometry
              args={[
                1,
                24,
              ]}
            />


            <meshBasicMaterial

              color="#63dfff"

              transparent

              opacity={0.035}

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