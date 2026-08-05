/**
 * ==========================================================
 * LÉLUVERSE
 * STORM SYSTEM
 *
 * Atmospheric force engine.
 *
 * Controls:
 * - hurricanes
 * - lightning storms
 * - cyclones
 * - pressure systems
 * - storm intensity
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





export interface StormState {


  intensity:
    number;


  rotation:
    number;


  lightning:
    number;


  pressure:
    number;


  rainfall:
    number;


  hurricane:
    number;


}





export default function StormSystem() {


  const {

    state,

  } = useGenesis();





  const storm =

    useRef<StormState>({

      intensity:0.1,

      rotation:0,

      lightning:0,

      pressure:0.8,

      rainfall:0.2,

      hurricane:0,

    });





  const time =

    useRef(0);





  useFrame((_,delta)=>{


    time.current += delta;


    const s =

      storm.current;





    /*
     * Atmospheric instability
     */


    const chaos =

      Math.abs(

        Math.sin(

          time.current *

          0.07

        )

      );





    /*
     * Storm energy
     */


    s.intensity =

      chaos *

      0.8;





    /*
     * Rotating systems
     */


    s.rotation +=

      delta *

      s.intensity;





    /*
     * Pressure changes
     */


    s.pressure =

      1 -

      s.intensity *

      0.7;





    /*
     * Hurricane formation
     */


    s.hurricane =

      Math.max(

        0,

        (

          s.intensity -

          0.4

        )

        *

        1.5

      );





    /*
     * Lightning activity
     */


    s.lightning =

      s.intensity *

      s.hurricane;





    /*
     * Rainfall
     */


    s.rainfall =

      Math.min(

        1,

        s.intensity *

        0.9

      );





    /*
     * Intelligence influence
     */


    if (

      state.thinking

    ) {

      s.lightning =

        Math.min(

          1,

          s.lightning +

          0.1

        );

    }


  });





  return null;

}