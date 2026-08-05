/**
 * ==========================================================
 * LÉLUVERSE
 * DUST FIELD
 *
 * Cosmic dust suspended throughout
 * the universe. Adds atmosphere,
 * depth and motion.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";

import {
  useMemo,
  useRef,
} from "react";

import {
  Group,
} from "three";

interface Dust {

  x:number;

  y:number;

  z:number;

  size:number;

  speed:number;

  drift:number;

  phase:number;

}

const COUNT = 4000;

const DEPTH = 500;

export default function DustField() {

  const root =
    useRef<Group>(null);

  const dust =
    useMemo<Dust[]>(() => {

      return Array.from({

        length: COUNT,

      }).map(() => ({

        x:
          (Math.random()-.5)*600,

        y:
          (Math.random()-.5)*400,

        z:
          -Math.random()*DEPTH,

        size:
          .01+
          Math.random()*.03,

        speed:
          .1+
          Math.random()*.7,

        drift:
          .2+
          Math.random(),

        phase:
          Math.random()*
          Math.PI*2,

      }));

    },[]);

  useFrame(({clock},delta)=>{

    if(!root.current)
      return;

    const t =
      clock.elapsedTime;

    root.current.children.forEach(

      (particle,index)=>{

        const d =
          dust[index];

        particle.position.z +=

          delta*
          d.speed;

        particle.position.x +=

          Math.sin(

            t*.05+

            d.phase,

          )*

          delta*

          d.drift;

        particle.position.y +=

          Math.cos(

            t*.04+

            d.phase,

          )*

          delta*

          d.drift;

        if(

          particle.position.z>

          20

        ){

          particle.position.z =
            -DEPTH;

        }

        const pulse =

          .8+

          Math.sin(

            t*1.2+

            d.phase,

          )*.25;

        particle.scale.setScalar(
          pulse,
        );

      },

    );

  });

  return(

    <group ref={root}>

      {

        dust.map((d,i)=>(

          <mesh

            key={i}

            position={[

              d.x,

              d.y,

              d.z,

            ]}

          >

            <sphereGeometry

              args={[

                d.size,

                4,

                4,

              ]}

            />

            <meshBasicMaterial

              color="#B8E8FF"

              transparent

              opacity={0.18}

              depthWrite={false}

            />

          </mesh>

        ))

      }

    </group>

  );

}