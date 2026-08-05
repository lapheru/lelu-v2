/**
 * ==========================================================
 * LÉLUVERSE
 * ELECTROMAGNETIC SYSTEM
 *
 * Planetary electromagnetic engine.
 *
 * Works with:
 * - Core energy
 * - Thermal fusion
 * - Cosmic activity
 * - Polar systems
 * - Weather systems
 * - Tectonic systems
 * - Ocean systems
 *
 * Controls:
 * - Schumann resonance simulation
 * - EMF field strength
 * - magnetic field
 * - aurora energy
 * - planetary pulse
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





export interface ElectromagneticState {


  schumann:number;


  frequency:number;


  emf:number;


  magnetic:number;


  aurora:number;


  solarStorm:number;


  planetaryPulse:number;


  resonance:number;


}





export default function ElectromagneticSystem(){


  const {

    state,

  } = useGenesis();





  const field =

    useRef<ElectromagneticState>({

      schumann:7.83,

      frequency:7.83,

      emf:0.5,

      magnetic:0.5,

      aurora:0.2,

      solarStorm:0,

      planetaryPulse:0.5,

      resonance:0.5,

    });





  const time =

    useRef(0);





  useFrame((_,delta)=>{


    time.current += delta;


    const e =

      field.current;





    const energy =

      (state as any)

        .energy

        ??

        0.5;





    const chaos =

      (state as any)

        .chaos

        ??

        0.2;





    const fusion =

      (state as any)

        .fusion

        ??

        0.5;





    const polar =

      (state as any)

        .polar

        ??

        {};





    const storms =

      (state as any)

        .storm

        ??

        {};





    /*
     * Schumann resonance
     *
     * Simulated Earth-ionosphere
     * resonance behavior.
     */


    e.schumann =

      7.83 +

      Math.sin(

        time.current *

        0.08

      )

      *

      0.25;





    e.frequency =

      e.schumann;





    /*
     * Planet EM field
     */


    e.emf =

      Math.min(

        1,

        0.3 +

        energy *

        0.35 +

        fusion *

        0.25 +

        chaos *

        0.1

      );





    /*
     * Magnetic field breathing
     */


    e.magnetic =

      (

        Math.sin(

          time.current *

          0.2

        )

        +

        1

      )

      /

      2;





    /*
     * Solar storm influence
     */


    e.solarStorm =

      Math.min(

        1,

        storms.lightning

        ??

        0

      );





    /*
     * Aurora response
     */


    e.aurora =

      Math.min(

        1,

        (

          e.magnetic *

          e.emf

        )

        +

        (

          polar.aurora

          ??

          0

        )

        +

        e.solarStorm *

        0.5

      );





    /*
     * Planet heartbeat sync
     */


    e.planetaryPulse =

      (

        Math.sin(

          time.current *

          2

        )

        +

        1

      )

      /

      2;





    /*
     * Combined resonance field
     */


    e.resonance =

      (

        e.emf +

        e.magnetic +

        e.aurora +

        e.planetaryPulse

      )

      /

      4;


  });





  return null;

}