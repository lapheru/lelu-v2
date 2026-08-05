/**
 * ==========================================================
 * LÉLUVERSE
 * THERMAL FUSION SYSTEM
 *
 * Core fusion engine.
 *
 * Controls:
 * - temperature
 * - plasma intensity
 * - fusion pressure
 * - radiation energy
 * - thermal cycles
 *
 * Logic only.
 * No rendering imports.
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





export interface ThermalFusionState {


  temperature:
    number;


  plasma:
    number;


  pressure:
    number;


  radiation:
    number;


  activity:
    number;


}





export default function ThermalFusionSystem() {


  const {

    state,

  } = useGenesis();





  const fusion =

    useRef<ThermalFusionState>({

      temperature:0.4,

      plasma:0.3,

      pressure:0.2,

      radiation:0.2,

      activity:0,

    });





  const time =

    useRef(0);





  useFrame((_, delta)=>{


    time.current += delta;


    const f =

      fusion.current;





    /*
     * Core activity input
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





    f.activity = activity;





    /*
     * Thermal heartbeat cycle
     */


    const thermalWave =

      Math.sin(

        time.current *

        0.4

      )

      *

      0.1;





    /*
     * Temperature evolution
     */


    f.temperature +=

      (

        (

          0.45

          +

          activity *

          0.15

          +

          thermalWave

        )

        -

        f.temperature

      )

      *

      delta;





    /*
     * Plasma generation
     */


    f.plasma =

      Math.min(

        1,

        f.temperature *

        0.9

      );





    /*
     * Fusion pressure
     */


    f.pressure =

      Math.min(

        1,

        f.temperature *

        f.plasma

      );





    /*
     * Radiation output
     */


    f.radiation =

      Math.min(

        1,

        f.pressure *

        0.8

      );


  });





  return null;

}