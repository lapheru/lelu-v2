/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS SKY VISUALIZER
 *
 * Living sky layer.
 *
 * Displays:
 * - star atmosphere
 * - cloud dome
 * - cosmic weather
 * - meteor events
 * - day/night resonance
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





export default function GenesisSkyVisualizer(){


  const {

    state,

  } = useGenesis();





  const sky =

    useRef<Group>(null);


  const clouds =

    useRef<Group>(null);


  const stars =

    useRef<Group>(null);





  const time =

    useRef(0);





  const starNodes = useMemo(

    () =>

      Array.from({

        length:180,

      }),

    [],

  );





  useFrame((_,delta)=>{


    if(

      !sky.current ||

      !clouds.current ||

      !stars.current

    ){

      return;

    }





    time.current += delta;





    const energy =

      (state as any)

        .energy

        ??

        0.5;





    const chaos =

      (state as any)

        .chaos

        ??

        0.2;





    /*
     * Living sky rotation
     */


    sky.current.rotation.y +=

      delta *

      0.003;





    /*
     * Cloud drift
     */


    clouds.current.rotation.y +=

      delta *

      (

        0.02 +

        chaos *

        0.05

      );





    /*
     * Star movement
     */


    stars.current.rotation.y +=

      delta *

      (

        0.005 +

        energy *

        0.01

      );


  });





  return (

    <group

      ref={sky}

    >


      {/* ======================================
          STAR DOME
      ====================================== */}


      <group

        ref={stars}

      >


        {

          starNodes.map((_,i)=>(


            <mesh

              key={i}

              position={[

                Math.sin(i*4.2)*80,

                Math.cos(i*2.7)*50,

                Math.sin(i*1.4)*90,

              ]}

            >


              <sphereGeometry

                args={[

                  0.03,

                  8,

                  8,

                ]}

              />


              <meshBasicMaterial

                color="#ffffff"

                transparent

                opacity={0.6}

              />


            </mesh>


          ))

        }


      </group>





      {/* ======================================
          CLOUD ATMOSPHERE
      ====================================== */}


      <group

        ref={clouds}

      >


        <mesh>


          <sphereGeometry

            args={[

              12,

              32,

              32,

            ]}

          />


          <meshBasicMaterial

            color="#88ccff"

            transparent

            opacity={0.015}

            side={2}

          />


        </mesh>


      </group>





      {/* ======================================
          SKY LIGHT
      ====================================== */}


      <pointLight

        intensity={

          5 +

          energyValue(

            state

          )

        }

        distance={200}

        color="#99ddff"

      />


    </group>

  );

}





function energyValue(

state:any

){

  return (

    state.energy ??

    0.5

  )

  *

  10;

}