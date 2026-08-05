/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS PLAYGROUND VISUALIZER
 *
 * Simulation sandbox layer.
 *
 * Displays:
 * - experiments
 * - prototype worlds
 * - simulation bubbles
 * - evolving possibilities
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





export default function GenesisPlaygroundVisualizer() {


  const {

    state,

  } = useGenesis();





  const playground =

    useRef<Group>(null);


  const simulations =

    useRef<Group>(null);





  const time =

    useRef(0);





  const worlds = useMemo(

    () =>

      Array.from({

        length:12,

      }),

    [],

  );





  useFrame((_,delta)=>{


    if (

      !playground.current ||

      !simulations.current

    ) {

      return;

    }





    time.current += delta;





    const activity =

      state.actions.length;





    const intelligence =

      (state as any)

        .intelligence

        ??

        0.3;





    /*
     * Sandbox expansion
     */


    playground.current.scale.setScalar(

      1 +

      Math.sin(

        time.current *

        0.4

      )

      *

      0.03

    );





    /*
     * Simulation movement
     */


    simulations.current.rotation.y +=

      delta *

      (

        0.05 +

        intelligence *

        0.2 +

        activity *

        0.001

      );


  });





  return (

    <group

      ref={playground}

    >


      {/* ======================================
          SIMULATION FIELD
      ====================================== */}


      <mesh>


        <sphereGeometry

          args={[

            4.5,

            48,

            48,

          ]}

        />


        <meshBasicMaterial

          color="#6655ff"

          transparent

          opacity={0.015}

        />


      </mesh>





      {/* ======================================
          MINI WORLDS
      ====================================== */}


      <group

        ref={simulations}

      >


        {

          worlds.map((_,i)=>(


            <mesh

              key={i}

              position={[

                Math.sin(i)*3,

                Math.cos(i*2)*2,

                Math.sin(i*3)*3,

              ]}

            >


              <sphereGeometry

                args={[

                  0.12 +

                  i *

                  0.01,

                  16,

                  16,

                ]}

              />


              <meshBasicMaterial

                color="#aa88ff"

                transparent

                opacity={0.4}

              />


            </mesh>


          ))

        }


      </group>





      <pointLight

        intensity={6}

        distance={70}

        color="#9977ff"

      />


    </group>

  );

}