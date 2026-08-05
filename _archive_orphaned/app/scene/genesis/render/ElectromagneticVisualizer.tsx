/**
 * ==========================================================
 * LÉLUVERSE
 * ELECTROMAGNETIC VISUALIZER
 *
 * Visible planetary magnetic field.
 *
 * Displays:
 * - magnetic field rings
 * - Schumann resonance waves
 * - aurora energy
 * - solar storm pulses
 *
 * Reads ElectromagneticSystem.
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





export default function ElectromagneticVisualizer(){


  const {

    state,

  } = useGenesis();





  const field =

    useRef<Group>(null);


  const waves =

    useRef<Group>(null);


  const aurora =

    useRef<Group>(null);





  const time =

    useRef(0);





  const rings = useMemo(

    () =>

      Array.from({

        length:14,

      }),

    [],

  );





  useFrame((_,delta)=>{


    if(

      !field.current ||

      !waves.current ||

      !aurora.current

    ){

      return;

    }





    time.current += delta;





    const emf =

      (state as any)

        .electromagnetic

        ??

        {};





    const magnetic =

      emf.magnetic

      ??

      0.5;





    const resonance =

      emf.resonance

      ??

      0.5;





    const auroraPower =

      emf.aurora

      ??

      0.2;





    /*
     * Magnetic breathing
     */


    field.current.scale.setScalar(

      1 +

      magnetic *

      0.08

    );





    /*
     * Schumann wave motion
     */


    waves.current.rotation.y +=

      delta *

      resonance;





    waves.current.scale.setScalar(

      1 +

      Math.sin(

        time.current *

        2

      )

      *

      resonance *

      0.1

    );





    /*
     * Aurora movement
     */


    aurora.current.rotation.z =

      Math.sin(

        time.current *

        0.4

      )

      *

      auroraPower;





  });





  return (

    <group

      ref={field}

    >


      {/* ======================================
          MAGNETIC FIELD RINGS
      ====================================== */}


      {

        rings.map((_,i)=>(


          <mesh

            key={i}

            rotation={[

              Math.PI/2,

              0,

              (

                i /

                rings.length

              )

              *

              Math.PI*2,

            ]}

          >


            <torusGeometry

              args={[

                2 +

                i *

                0.12,

                0.008,

                24,

                128,

              ]}

            />


            <meshBasicMaterial

              color="#55ccff"

              transparent

              opacity={0.08}

            />


          </mesh>


        ))

      }





      {/* ======================================
          SCHUMANN RESONANCE WAVES
      ====================================== */}


      <group

        ref={waves}

      >

        <mesh>


          <sphereGeometry

            args={[

              2.8,

              48,

              48,

            ]}

          />


          <meshBasicMaterial

            color="#88ffff"

            transparent

            opacity={0.015}

          />


        </mesh>


      </group>





      {/* ======================================
          AURORA FIELD
      ====================================== */}


      <group

        ref={aurora}

      >


        <mesh>


          <torusGeometry

            args={[

              3.5,

              0.02,

              32,

              256,

            ]}

          />


          <meshBasicMaterial

            color="#66ffcc"

            transparent

            opacity={0.2}

          />


        </mesh>


      </group>





      <pointLight

        intensity={8}

        distance={70}

        color="#66ddff"

      />


    </group>

  );

}