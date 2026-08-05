/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS PARTICLE VISUALIZER
 *
 * Living particle ecosystem.
 *
 * Displays:
 * - cosmic dust
 * - energy particles
 * - swarm behavior
 * - fusion trails
 * - evolving patterns
 *
 * Visual layer only.
 * ==========================================================
 */


import {
  useFrame,
} from "@react-three/fiber";


import {
  useMemo,
  useRef,
} from "react";


import {
  Group,
} from "three";


import {
  useGenesis,
} from "../GenesisCore";





interface Particle {

  x:number;

  y:number;

  z:number;

  speed:number;

  phase:number;

}





export default function GenesisParticleVisualizer(){


  const {

    state,

  } = useGenesis();





  const field =

    useRef<Group>(null);





  const particles = useMemo<Particle[]>(

    () =>

      Array.from(

        {

          length:250,

        },

        ()=>({

          x:(Math.random()-.5)*20,

          y:(Math.random()-.5)*20,

          z:(Math.random()-.5)*20,

          speed:

            .2 +

            Math.random()*.8,

          phase:

            Math.random()*

            Math.PI*2,

        })

      ),

    []

  );





  useFrame(({clock})=>{


    if(!field.current)

      return;





    const t =

      clock.elapsedTime;





    const energy =

      (state as any)

        .energy ??

        0.5;





    field.current.children

      .forEach((mesh,i)=>{


        const p =

          particles[i];





        mesh.position.x =

          p.x +

          Math.sin(

            t*p.speed +

            p.phase

          )

          *

          energy;





        mesh.position.y =

          p.y +

          Math.cos(

            t*p.speed*.7 +

            p.phase

          )

          *

          energy;





        mesh.rotation.z +=

          .01 *

          p.speed;


      });


  });





  return (

    <group

      ref={field}

    >


      {

        particles.map((p,i)=>(


          <mesh

            key={i}

            position={[

              p.x,

              p.y,

              p.z,

            ]}

          >


            <sphereGeometry

              args={[

                .015 +

                Math.random()*.02,

                8,

                8,

              ]}

            />


            <meshBasicMaterial

              color="#88ddff"

              transparent

              opacity={0.45}

            />


          </mesh>


        ))

      }


    </group>

  );

}