/**
 * ==========================================================
 * LÉLUVERSE
 * OCEAN
 *
 * Master renderer for ocean systems.
 *
 * Ocean surrounds the Genesis Core.
 * It does not replace or cover the core.
 *
 * Connected to:
 * - Genesis ocean state
 * - water systems
 * - foam systems
 * - lighting systems
 *
 * ==========================================================
 */


import {
  Group,
} from "three";


import {
  useRef,
} from "react";


import {
  useFrame,
} from "@react-three/fiber";


import {
  useGenesis,
} from "../../GenesisCore";



import {

  OceanLighting,

} from "./lighting/LightingIndex";

import Caustics
  from "./caustics/Caustics";

import Foam
  from "./foam/Foam";





export interface OceanState {

  tide?:number;

  tsunami?:number;

  current?:number;

  waveHeight?:number;

  wave?:number;

  whirlpool?:number;

  foam?:number;

  caustics?:number;

  stormSurge?:number;

  stability?:number;

}





export default function Ocean(){



  const {

    universe,
    getLiveUniverse,

  } = useGenesis();

  const oceanState: OceanState = {
    ...universe.ocean,
    waveHeight: universe.ocean.wave,
    caustics: universe.ocean.wave,
  };



  const root =

    useRef<Group>(null);





  const time =

    useRef(0);







  useFrame((_,delta)=>{


    if(!root.current)

      return;





    time.current += delta;    const ocean =
      getLiveUniverse().ocean;

    // Keep the shared prop object current for the nested ocean graph. The
    // graph remains mounted once, while every child samples canonical state
    // at render frequency instead of waiting for a React snapshot.
    oceanState.tide = ocean.tide;
    oceanState.current = ocean.current;
    oceanState.wave = ocean.wave;
    oceanState.waveHeight = ocean.wave;
    oceanState.tsunami = ocean.tsunami;
    oceanState.stormSurge = ocean.stormSurge;
    oceanState.stability = ocean.stability;
    oceanState.caustics = ocean.wave;





    const current =

      ocean.current ?? 0;





    const tide =

      ocean.tide ?? 0;







    root.current.rotation.y +=


      delta *

      0.02 *

      current;





    root.current.rotation.x =


      Math.sin(

        time.current *

        0.08

      )

      *

      0.004 *

      tide;





    root.current.rotation.z =


      Math.cos(

        time.current *

        0.06

      )

      *

      0.003 *

      tide;







    const breathe =


      1 +

      Math.sin(

        time.current *

        0.5

      )

      *

      0.005 *

      tide;





    root.current.scale.setScalar(

      breathe

    );



  });








  return (



    <group


      ref={root}


      name="GenesisOcean"


      /*
       * Ocean sits around the core.
       * It no longer swallows the core.
       */


      position={[

        0,

        0,

        -0.35,

      ]}


      scale={[

        0.65,

        0.65,

        0.65,

      ]}


      renderOrder={50}


    >





    {/* OCEAN CONTROLLERS */}


      {/* OCEAN LIGHTING */}




      <OceanLighting

        oceanState={oceanState}

      />

      <Caustics
        oceanState={oceanState}
      />

      <Foam
        oceanState={oceanState}
      />

    </group>


  );

}