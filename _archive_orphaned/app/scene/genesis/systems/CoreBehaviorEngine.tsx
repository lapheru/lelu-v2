/**
 * ==========================================================
 * LÉLUVERSE
 * CORE BEHAVIOR ENGINE
 *
 * Infinite adaptive behavior layer.
 *
 * Tracks:
 * - creativity
 * - instinct
 * - curiosity
 * - exploration
 * - mutation
 * - harmony
 * - chaos
 *
 * Does not directly alter visuals.
 * Feeds evolution systems.
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





export interface CoreBehaviorState {


  creativity:
    number;


  instinct:
    number;


  curiosity:
    number;


  exploration:
    number;


  mutation:
    number;


  harmony:
    number;


  chaos:
    number;

}





export default function CoreBehaviorEngine() {


  const {

    state,

  } = useGenesis();





  const behavior =

    useRef<CoreBehaviorState>({

      creativity:0.5,

      instinct:0.5,

      curiosity:0.5,

      exploration:0.5,

      mutation:0.2,

      harmony:0.7,

      chaos:0.2,

    });





  const time =

    useRef(0);





  useFrame((_, delta)=>{


    time.current += delta;


    const b =

      behavior.current;





    const activity =

      (

        state.thinking

          ? 1

          : 0

      )

      +

      (

        state.actions.length > 0

          ? 1

          : 0

      )

      +

      (

        state.cognition

          ? 0.5

          : 0

      );





    /*
     * Creative evolution
     */


    b.creativity +=

      (

        0.5 +

        activity * 0.1

        -

        b.creativity

      )

      *

      delta *

      0.02;





    /*
     * Primal exploration
     */


    b.instinct +=

      (

        0.5 +

        Math.sin(

          time.current * 0.2

        )

        *

        0.2

        -

        b.instinct

      )

      *

      delta *

      0.01;





    /*
     * Curiosity never settles
     */


    b.curiosity =

      0.5 +

      Math.sin(

        time.current * 0.15

      )

      *

      0.25;





    /*
     * Exploration follows curiosity
     */


    b.exploration =

      (

        b.curiosity +

        b.creativity

      )

      /

      2;





    /*
     * Controlled mutation
     */


    b.mutation =

      Math.min(

        1,

        b.mutation +

        delta *

        0.001 *

        b.exploration

      );





    /*
     * Chaos and harmony balance
     */


    b.chaos =

      0.5 +

      Math.sin(

        time.current *

        0.05

      )

      *

      0.5;





    b.harmony =

      1 -

      b.chaos * 0.5;


  });





  return null;

}