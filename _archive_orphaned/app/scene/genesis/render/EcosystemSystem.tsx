/**
 * ==========================================================
 * LÉLUVERSE
 * ECOSYSTEM SYSTEM
 *
 * Planet life simulation engine.
 *
 * Controls:
 * - biodiversity
 * - vegetation growth
 * - ecosystem stability
 * - climate adaptation
 * - life cycles
 *
 * Works with:
 * - OceanSystem
 * - WeatherSystem
 * - TectonicSystem
 * - RealitySystem
 *
 * Logic only.
 * ==========================================================
 */


import {

  useFrame,

} from "@react-three/fiber";


import {

  useRef,

} from "react";


import {

  useGenesis,

} from "../GenesisCore";





export interface EcosystemState {


  biodiversity:number;


  vegetation:number;


  biomass:number;


  stability:number;


  adaptation:number;


  extinction:number;


}





export default function EcosystemSystem(){


  const {

    state,

    updateEcosystem,

  } = useGenesis();





  const ecosystem =

    useRef<EcosystemState>({


      biodiversity:0.1,


      vegetation:0.1,


      biomass:0.1,


      stability:0.8,


      adaptation:0,


      extinction:0,


    });





  useFrame((_,delta)=>{


    const e =

      ecosystem.current;





    const ocean =

      (state as any)

        .ocean

        ??

        {};





    const weather =

      (state as any)

        .weather

        ??

        {};





    const events =

      (state as any)

        .planetaryEvents

        ??

        {};





    const water =

      ocean.tide

      ??

      0.5;





    const climate =

      weather.stability

      ??

      0.5;





    const disaster =

      events.superstorm

      ??

      0;





    /*
     * Plant growth
     */


    e.vegetation =

      Math.min(

        1,

        e.vegetation +

        delta *

        0.002 *

        (

          water +

          climate

        )

      );





    /*
     * Biomass creation
     */


    e.biomass =

      Math.min(

        1,

        e.biomass +

        delta *

        0.001 *

        e.vegetation

      );





    /*
     * Biodiversity
     */


    e.biodiversity =

      Math.min(

        1,

        e.biodiversity +

        delta *

        0.001 *

        e.biomass

      );





    /*
     * Adaptation
     */


    e.adaptation =

      Math.min(

        1,

        e.adaptation +

        delta *

        0.0005

      );





    /*
     * Extinction pressure
     */


    e.extinction =

      Math.min(

        1,

        disaster *

        (

          1 -

          e.adaptation

        )

      );





    /*
     * Stability
     */


    e.stability =

      Math.max(

        0,

        1 -

        e.extinction *

        0.5

      );





    /*
     * Publish ecosystem state
     */


    updateEcosystem({

      biodiversity:e.biodiversity,

      vegetation:e.vegetation,

      biomass:e.biomass,

      stability:e.stability,

      adaptation:e.adaptation,

      extinction:e.extinction,

    });


  });





  return null;

}