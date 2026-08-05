/**
 * ==========================================================
 * LÉLUVERSE
 * MATTER SYSTEM
 *
 * Living matter layer.
 *
 * Uses current Genesis state.
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





export default function MatterSystem() {


  const {

    state,

  } = useGenesis();





  const matter =

    useRef(0);





  useFrame((_, delta) => {


    const active =

      state.actions.length > 0 ||

      state.cognition !== null;





    if (active) {


      matter.current =

        Math.min(

          1,

          matter.current +

          delta *

          0.02

        );


    }

    else {


      matter.current =

        Math.max(

          0,

          matter.current -

          delta *

          0.005

        );


    }


  });





  return null;

}