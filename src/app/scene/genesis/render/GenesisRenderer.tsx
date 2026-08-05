/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS RENDERER
 *
 * Master visual compositor.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Group } from "three";

import Cosmos from "../environment/Cosmos";
import StarField from "../environment/stars/StarField";
import CoreLayer from "./CoreLayer";
import Ocean from "./ocean/Ocean";
import HaloShell from "../materials/HaloShell";
import CrystalShell from "../materials/CrystalShell";
import ElectricShell from "../materials/ElectricShell";
import LifeEvolutionVisualizer from "./LifeEvolutionVisualizer";
import CoreMemoryVeins from "./CoreMemoryVeins";
import CoreMutationVisualizer from "./CoreMutationVisualizer";
import CoreAtmosphere from "../systems/CoreAtmosphere";
import GenesisCore from "../materials/GenesisCore";
import { useGenesis } from "../GenesisCore";
import {
  idleGenesisSignals,
  type GenesisSignals,
} from "../engines/GenesisSignals";

export default function GenesisRenderer() {
  const root = useRef<Group>(null);
  const {
    state: uiState,
    engineRuntime,
    updateUniverse,
  } = useGenesis();

  const signalsRef = useRef<GenesisSignals>(idleGenesisSignals);
  const lastProviderRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const lastMessage = uiState.messages[uiState.messages.length - 1];
    const provider = lastMessage?.provider;
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
      engineErrorCount: uiState.engineStatuses.filter(
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

    updateUniverse(universeState => {
      engineRuntime.update(universeState, delta, signalsRef.current);
    });
  });

  return (
    <group ref={root} name="GenesisWorld">
      <group name="Universe">
        <StarField />
        <Cosmos />
      </group>

      <group name="BlueGenesisCore">
        <CoreLayer>
          <GenesisCore />
          {/* Existing evolution layers: each shell reads its live EngineBus
              channel and feeds its own material uniforms every frame. */}
          <CrystalShell />
          <ElectricShell />
          <HaloShell />
          <CoreMutationVisualizer />
        </CoreLayer>

        <Ocean />
        <CoreAtmosphere />
        <LifeEvolutionVisualizer />
        <CoreMemoryVeins />
      </group>
    </group>
  );
}
