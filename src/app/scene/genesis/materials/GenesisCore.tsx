/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS CORE
 *
 * Primary Blue Genesis Core mesh.
 *
 * Drives:
 * - plasma activity
 * - evolution flow
 * - awareness response
 * - mutation intensity
 * - breathing motion
 *
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
  Mesh,
} from "three";


import {
  useGenesis,
} from "../GenesisCore";


import GenesisCoreMaterial
  from "./GenesisCoreMaterial";





export default function GenesisCore(){


  const {

    getLiveUniverse,

    openPanel,

  } = useGenesis();





  const mesh =

    useRef<Mesh>(null);





  const material =

    useMemo(

      () =>

        new GenesisCoreMaterial(),

      [],

    );







  useFrame((_, delta)=> { 


    if(!mesh.current)

      return;





    const uniforms =

      material.uniforms;





    if(!uniforms)

      return;







    /*
     * Plasma clock
     */


    if(uniforms.uTime){

      uniforms.uTime.value += delta;

    }







    /*
     * Existing Genesis signals
     */


    const liveUniverse = getLiveUniverse();

    const energy =

      liveUniverse.energy ?? 0;



    const awareness =

      liveUniverse.awareness ?? 0;



    const consciousness =

      liveUniverse.consciousness ?? 0;



    const evolution =

      liveUniverse.evolution ?? 0;



    const mutation =

      liveUniverse.evolutionSystem?.mutation ?? 0;

    const colorShift =

      liveUniverse.evolutionSystem?.colorShift ?? 0;







    /*
     * Permanent living heartbeat.
     *
     * Core is alive before the universe
     * reaches higher states.
     */


    const pulse =


      0.35 +

      (

        Math.sin(

          uniforms.uTime.value *

          2.5

        )

        +

        1

      )

      *

      0.15;







    const activity =


      Math.min(

        1,


        pulse +

        (liveUniverse.pulse?.intensity ?? 0) *

        0.12 +

        energy *

        0.35 +

        awareness *

        0.25 +

        consciousness *

        0.25 +

        mutation *

        0.35


      );







    /*
     * Shader feeds
     */


    if(uniforms.uActivity){


      uniforms.uActivity.value =

        activity;


    }



    if(uniforms.uEvolution){


      uniforms.uEvolution.value =

        Math.min(

          1,

          evolution +

          pulse *

          0.2

        );


    }



    if(uniforms.uAwareness){


      uniforms.uAwareness.value =

        awareness +

        pulse *

        0.1;


    }



    if(uniforms.uMutation){


      uniforms.uMutation.value =

        mutation +

        pulse *

        0.15;


    }

if (uniforms.uGrowth) {
  uniforms.uGrowth.value =
    Math.min(
      1,
      evolution * 0.7 +
      activity * 0.3
    );
  }

   /*
 * Ocean driven uniforms
 */

const ocean = liveUniverse.ocean;

const tide = ocean.tide;
const current = ocean.current;
const wave = ocean.wave;
const stability = ocean.stability;
const tsunami = ocean.tsunami;

if (uniforms.uPlasma) {
  uniforms.uPlasma.value =
    Math.max(
      0.2,
      stability,
    );
}

if (uniforms.uOceanBlend) {
  uniforms.uOceanBlend.value =
    tide;
}

if (uniforms.uOceanFlow) {
  uniforms.uOceanFlow.value =
    current;
}

if (uniforms.uOceanDepth) {
  uniforms.uOceanDepth.value =
    wave;
}

if (uniforms.uOceanFoam) {
  uniforms.uOceanFoam.value =
    Math.max(
      wave,
      tsunami * 0.5,
    );
}

if (uniforms.uOceanCurrent) {
  uniforms.uOceanCurrent.value =
    current;
}

if (uniforms.uColorShift) {  uniforms.uColorShift.value =

    Math.min(
      1,
      colorShift * 0.78 +
      mutation * 0.12 +
      tide * 0.05 +
      (0.5 + 0.5 * Math.sin(liveUniverse.age * 0.12)) * 0.10,
    );
}








    /*
     * Organic rotation
     */


    mesh.current.rotation.y +=


      delta *

      (

        0.12 +

        activity *

        0.25

      );





    mesh.current.rotation.x +=


      delta *

      (

        0.03 +

        activity *

        0.08

      );







    /*
     * Plasma breathing
     */


    const breathing =


      1 +

      Math.sin(

        uniforms.uTime.value *

        1.4

      )

      *

      0.04 +

      activity *

      0.12;





    mesh.current.scale.setScalar(

      breathing

    );

  });

  
return (

    <mesh




      ref={mesh}

      name="GenesisCoreBody"

      renderOrder={201}

      material={material}

      onClick={() => openPanel("chat")}

      onPointerOver={(event) => {

        event.stopPropagation();

        document.body.style.cursor = "pointer";

      }}

      onPointerOut={() => {

        document.body.style.cursor = "default";

      }}

    >


      <icosahedronGeometry

        args={[

          0.9,

          128,

        ]}

      />


    </mesh>
    );

  }