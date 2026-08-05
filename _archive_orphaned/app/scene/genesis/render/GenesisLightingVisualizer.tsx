/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS LIGHTING VISUALIZER
 *
 * Living atmosphere illumination layer.
 *
 * Controls:
 * - cosmic glow
 * - fog breathing
 * - aurora resonance
 * - storm flashes
 * - core light influence
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
  Group,
  Color,
} from "three";


import {
  useGenesis,
} from "../GenesisCore";





export default function GenesisLightingVisualizer() {


  const {

    state,

  } = useGenesis();





  const atmosphere =

    useRef<Group>(null);





  const lightColor =

    useRef(

      new Color("#55ddff")

    );





  const time =

    useRef(0);





  useFrame(({scene},delta)=>{


    if (

      !atmosphere.current

    ) {

      return;

    }





    time.current += delta;





    const energy =

      (state as any)

        .energy

        ??

        0.5;










    const awareness =

      (state as any)

        .awareness

        ??

        0.5;





    /*
     * Living atmosphere pulse
     */


    atmosphere.current.scale.setScalar(

      1 +

      Math.sin(

        time.current *

        0.3

      )

      *

      0.02

    );





    /*
     * Dynamic cosmic color
     */


    lightColor.current.setHSL(

      0.55 -

      energy *

      0.2,

      0.8,

      0.5 +

      awareness *

      0.2

    );





    /*
     * Background breathing
     */


    scene.fog = scene.fog;





    /*
     * Future:
     *
     * connect:
     * - GenesisSky
     * - GenesisFog
     * - GenesisParticles
     * - GenesisLighting
     */


  });





  return (

    <group

      ref={atmosphere}

    >


      {/* ======================================
          COSMIC LIGHT SOURCE
      ====================================== */}


      <pointLight

        intensity={

          10 +

          (state as any)

            .energy *

          20

        }

        distance={120}

        color="#77ddff"

      />





      {/* ======================================
          AMBIENT RESONANCE
      ====================================== */}


      <pointLight

        intensity={

          3 +

          chaosPulse(

            time.current

          )

        }

        distance={80}

        color="#aa88ff"

      />


    </group>

  );

}





function chaosPulse(

  time:number

){


  return (

    Math.sin(

      time *

      2

    )

    +

    1

  )

  *

  0.5;


}