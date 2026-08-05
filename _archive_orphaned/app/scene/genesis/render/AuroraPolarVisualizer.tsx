/**
 * ==========================================================
 * LÉLUVERSE
 * AURORA POLAR VISUALIZER
 *
 * Visible magnetic planet layer.
 *
 * Displays:
 * - aurora ribbons
 * - polar energy
 * - ice cap glow
 * - magnetic waves
 *
 * Reads PolarSystem state.
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





export default function AuroraPolarVisualizer() {


  const {

    state,

  } = useGenesis();





  const root =

    useRef<Group>(null);





  const aurora =

    useRef<Group>(null);





  const time =

    useRef(0);





  const waves = useMemo(

    () =>

      Array.from({

        length:18,

      }),

    [],

  );





  useFrame((_,delta)=>{


    if (

      !root.current ||

      !aurora.current

    ) {

      return;

    }





    time.current += delta;





    const polar =

      (state as any)

        .polar

        ??

        {};





    const energy =

      polar.aurora

      ??

      0.5;





    const ice =

      polar.ice

      ??

      0.5;





    /*
     * Magnetic breathing
     */


    root.current.scale.setScalar(

      1 +

      energy *

      0.05

    );





    /*
     * Aurora movement
     */


    aurora.current.rotation.y +=

      delta *

      (

        0.1 +

        energy

      );





    aurora.current.rotation.z =

      Math.sin(

        time.current *

        0.3

      )

      *

      0.15;





    /*
     * Ice field response
     */


    root.current.position.y =

      ice *

      -0.1;


  });





  return (

    <group

      ref={root}

    >


      {/* ======================================
          AURORA RING FIELD
      ====================================== */}


      <group

        ref={aurora}

      >


        {

          waves.map((_,i)=>(


            <mesh

              key={i}

              rotation={[

                Math.PI / 2,

                0,

                (

                  i /

                  waves.length

                )

                *

                Math.PI *

                2,

              ]}

            >


              <torusGeometry

                args={[

                  2.5 +

                  i *

                  0.08,

                  0.008,

                  16,

                  128,

                ]}

              />


              <meshBasicMaterial

                color="#55ffaa"

                transparent

                opacity={0.08}

              />


            </mesh>


          ))

        }


      </group>





      {/* ======================================
          POLAR ICE GLOW
      ====================================== */}


      <mesh>


        <sphereGeometry

          args={[

            1.9,

            48,

            48,

          ]}

        />


        <meshBasicMaterial

          color="#bdefff"

          transparent

          opacity={0.03}

        />


      </mesh>





      <pointLight

        intensity={8}

        distance={50}

        color="#66ffff"

      />


    </group>

  );

}