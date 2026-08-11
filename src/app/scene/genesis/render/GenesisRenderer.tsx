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
import CoreEmission from "./CoreEmission";
import LifeEvolutionVisualizer from "./LifeEvolutionVisualizer";
import CoreMemoryVeins from "./CoreMemoryVeins";
import CoreAtmosphere from "../systems/CoreAtmosphere";
import GenesisCore from "../materials/GenesisCore";
import CosmicField from "./CosmicField";
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
      // The renderer samples the same canonical state after simulation and
      // EngineBus propagation, so telemetry can prove the read path without
      // introducing a second visual-state store.
      engineRuntime.markRendererRead();
    });
  });

  return (
    <group ref={root} name="GenesisWorld">
      <group name="Universe">
        <StarField />
        <Cosmos />
        {/* The cosmic ring/nodes field and the memory lattice are part of the
            ENVIRONMENT — distributed through the star field with depth —
            never a shell wrapped around the Core. */}
        <CosmicField />
        <CoreMemoryVeins />
      </group>

      <group name="BlueGenesisCore">
        {/* ONE Core — one origin, one transform, one mutation controller.
            The single mesh material carries every engine state (ocean,
            plasma, electric, crystal, halo, bio) weighted by the EngineBus
            channels, and CoreEmission is energy leaving that same surface
            — particles, electric arcs, ocean rings. The old second
            controller (CoreLayer / LivingCoreController) that used to
            rotate and breathe the same core with its own formula has been
            merged into this one body: the mesh is the ONLY transform
            controller of the ONLY core object. The life motes are nested
            inside the same mesh so they share the one transform. */}
        <GenesisCore>
          <LifeEvolutionVisualizer />
        </GenesisCore>
        <CoreEmission />

        {/* The Core's light source, driven by the same palette. The aurora
            lives in the cosmic environment (AuroraCosmos inside the Universe
            group), never wrapped around the Core. */}
        <CoreAtmosphere />
      </group>
    </group>
  );
}
