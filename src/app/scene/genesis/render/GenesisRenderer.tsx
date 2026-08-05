/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS RENDERER
 *
 * Master visual compositor.
 *
 * Structure:
 *
 * Universe
 *  ├── Stars
 *  ├── Cosmos
 *
 * Genesis Core
 *  ├── CoreLayer
 *  │     ├── GenesisCore
 *  │     └── Mutation
 *  │
 *  ├── Atmosphere
 *  ├── Ocean
 *  ├── Life
 *  └── Memory
 *
 * ==========================================================
 */


import {
  useFrame,
} from "@react-three/fiber";


import {
  useRef,
  useEffect,
} from "react";

import {
  idleGenesisSignals,
  type GenesisSignals,
} from "../engines/GenesisSignals";


import {
  Group,
} from "three";



import Cosmos
  from "../environment/Cosmos";


import StarField
  from "../environment/stars/StarField";



import CoreLayer
  from "./CoreLayer";


import Ocean
  from "./ocean/Ocean";

import CrystalShell
  from "../materials/CrystalShell";

import ElectricShell
  from "../materials/ElectricShell";

import HaloShell
  from "../materials/HaloShell";

import LifeEvolutionVisualizer
  from "./LifeEvolutionVisualizer";

import CoreMemoryVeins
  from "./CoreMemoryVeins";


import CoreMutationVisualizer
  from "./CoreMutationVisualizer";


import CoreAtmosphere
  from "../systems/CoreAtmosphere";


import GenesisCore
  from "../materials/GenesisCore";

import { useGenesis } from "../GenesisCore";





export default function GenesisRenderer(){


  const root =

    useRef<Group>(null);

    const {

  state: uiState,

  engineRuntime,

  updateUniverse,

} = useGenesis();

const weights =
  engineRuntime
    ?.getEngineBus()
    .getWeights() ?? {
      plasma: 1,
      ocean: 0,
      crystal: 1,
      electric: 1,
      halo: 1,
    };

  /*
   * Live activity signals.
   *
   * Derived from the interface layer (chat, cognition,
   * engine health) and refreshed whenever that state
   * changes — not every frame — then read from a ref inside
   * the frame loop so engines see this tick's real activity
   * instead of only an ambient, disconnected simulation.
   */

  const signalsRef =
    useRef<GenesisSignals>(idleGenesisSignals);

  const lastProviderRef =
    useRef<string | undefined>(undefined);

  useEffect(() => {

    const lastMessage =
      uiState.messages[uiState.messages.length - 1];

    const provider =
      lastMessage?.provider;

    const providerSwitched =
      provider !== undefined &&
      lastProviderRef.current !== undefined &&
      provider !== lastProviderRef.current;

    if (provider !== undefined) {
      lastProviderRef.current = provider;
    }

    signalsRef.current = {

      thinking: uiState.thinking,

      speaking: uiState.speaking,

      listening: uiState.listening,

      reasoningActive: Boolean(uiState.cognition?.reasoning),

      planningActive: Boolean(uiState.cognition?.plan),

      providerSwitched,

      engineErrorCount:
        uiState.engineStatuses.filter(
          status => Boolean(status.error) || status.enabled === false,
        ).length,

    };

  }, [
    uiState.thinking,
    uiState.speaking,
    uiState.listening,
    uiState.cognition,
    uiState.engineStatuses,
    uiState.messages,
  ]);



  useFrame((_, delta) => {

  if (root.current) {
    root.current.rotation.y += delta * 0.002;
  }

  if (!engineRuntime) {
    return;
  }

  updateUniverse((universeState) => {
    engineRuntime.update(universeState, delta, signalsRef.current);
  });

});







  return (

    <group

      ref={root}

      name="GenesisWorld"

    >





      {/* ==========================================
          OUTER COSMOS
      ========================================== */}



      <group

        name="Universe"

      >

        <StarField />

        <Cosmos />

      </group>







      {/* ==========================================
          LIVING GENESIS CORE
      ========================================== */}



      <group

        name="BlueGenesisCore"

      >





        {/* CORE BODY */}


        <CoreLayer>


          <GenesisCore />

          <CrystalShell
  activity={weights.crystal}
/>

<ElectricShell
  activity={weights.electric}
/>

<HaloShell
  activity={weights.halo}
/>

          <CoreMutationVisualizer />


        </CoreLayer>

      
        <Ocean />




        {/* OUTER SHELLS */}


        <CoreAtmosphere />

        <LifeEvolutionVisualizer />

        <CoreMemoryVeins />





      </group>





    </group>

  );

}