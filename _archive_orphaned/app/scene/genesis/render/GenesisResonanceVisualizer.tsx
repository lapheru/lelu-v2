/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS RESONANCE VISUALIZER
 *
 * Visible vibration field.
 *
 * Displays:
 * - core heartbeat waves
 * - ocean resonance
 * - tectonic vibration
 * - fusion pulses
 * - cosmic frequency rings
 *
 * Reads GenesisResonanceSystem.
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





export default function GenesisResonanceVisualizer(){


  const {

    state,

  } = useGenesis();





  const field =

    useRef<Group>(null);


  const waves =

    useRef<Group>(null);





  const time =

    useRef(0);





  const rings = useMemo(

    () =>

      Array.from({

        length:16,

      }),

    [],

  );





  useFrame((_,delta)=>{


    if(

      !field.current ||

      !waves.current

    ){

      return;

    }





    time.current += delta;





    const resonance =

      (state as any)

        .resonance

        ??

        {};





    const total =

      resonance.total

      ??

      0.5;





    const heartbeat =

      resonance.heartbeat

      ??

      0.5;





    const quake =

      resonance.quake

      ??

      0;





    /*
     * Universe breathing
     */


    field.current.scale.setScalar(

      1 +

      total *

      0.08

    );





    /*
     * Wave propagation
     */


    waves.current.rotation.y +=

      delta *

      (

        0.1 +

        heartbeat

      );





    waves.current.scale.setScalar(

      1 +

      quake *

      0.5 +

      Math.sin(

        time.current *

        2

      )

      *

      total *

      0.05

    );


  });





  return (

    <group

      ref={field}

    >


      {/* ======================================
          RESONANCE RINGS
      ====================================== */}


      <group

        ref={waves}

      >


        {

          rings.map((_,i)=>(


            <mesh

              key={i}

              rotation={[

                Math.PI / 2,

                0,

                0,

              ]}

            >


              <torusGeometry

                args={[

                  1.5 +

                  i *

                  0.18,

                  0.01,

                  32,

                  128,

                ]}

              />


              <meshBasicMaterial

                color="#55ddff"

                transparent

                opacity={0.12}

              />


            </mesh>


          ))

        }


      </group>





      {/* ======================================
          HEARTBEAT CORE WAVE
      ====================================== */}


      <mesh>


        <sphereGeometry

          args={[

            0.8,

            48,

            48,

          ]}

        />


        <meshBasicMaterial

          color="#ffffff"

          transparent

          opacity={0.05}

        />


      </mesh>





      <pointLight

        intensity={8}

        distance={60}

        color="#55ddff"

      />


    </group>

  );

}