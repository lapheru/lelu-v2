/**
 * ==========================================================
 * LÉLUVERSE
 * NEURON SYSTEM
 *
 * Living cognition particles.
 * ==========================================================
 */


import {
  Sparkles,
} from "@react-three/drei";


import {
  useGenesis,
} from "../GenesisCore";





export default function NeuronSystem() {


  const {

    state,

  } = useGenesis();





  const intelligence =

    (state.cognition as any)?.intelligence

    ??

    0.5;





  return (

    <Sparkles

      count={

        Math.floor(

          100 +

          intelligence * 600

        )

      }


      scale={5}


      size={2}


      speed={0.5}


      opacity={0.8}

    />

  );

}