/**
 * ==========================================================
 * LÉLUVERSE
 * INFINITE BEHAVIOR SYSTEM
 *
 * Adaptive universe behavior engine.
 *
 * Controls:
 * - creativity
 * - exploration
 * - mutation
 * - discovery
 * - chaos
 * - harmony
 * - emergence
 *
 * Does not directly render.
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





export interface InfiniteBehaviorState {


  creativity:
    number;


  exploration:
    number;


  discovery:
    number;


  mutation:
    number;


  adaptation:
    number;


  chaos:
    number;


  harmony:
    number;


  intensity:
    number;


}





export default function InfiniteBehaviorSystem() {


  const {

    state,

  } = useGenesis();





  const behavior =

    useRef<InfiniteBehaviorState>({

      creativity:0.5,

      exploration:0.5,

      discovery:0.2,

      mutation:0.1,

      adaptation:0.5,

      chaos:0.25,

      harmony:0.75,

      intensity:0.5,

    });





  const time =

    useRef(0);





  useFrame((_,delta)=>{


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

        state.speaking

          ? 0.5

          : 0

      )

      +

      (

        state.actions.length

          ? 0.5

          : 0

      )

      +

      (

        state.cognition

          ? 0.5

          : 0

      );





    /*
     * Creative mutation
     */


    b.creativity +=

      (

        0.5 +

        activity *

        0.15

        -

        b.creativity

      )

      *

      delta *

      0.03;





    /*
     * Endless curiosity cycle
     */


    b.exploration =

      0.5 +

      Math.sin(

        time.current *

        0.12

      )

      *

      0.25

      +

      b.creativity *

      0.25;





    /*
     * Discovery emerges
     */


    b.discovery =

      Math.min(

        1,

        b.discovery +

        delta *

        0.002 *

        b.exploration

      );





    /*
     * Controlled evolution
     */


    b.mutation =

      Math.min(

        1,

        b.mutation +

        delta *

        0.001 *

        b.discovery

      );





    /*
     * Adaptation
     */


    b.adaptation =

      0.5 +

      Math.sin(

        time.current *

        0.05

      )

      *

      0.25;





    /*
     * Chaos / harmony balance
     */


    b.chaos =

      0.5 +

      Math.sin(

        time.current *

        0.03

      )

      *

      0.5;





    b.harmony =

      1 -

      b.chaos *

      0.5;





    /*
     * Total universe intensity
     */


    b.intensity =

      (

        b.creativity +

        b.exploration +

        b.discovery +

        b.mutation

      )

      /

      4;


  });





  return null;

}