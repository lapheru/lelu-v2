/**
 * ==========================================================
 * LÉLUVERSE
 * THERMAL FUSION VISUALIZER
 *
 * Visible plasma heart of Genesis.
 *
 * Features:
 * - fusion glow
 * - plasma rings
 * - heat breathing
 * - solar resonance
 * - temperature color shifts
 *
 * Reads fusion activity.
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





export default function ThermalFusionVisualizer() {


  const {

    state,

  } = useGenesis();





  const fusion =

    useRef<Group>(null);





  const inner =

    useRef<Group>(null);





  const time =

    useRef(0);





  const color =

    useRef(

      new Color("#55ddff")

    );





  useFrame((_, delta)=>{


    if (

      !fusion.current ||

      !inner.current

    ) {

      return;

    }





    time.current += delta;





    const activity =

      (

        state.thinking

          ? 1

          : 0

      )

      +

      (

        state.speaking

          ? 0.5

          : 0

      )

      +

      (

        state.actions.length > 0

          ? 0.5

          : 0

      );





    /*
     * Fusion power input
     */


    const fusionPower =

      (state as any).fusion?.radiation

      ??

      0.5;





    /*
     * Heartbeat pulse
     */


    const pulse =

      1 +

      Math.sin(

        time.current * 2

      )

      *

      0.08

      +

      fusionPower *

      0.15

      +

      activity *

      0.03;





    fusion.current.scale.setScalar(

      pulse

    );





    /*
     * Plasma rotation
     */


    inner.current.rotation.y +=

      delta *

      (

        0.5 +

        activity +

        fusionPower

      );





    inner.current.rotation.x +=

      delta *

      0.2;





    /*
     * Thermal spectrum
     *
     * cyan
     * blue
     * violet
     * gold
     * white
     */


    const wave =

      (

        Math.sin(

          time.current *

          0.15

        )

        +

        1

      )

      /

      2;





    const heat =

      Math.min(

        1,

        fusionPower +

        wave *

        0.25

      );





    color.current.setHSL(

      0.55 -

      heat *

      0.45,

      0.9,

      0.6

    );





    fusion.current.traverse(

      object => {


        const material =

          (object as any).material;


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

      ref={fusion}

    >


      {/* ======================================
          PLASMA SHELL
      ====================================== */}


      <mesh>


        <sphereGeometry

          args={[

            1.15,

            64,

            64,

          ]}

        />


        <meshBasicMaterial

          transparent

          opacity={0.05}

        />


      </mesh>





      {/* ======================================
          FUSION RINGS
      ====================================== */}


      <group

        ref={inner}

      >


        <mesh>


          <torusGeometry

            args={[

              1.2,

              0.015,

              32,

              256,

            ]}

          />


          <meshBasicMaterial

            color="#ffffff"

            transparent

            opacity={0.35}

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

              1.35,

              0.01,

              32,

              256,

            ]}

          />



          <meshBasicMaterial

            color="#55ddff"

            transparent

            opacity={0.25}

          />


        </mesh>


      </group>





      {/* ======================================
          FUSION LIGHT
      ====================================== */}


      <pointLight

        intensity={12}

        distance={30}

        color="#88ddff"

      />


    </group>

  );

}