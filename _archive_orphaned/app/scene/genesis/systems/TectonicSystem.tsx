/**
 * ==========================================================
 * LÉLUVERSE
 * TECTONIC SYSTEM
 *
 * Planetary geology engine.
 *
 * Controls:
 * - crust movement
 * - earthquakes
 * - volcanic pressure
 * - magma energy
 * - planetary stress
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





export interface TectonicState {


  pressure:
    number;


  movement:
    number;


  earthquake:
    number;


  volcano:
    number;


  magma:
    number;


  stability:
    number;

}





export default function TectonicSystem() {


  const {

    state,

  } = useGenesis();





  const tectonic =

    useRef<TectonicState>({

      pressure:0.3,

      movement:0.1,

      earthquake:0,

      volcano:0.1,

      magma:0.3,

      stability:0.8,

    });





  const time =

    useRef(0);





  useFrame((_,delta)=>{


    time.current += delta;


    const t =

      tectonic.current;





    /*
     * Slow planetary pressure cycles
     */


    t.pressure =

      0.5 +

      Math.sin(

        time.current *

        0.015

      )

      *

      0.3;





    /*
     * Crust movement
     */


    t.movement =

      Math.abs(

        Math.sin(

          time.current *

          0.03

        )

      )

      *

      0.5;





    /*
     * Earthquake generation
     */


    t.earthquake =

      Math.min(

        1,

        t.pressure *

        t.movement *

        1.5

      );





    /*
     * Magma activity
     */


    t.magma =

      0.3 +

      t.pressure *

      0.7;





    /*
     * Volcano activity
     */


    t.volcano =

      Math.min(

        1,

        t.magma *

        t.movement

      );





    /*
     * Planet stability
     */


    t.stability =

      Math.max(

        0,

        1 -

        t.earthquake *

        0.5

      );





    /*
     * Intelligence activity
     * slightly energizes geology
     */


    if (

      state.thinking

    ) {

      t.magma =

        Math.min(

          1,

          t.magma +

          0.05

        );

    }


  });





  return null;

}