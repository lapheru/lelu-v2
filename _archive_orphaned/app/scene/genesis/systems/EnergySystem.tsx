/**
 * ==========================================================
 * LÉLUVERSE
 * ENERGY SYSTEM
 *
 * Living energy layer.
 *
 * Uses Genesis state safely.
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





export default function EnergySystem() {


  const {

    state,

  } = useGenesis();





  const energy =

    useRef(0);





  useFrame(() => {


    /*
     * Current Genesis activity
     *
     * Future:
     * - theme energy
     * - weather energy
     * - evolution energy
     */


    energy.current =

      state.thinking

        ?

        1

        :

        state.actions.length > 0

          ?

          0.75

          :

          0.5;


  });





  return null;

}