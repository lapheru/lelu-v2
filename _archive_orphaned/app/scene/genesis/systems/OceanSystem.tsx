/**
 * ==========================================================
 * LÉLUVERSE
 * OCEAN SYSTEM
 *
 * Planetary water engine.
 *
 * Controls:
 * - tides
 * - currents
 * - waves
 * - tsunami energy
 * - storm surge
 * - ocean stability
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





export interface OceanState {


  tide:
    number;


  current:
    number;


  wave:
    number;


  tsunami:
    number;


  stormSurge:
    number;


  stability:
    number;


}





export default function OceanSystem() {


  const {

    state,

  } = useGenesis();





  const ocean =

    useRef<OceanState>({

      tide:0.5,

      current:0.4,

      wave:0.2,

      tsunami:0,

      stormSurge:0,

      stability:0.8,

    });





  const time =

    useRef(0);





  useFrame((_,delta)=>{


    time.current += delta;


    const o =

      ocean.current;





    /*
     * Natural tidal cycle
     */


    o.tide =

      0.5 +

      Math.sin(

        time.current *

        0.04

      )

      *

      0.5;





    /*
     * Ocean currents
     */


    o.current =

      0.4 +

      Math.sin(

        time.current *

        0.08

      )

      *

      0.2;





    /*
     * Wave movement
     */


    o.wave =

      Math.abs(

        Math.sin(

          time.current *

          0.5

        )

      );





    /*
     * Storm influence
     */


    o.stormSurge =

      Math.min(

        1,

        o.wave *

        0.5

      );





    /*
     * Tsunami generation
     *
     * Future connection:
     * TectonicSystem earthquake output
     */


    const tectonicEvent =

      (state as any)

        .tectonic

        ?.earthquake

      ??

      0;





    o.tsunami =

      Math.min(

        1,

        tectonicEvent *

        1.5

      );





    /*
     * Water stability
     */


    o.stability =

      Math.max(

        0,

        1 -

        (

          o.tsunami *

          0.6

        )

      );


  });





  return null;

}