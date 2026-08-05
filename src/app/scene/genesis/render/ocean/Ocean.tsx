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



import Caustics
  from "./caustics/Caustics";



import {

  Foam,

  Whitecaps,

  CrestFoam,

  ShoreFoam,

  BubbleSpray,

  FoamClusters,

  Mist,

  FoamDrift,

  FoamTrails,

} from "./foam/FoamIndex";



import {

  OceanLighting,

  AmbientOceanLight,

  HemisphereGlow,

  HorizonLight,

  SunReflection,

  SurfaceHighlights,

  GodRays,

  UnderwaterLight,

  DepthFade,

  WaterVolume,

  Bioluminescence,

  EnergyBloom,

  OceanPulse,

} from "./lighting/LightingIndex";





export interface OceanState {

  tide?:number;

  tsunami?:number;

  current?:number;

  waveHeight?:number;

  wave?:number;

  whirlpool?:number;

  foam?:number;

  caustics?:number;

}





export default function Ocean(){



  const {

    universe,

  } = useGenesis();





  const root =

    useRef<Group>(null);





  const time =

    useRef(0);







  useFrame((_,delta)=>{


    if(!root.current)

      return;





    time.current += delta;





    const ocean =

      universe.ocean;





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


{/* VISUAL EFFECTS */}

<Caustics
  oceanState={universe.ocean}
/>  



    







      {/* FOAM */}



      <group name="OceanFoam">


        <Foam

          oceanState={universe.ocean}

        />


        <Whitecaps

          oceanState={universe.ocean}

        />


        <CrestFoam

          oceanState={universe.ocean}

        />


        <ShoreFoam

          oceanState={universe.ocean}

        />


        <BubbleSpray

          oceanState={universe.ocean}

        />


        <FoamClusters

          oceanState={universe.ocean}

        />


        <Mist

          oceanState={universe.ocean}

        />


        <FoamDrift

          oceanState={universe.ocean}

        />


        <FoamTrails

          oceanState={universe.ocean}

        />


      </group>







      {/* OCEAN LIGHTING */}



      <OceanLighting

        oceanState={universe.ocean}

      />


      <AmbientOceanLight

        oceanState={universe.ocean}

      />


      <HemisphereGlow

        oceanState={universe.ocean}

      />


      <HorizonLight

        oceanState={universe.ocean}

      />


      <SunReflection

        oceanState={universe.ocean}

      />


      <SurfaceHighlights

        oceanState={universe.ocean}

      />


      <GodRays

        oceanState={universe.ocean}

      />


      <UnderwaterLight

        oceanState={universe.ocean}

      />


      <DepthFade

        oceanState={universe.ocean}

      />


      <WaterVolume

        oceanState={universe.ocean}

      />







      {/* OCEAN ENERGY */}



      <Bioluminescence

        oceanState={universe.ocean}

      />


      <EnergyBloom

        oceanState={universe.ocean}

      />


      <OceanPulse

        oceanState={universe.ocean}

      />



    </group>


  );

}