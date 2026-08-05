/**
 * ==========================================================
 * LÉLUVERSE
 * CONSCIOUSNESS FIELD VISUALIZER
 *
 * The awareness layer of Genesis.
 *
 * Displays:
 * - thought waves
 * - memory echoes
 * - awareness field
 * - emotional resonance
 * - intelligence flow
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





export default function ConsciousnessFieldVisualizer() {


  const {

    state,

  } = useGenesis();





  const field =

    useRef<Group>(null);


  const neurons =

    useRef<Group>(null);





  const time =

    useRef(0);





  const nodes = useMemo(

    () =>

      Array.from({

        length:80,

      }),

    [],

  );





  useFrame((_,delta)=>{


    if (

      !field.current ||

      !neurons.current

    ) {

      return;

    }





    time.current += delta;





    const awareness =

      (state as any)

        .awareness

        ??

        0.5;





    const intelligence =

      (state as any)

        .intelligence

        ??

        0.3;





    const thinking =

      state.thinking

        ? 1

        : 0;





    /*
     * Conscious breathing
     */


    field.current.scale.setScalar(

      1 +

      Math.sin(

        time.current *

        0.7

      )

      *

      awareness *

      0.08

    );





    /*
     * Neural flow
     */


    neurons.current.rotation.y +=

      delta *

      (

        0.1 +

        intelligence *

        0.8 +

        thinking

      );


  });





  return (

    <group

      ref={field}

    >


      {/* ======================================
          AWARENESS FIELD
      ====================================== */}


      <mesh>


        <sphereGeometry

          args={[

            3.8,

            64,

            64,

          ]}

        />


        <meshBasicMaterial

          color="#ffffff"

          transparent

          opacity={0.015}

        />


      </mesh>





      {/* ======================================
          THOUGHT NETWORK
      ====================================== */}


      <group

        ref={neurons}

      >


        {

          nodes.map((_,i)=>(


            <mesh

              key={i}

              position={[

                Math.sin(i*2.4)*3,

                Math.cos(i*1.8)*2.5,

                Math.sin(i*0.7)*3,

              ]}

            >


              <sphereGeometry

                args={[

                  0.02,

                  12,

                  12,

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





      <pointLight

        intensity={10}

        distance={60}

        color="#ffffff"

      />


    </group>

  );

}