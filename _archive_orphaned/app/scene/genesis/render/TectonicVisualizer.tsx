/**
 * ==========================================================
 * LÉLUVERSE
 * TECTONIC VISUALIZER
 *
 * Visible planetary geology layer.
 *
 * Displays:
 * - earthquakes
 * - magma flow
 * - volcano energy
 * - crust pulses
 *
 * Reads TectonicSystem.
 * ==========================================================
 */


import {
  useFrame,
} from "@react-three/fiber";


import {
  useRef,
} from "react";


import {
  Group,
} from "three";


import {
  useGenesis,
} from "../GenesisCore";





export default function TectonicVisualizer() {


  const {

    state,

  } = useGenesis();





  const planet =

    useRef<Group>(null);


  const magma =

    useRef<Group>(null);


  const quake =

    useRef<Group>(null);





  const time =

    useRef(0);





  useFrame((_,delta)=>{


    if (

      !planet.current ||

      !magma.current ||

      !quake.current

    ) {

      return;

    }





    time.current += delta;





    const tectonic =

      (state as any)

        .tectonic

        ??

        {};





    const earthquake =

      tectonic.earthquake

      ??

      0;





    const volcano =

      tectonic.volcano

      ??

      0;





    const pressure =

      tectonic.pressure

      ??

      0;





    /*
     * Planet crust movement
     */


    planet.current.rotation.y +=

      delta *

      0.02;





    /*
     * Magma pulse
     */


    magma.current.scale.setScalar(

      1 +

      volcano *

      0.4

    );





    magma.current.rotation.y +=

      delta *

      (

        0.2 +

        pressure

      );





    /*
     * Earthquake vibration
     */


    quake.current.position.x =

      Math.sin(

        time.current *

        30

      )

      *

      earthquake *

      0.15;


  });





  return (

    <group

      ref={planet}

    >


      {/* ======================================
          MAGMA CORE
      ====================================== */}


      <group

        ref={magma}

      >


        <mesh>


          <sphereGeometry

            args={[

              0.45,

              32,

              32,

            ]}

          />


          <meshBasicMaterial

            color="#ff4400"

            transparent

            opacity={0.2}

          />


        </mesh>


      </group>





      {/* ======================================
          EARTHQUAKE FIELD
      ====================================== */}


      <group

        ref={quake}

      >


        <mesh>


          <torusGeometry

            args={[

              2.8,

              0.015,

              32,

              128,

            ]}

          />


          <meshBasicMaterial

            color="#ff8844"

            transparent

            opacity={0.2}

          />


        </mesh>


      </group>





      {/* ======================================
          VOLCANIC LIGHT
      ====================================== */}


      <pointLight

        intensity={8}

        distance={35}

        color="#ff6622"

      />


    </group>

  );

}