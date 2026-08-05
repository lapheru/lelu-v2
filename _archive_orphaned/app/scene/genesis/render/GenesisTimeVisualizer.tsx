/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS TIME VISUALIZER
 *
 * Living timeline layer.
 *
 * Displays:
 * - cosmic age cycles
 * - evolution waves
 * - memory echoes
 * - temporal movement
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





export default function GenesisTimeVisualizer() {


  const {

    state,

  } = useGenesis();





  const timeline =

    useRef<Group>(null);


  const eras =

    useRef<Group>(null);





  const time =

    useRef(0);





  const epochs = useMemo(

    () =>

      Array.from({

        length:20,

      }),

    [],

  );





  useFrame((_,delta)=>{


    if (

      !timeline.current ||

      !eras.current

    ) {

      return;

    }





    time.current += delta;










    const evolution =

      (state as any)

        .evolution

        ??

        0;





    /*
     * Time breathing
     */


    timeline.current.scale.setScalar(

      1 +

      Math.sin(

        time.current *

        0.2

      )

      *

      0.03

    );





    /*
     * Timeline movement
     */


    eras.current.rotation.y +=

      delta *

      (

        0.03 +

        evolution *

        0.2

      );


  });





  return (

    <group

      ref={timeline}

    >


      {/* ======================================
          COSMIC TIMELINE FIELD
      ====================================== */}


      <mesh>


        <sphereGeometry

          args={[

            5.5,

            48,

            48,

          ]}

        />


        <meshBasicMaterial

          color="#ffdd88"

          transparent

          opacity={0.01}

        />


      </mesh>





      {/* ======================================
          ERA ORBITS
      ====================================== */}


      <group

        ref={eras}

      >


        {

          epochs.map((_,i)=>(


            <mesh

              key={i}

              position={[

                Math.cos(i)*

                (2+i*0.1),

                Math.sin(i*0.7),

                Math.sin(i)*

                (2+i*0.1),

              ]}

            >


              <sphereGeometry

                args={[

                  0.03 +

                  i *

                  0.005,

                  12,

                  12,

                ]}

              />


              <meshBasicMaterial

                color="#ffeeaa"

                transparent

                opacity={0.5}

              />


            </mesh>


          ))

        }


      </group>





      <pointLight

        intensity={5}

        distance={80}

        color="#ffdd88"

      />


    </group>

  );

}