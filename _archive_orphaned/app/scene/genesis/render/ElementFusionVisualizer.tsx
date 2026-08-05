/**
 * ==========================================================
 * LÉLUVERSE
 * ELEMENT FUSION VISUALIZER
 *
 * Planetary elemental heart.
 *
 * Displays:
 * - elemental fusion
 * - plasma core
 * - magma energy
 * - atmospheric connection
 * - planetary heartbeat
 *
 * Visual layer only.
 * ==========================================================
 */


import {
  useFrame,
} from "@react-three/fiber";


import {
  useRef,
} from "react";


import {
  Color,
  Group,
} from "three";


import {
  useGenesis,
} from "../GenesisCore";





export default function ElementFusionVisualizer() {


  const {

    state,

  } = useGenesis();





  const core =

    useRef<Group>(null);





  const elements =

    useRef<Group>(null);





  const time =

    useRef(0);





  const color =

    useRef(

      new Color("#ff8800")

    );





  useFrame((_,delta)=>{


    if (

      !core.current ||

      !elements.current

    ) {

      return;

    }





    time.current += delta;





    const thermal =

      (state as any)

        .fusion

        ?.radiation

      ??

      0.5;





    const tectonic =

      (state as any)

        .tectonic

        ?.magma

      ??

      0.3;





    const energy =

      Math.min(

        1,

        thermal +

        tectonic *

        0.5

      );





    /*
     * Planet heartbeat
     */


    const pulse =

      1 +

      Math.sin(

        time.current *

        2

      )

      *

      0.08 *

      energy;





    core.current.scale.setScalar(

      pulse

    );





    /*
     * Element rotation
     */


    elements.current.rotation.y +=

      delta *

      (

        0.2 +

        energy

      );





    /*
     * Element temperature shift
     */


    color.current.setHSL(

      0.08 -

      energy *

      0.08,

      1,

      0.5

    );





    core.current.traverse(

      object=>{


        const material =

          (object as any)

            .material;


        if(material){

          material.color.copy(

            color.current

          );

        }


      }

    );


  });





  return (

    <group

      ref={core}

    >


      {/* ======================================
          PLANET ELEMENT CORE
      ====================================== */}


      <mesh>


        <sphereGeometry

          args={[

            0.75,

            64,

            64,

          ]}

        />


        <meshBasicMaterial

          color="#ff8800"

          transparent

          opacity={0.25}

        />


      </mesh>





      {/* ======================================
          ELEMENT RINGS
      ====================================== */}


      <group

        ref={elements}

      >


        <mesh>


          <torusGeometry

            args={[

              1,

              0.015,

              32,

              128,

            ]}

          />


          <meshBasicMaterial

            color="#ffaa33"

            transparent

            opacity={0.25}

          />


        </mesh>


        <mesh

          rotation={[

            Math.PI / 2,

            0,

            0,

          ]}

        >


          <torusGeometry

            args={[

              1.3,

              0.01,

              32,

              128,

            ]}

          />


          <meshBasicMaterial

            color="#44ccff"

            transparent

            opacity={0.2}

          />


        </mesh>


      </group>





      <pointLight

        intensity={10}

        distance={40}

        color="#ff9922"

      />


    </group>

  );

}