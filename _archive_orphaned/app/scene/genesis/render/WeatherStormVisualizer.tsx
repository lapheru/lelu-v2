/**
 * ==========================================================
 * LÉLUVERSE
 * WEATHER STORM VISUALIZER
 *
 * Living atmosphere layer.
 *
 * Displays:
 * - cloud fields
 * - wind currents
 * - hurricane spirals
 * - lightning energy
 * - storm pressure waves
 *
 * Reads WeatherSystem + StormSystem.
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





export default function WeatherStormVisualizer() {


  const {

    state,

  } = useGenesis();





  const atmosphere =

    useRef<Group>(null);


  const hurricanes =

    useRef<Group>(null);


  const lightning =

    useRef<Group>(null);





  const time =

    useRef(0);





  const clouds = useMemo(

    () =>

      Array.from({

        length:24,

      }),

    [],

  );





  useFrame((_,delta)=>{


    if (

      !atmosphere.current ||

      !hurricanes.current ||

      !lightning.current

    ) {

      return;

    }





    time.current += delta;





    const weather =

      (state as any)

        .weather

        ??

        {};





    const storm =

      (state as any)

        .storm

        ??

        {};





    const wind =

      weather.wind

      ??

      0.5;





    const hurricane =

      storm.hurricane

      ??

      0;





    const lightningPower =

      storm.lightning

      ??

      0;





    /*
     * Atmosphere breathing
     */


    atmosphere.current.rotation.y +=

      delta *

      wind *

      0.1;





    /*
     * Hurricane rotation
     */


    hurricanes.current.rotation.y +=

      delta *

      (

        0.5 +

        hurricane *

        4

      );





    hurricanes.current.scale.setScalar(

      1 +

      hurricane *

      2

    );





    /*
     * Lightning pulse
     */


    lightning.current.scale.setScalar(

      1 +

      Math.sin(

        time.current *

        8

      )

      *

      lightningPower *

      0.2

    );


  });





  return (

    <group

      ref={atmosphere}

    >


      {/* ======================================
          CLOUD FIELD
      ====================================== */}


      {

        clouds.map((_,i)=>(


          <mesh

            key={i}

            position={[

              Math.sin(i)*3,

              2 +

              (i%5)*0.15,

              Math.cos(i)*3,

            ]}

          >


            <sphereGeometry

              args={[

                0.35,

                16,

                16,

              ]}

            />


            <meshBasicMaterial

              color="#ffffff"

              transparent

              opacity={0.04}

            />


          </mesh>


        ))

      }





      {/* ======================================
          HURRICANE FIELD
      ====================================== */}


      <group

        ref={hurricanes}

      >


        <mesh>


          <torusGeometry

            args={[

              3,

              0.03,

              32,

              128,

            ]}

          />


          <meshBasicMaterial

            color="#88ccff"

            transparent

            opacity={0.2}

          />


        </mesh>


      </group>





      {/* ======================================
          LIGHTNING FIELD
      ====================================== */}


      <group

        ref={lightning}

      >


        <pointLight

          intensity={

            10

          }

          distance={

            50

          }

          color="#aaddff"

        />


      </group>





    </group>

  );

}