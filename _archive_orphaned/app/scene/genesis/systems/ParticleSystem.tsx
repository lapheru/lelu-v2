/**
 * ==========================================================
 * LÉLUVERSE
 * PARTICLE SYSTEM
 *
 * Living particle field.
 *
 * Reacts to:
 * - cognition
 * - thoughts
 * - actions
 * - conversation
 * ==========================================================
 */


import {
  Sparkles,
} from "@react-three/drei";


import {
  useGenesis,
} from "../GenesisCore";





export default function ParticleSystem() {


  const {

    state,

  } = useGenesis();





  const cognitionLevel =

    state.cognition

      ?

      (

        state.cognition.agents.length

        +

        state.cognition.workspaces.length

        +

        state.cognition.nodes.length

      )

      :

      0;





  const activity =

    state.thinking

      ?

      1

      :

      state.actions.length > 0

        ?

        0.7

        :

        0.3;





  return (

    <Sparkles


      count={

        Math.floor(

          2500 +

          cognitionLevel * 100 +

          activity * 500

        )

      }


      scale={40}


      size={

        3 +

        activity * 2

      }


      speed={

        0.5 +

        activity

      }


    />

  );

}