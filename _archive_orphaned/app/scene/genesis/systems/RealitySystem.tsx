/**
 * ==========================================================
 * LÉLUVERSE
 * REALITY SYSTEM
 *
 * Evolution layer.
 *
 * Uses current Genesis state safely.
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





export default function RealitySystem() {


  const {

    state,

  } = useGenesis();





  const evolution =

    useRef(0);





  useFrame((_, delta) => {


    const active =

      state.thinking ||

      state.actions.length > 0 ||

      state.cognition !== null;





    if (active) {


      evolution.current =

        Math.min(

          1,

          evolution.current +

          delta *

          0.02

        );


    }

    else {


      evolution.current =

        Math.max(

          0,

          evolution.current -

          delta *

          0.002

        );


    }


  });





  return null;

}