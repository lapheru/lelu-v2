/**
 * ==========================================================
 * LÉLUVERSE
 * POLAR SYSTEM
 *
 * Planetary magnetic and ice system.
 *
 * Controls:
 * - polar energy
 * - ice caps
 * - magnetic fields
 * - aurora influence
 * - climate balance
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





export interface PolarState {


  ice:
    number;


  magnetic:
    number;


  aurora:
    number;


  temperature:
    number;


  stability:
    number;


}





export default function PolarSystem() {


  const {

    state,

  } = useGenesis();





  const polar =

    useRef<PolarState>({

      ice:0.7,

      magnetic:0.8,

      aurora:0.4,

      temperature:0.3,

      stability:0.8,

    });





  const time =

    useRef(0);





  useFrame((_,delta)=>{


    time.current += delta;


    const p =

      polar.current;





    const activity =

      (

        state.thinking

          ? 0.2

          : 0

      )

      +

      (

        state.actions.length > 0

          ? 0.1

          : 0

      );





    /*
     * Cosmic temperature cycles
     */


    p.temperature =

      0.5 +

      Math.sin(

        time.current *

        0.02

      )

      *

      0.25;





    /*
     * Ice cap response
     */


    p.ice =

      Math.max(

        0,

        Math.min(

          1,

          1 -

          p.temperature +

          0.2

        )

      );





    /*
     * Magnetic field
     */


    p.magnetic =

      Math.min(

        1,

        0.8 +

        activity

      );





    /*
     * Aurora energy
     */


    p.aurora =

      p.magnetic *

      (

        0.5 +

        Math.sin(

          time.current *

          0.1

        )

        *

        0.5

      );





    /*
     * Planet stability
     */


    p.stability =

      (

        p.ice +

        p.magnetic

      )

      /

      2;


  });





  return null;

}