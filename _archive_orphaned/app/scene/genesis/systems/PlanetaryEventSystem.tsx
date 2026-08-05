/**
 * ==========================================================
 * LÉLUVERSE
 * PLANETARY EVENT SYSTEM
 *
 * Combines planetary forces into
 * emergent natural events.
 *
 * Combines:
 * - storms
 * - oceans
 * - tectonics
 * - polar activity
 * - cosmic energy
 *
 * Logic only.
 * No rendering.
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





export interface PlanetaryEventState {


  hurricane:
    number;


  tsunami:
    number;


  earthquake:
    number;


  superstorm:
    number;


  solarStorm:
    number;


  extinctionRisk:
    number;


  planetaryEnergy:
    number;

}





export default function PlanetaryEventSystem() {


  const {

    state,

  } = useGenesis();





  const events =

    useRef<PlanetaryEventState>({

      hurricane:0,

      tsunami:0,

      earthquake:0,

      superstorm:0,

      solarStorm:0,

      extinctionRisk:0,

      planetaryEnergy:0,

    });





  const time =

    useRef(0);





  useFrame((_,delta)=>{


    time.current += delta;


    const e =

      events.current;
















    const ocean =

      (state as any)

        .ocean

        ??

        {};





    const tectonic =

      (state as any)

        .tectonic

        ??

        {};





    const cosmic =

      (state as any)

        .cosmicFusion

        ??

        {};





    /*
     * Hurricane formation
     */


    e.hurricane =

      Math.min(

        1,

        (

          0

        )

        *

        (

          ocean.tide

          ??

          0.5

        )

      );





    /*
     * Earthquake events
     */


    e.earthquake =

      tectonic.earthquake

      ??

      0;





    /*
     * Tsunami chain reaction
     */


    e.tsunami =

      Math.min(

        1,

        e.earthquake *

        1.5

      );





    /*
     * Cosmic weather events
     */


    e.solarStorm =

      Math.min(

        1,

        (

          cosmic.radiation

          ??

          0

        )

      );





    /*
     * Superstorm combination
     */


    e.superstorm =

      Math.min(

        1,

        (

          e.hurricane +

          e.solarStorm +

          e.tsunami

        )

        /

        3

      );





    /*
     * Total planetary energy
     */


    e.planetaryEnergy =

      Math.min(

        1,

        (

          e.superstorm +

          e.earthquake +

          e.solarStorm

        )

        /

        3

      );





    /*
     * Planet stress indicator
     */


    e.extinctionRisk =

      Math.max(

        0,

        e.planetaryEnergy -

        0.8

      );


  });





  return null;

}