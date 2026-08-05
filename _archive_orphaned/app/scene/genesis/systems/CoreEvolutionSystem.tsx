/**
 * ==========================================================
 * LÉLUVERSE
 * CORE EVOLUTION SYSTEM
 *
 * The living evolution engine.
 *
 * Tracks:
 * - age
 * - maturity
 * - resonance
 * - growth
 * - themes
 *
 * Does not mutate the Core directly.
 * Feeds future evolution layers.
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





export interface CoreEvolutionState {

  age:
    number;


  maturity:
    number;


  resonance:
    number;


  growth:
    number;


  intensity:
    number;

}





export default function CoreEvolutionSystem() {


  const {

    state,

  } = useGenesis();





  const evolution =

    useRef<CoreEvolutionState>({

      age:0,

      maturity:0,

      resonance:0,

      growth:0,

      intensity:0,

    });





  useFrame((_,delta)=>{


    const e =

      evolution.current;





    /*
     * Universal age
     */


    e.age += delta;





    /*
     * Activity resonance
     */


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

        state.listening

          ? 0.25

          : 0

      )

      +

      (

        state.actions.length > 0

          ? 0.5

          : 0

      );





    /*
     * Growth from interaction
     */


    e.resonance +=

      (

        activity -

        e.resonance

      )

      *

      delta;





    /*
     * Slow maturity
     */


    e.maturity =

      Math.min(

        1,

        e.maturity +

        delta *

        0.0005 *

        (

          1 +

          activity

        )

      );





    /*
     * Evolution energy
     */


    e.growth =

      Math.sin(

        e.age *

        0.1

      )

      *

      0.5

      +

      0.5;





    /*
     * Current intensity
     */


    e.intensity =

      Math.min(

        1,

        e.resonance +

        e.maturity

      );


  });





  return null;

}