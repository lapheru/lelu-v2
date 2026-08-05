/**
 * ==========================================================
 * LÉLUVERSE
 * MEMORY GARDEN VISUALIZER
 *
 * Living memory ecosystem.
 *
 * Displays:
 * - memory roots
 * - memory trees
 * - knowledge growth
 * - memory stars
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





export default function MemoryGardenVisualizer() {


  const {

    state,

  } = useGenesis();





  const garden =

    useRef<Group>(null);


  const roots =

    useRef<Group>(null);


  const memories = useMemo(

    () =>

      Array.from({

        length:50,

      }),

    [],

  );





  const time =

    useRef(0);





  useFrame((_,delta)=>{


    if (

      !garden.current ||

      !roots.current

    ) {

      return;

    }





    time.current += delta;





    const memoryCount =

      state.messages.length;





    const growth =

      Math.min(

        1,

        memoryCount /

        100

      );





    /*
     * Living garden growth
     */


    garden.current.scale.setScalar(

      1 +

      growth *

      0.15

    );





    /*
     * Memory root movement
     */


    roots.current.rotation.y +=

      delta *

      (

        0.05 +

        growth *

        0.2

      );


  });





  return (

    <group

      ref={garden}

    >


      {/* ======================================
          MEMORY ROOT FIELD
      ====================================== */}


      <group

        ref={roots}

      >


        {

          memories.map((_,i)=>(


            <mesh

              key={i}

              position={[

                Math.sin(i)*2,

                -1 +

                (i%5)*0.1,

                Math.cos(i)*2,

              ]}

            >


              <torusGeometry

                args={[

                  0.2 +

                  i *

                  0.005,

                  0.008,

                  16,

                  64,

                ]}

              />


              <meshBasicMaterial

                color="#55ff99"

                transparent

                opacity={0.25}

              />


            </mesh>


          ))

        }


      </group>





      {/* ======================================
          MEMORY CORE TREE
      ====================================== */}


      <mesh>


        <sphereGeometry

          args={[

            0.5,

            32,

            32,

          ]}

        />


        <meshBasicMaterial

          color="#66ffcc"

          transparent

          opacity={0.2}

        />


      </mesh>





      <pointLight

        intensity={8}

        distance={50}

        color="#66ffaa"

      />


    </group>

  );

}