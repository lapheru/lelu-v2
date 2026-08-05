/**
 * ==========================================================
 * LÉLUVERSE
 * PLANETARY EVENT VISUALIZER
 *
 * Visible planetary force layer.
 *
 * Displays:
 * - hurricanes
 * - lightning storms
 * - earthquake pulses
 * - tsunami waves
 * - solar storm energy
 *
 * Reads planetary event state.
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





export default function PlanetaryEventVisualizer() {


  const {

    state,

  } = useGenesis();





  const root =

    useRef<Group>(null);





  const storm =

    useRef<Group>(null);


  const quake =

    useRef<Group>(null);


  const waves =

    useRef<Group>(null);





  const time =

    useRef(0);





  useFrame((_, delta)=>{


    if (

      !root.current ||

      !storm.current ||

      !quake.current ||

      !waves.current

    ) {

      return;

    }





    time.current += delta;





    const events =

      (state as any)

        .planetaryEvents

        ??

        {};





    const hurricane =

      events.hurricane

      ??

      0;





    const earthquake =

      events.earthquake

      ??

      0;





    const tsunami =

      events.tsunami

      ??

      0;





    const solar =

      events.solarStorm

      ??

      0;





    /*
     * Hurricane rotation
     */


    storm.current.rotation.y +=

      delta *

      (

        0.5 +

        hurricane *

        3

      );


    storm.current.scale.setScalar(

      1 +

      hurricane *

      2

    );





    /*
     * Earthquake vibration
     */


    quake.current.position.x =

      Math.sin(

        time.current *

        25

      )

      *

      earthquake *

      0.2;





    quake.current.scale.setScalar(

      1 +

      earthquake

    );





    /*
     * Tsunami wave expansion
     */


    waves.current.scale.setScalar(

      1 +

      tsunami *

      (

        Math.sin(

          time.current *

          3

        )

        +

        1

      )

    );





    /*
     * Solar energy affects whole field
     */


    root.current.rotation.z =

      solar *

      0.05;


  });





  return (

    <group

      ref={root}

    >


      {/* ======================================
          HURRICANE SPIRAL
      ====================================== */}


      <group

        ref={storm}

      >

        <mesh>


          <torusGeometry

            args={[

              2,

              0.03,

              32,

              128,

            ]}

          />


          <meshBasicMaterial

            color="#88ddff"

            transparent

            opacity={0.25}

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


          <sphereGeometry

            args={[

              1.3,

              32,

              32,

            ]}

          />


          <meshBasicMaterial

            color="#ff8844"

            transparent

            opacity={0.08}

          />


        </mesh>


      </group>





      {/* ======================================
          TSUNAMI RINGS
      ====================================== */}


      <group

        ref={waves}

      >


        <mesh>


          <torusGeometry

            args={[

              3,

              0.02,

              32,

              128,

            ]}

          />


          <meshBasicMaterial

            color="#44ccff"

            transparent

            opacity={0.3}

          />


        </mesh>


      </group>





      {/* ======================================
          PLANETARY ENERGY LIGHT
      ====================================== */}


      <pointLight

        intensity={5}

        distance={40}

        color="#66ccff"

      />


    </group>

  );

}