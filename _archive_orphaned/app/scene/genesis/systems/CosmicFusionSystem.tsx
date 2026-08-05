/**
 * ==========================================================
 * LÉLUVERSE
 * COSMIC FUSION SYSTEM
 *
 * Universal energy synthesis layer.
 *
 * Controls:
 * - cosmic plasma
 * - elemental energy
 * - stellar pressure
 * - radiation flow
 * - cosmic cycles
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





export interface CosmicFusionState {


  plasma:
    number;


  elements:
    number;


  stellarPressure:
    number;


  radiation:
    number;


  cosmicActivity:
    number;


}





export default function CosmicFusionSystem() {


  const {

    state,

  } = useGenesis();





  const fusion =

    useRef<CosmicFusionState>({

      plasma:0.5,

      elements:0.2,

      stellarPressure:0.3,

      radiation:0.3,

      cosmicActivity:0.5,

    });





  const time =

    useRef(0);





  useFrame((_,delta)=>{


    time.current += delta;


    const f =

      fusion.current;





    const activity =

      (

        state.thinking

          ? 1

          : 0

      )

      +

      (

        state.actions.length > 0

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
     * Stellar heartbeat
     */


    f.cosmicActivity =

      0.5 +

      Math.sin(

        time.current *

        0.05

      )

      *

      0.5;





    /*
     * Plasma generation
     */


    f.plasma =

      Math.min(

        1,

        0.4 +

        activity *

        0.1 +

        f.cosmicActivity *

        0.2

      );





    /*
     * Stellar pressure
     */


    f.stellarPressure =

      Math.min(

        1,

        f.plasma *

        0.9

      );





    /*
     * Element formation
     */


    f.elements =

      Math.min(

        1,

        f.elements +

        delta *

        0.001 *

        f.stellarPressure

      );





    /*
     * Radiation output
     */


    f.radiation =

      Math.min(

        1,

        f.stellarPressure *

        0.8

      );


  });





  return null;

}