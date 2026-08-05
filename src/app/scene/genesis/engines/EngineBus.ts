/**
 * ==========================================================
 * LÉLUVERSE
 * ENGINE BUS
 *
 * Central orchestration layer between
 * the EngineRegistry and Genesis Renderer.
 *
 * Responsibilities
 * • Collect engine influence
 * • Smooth transitions
 * • Drive shader uniforms
 * • Drive shell activity
 * • Runtime orchestration
 * ==========================================================
 */

import type EngineRegistry from "./EngineRegistry";
import type { GenesisState } from "../state/GenesisState";

export interface EngineWeights {

  plasma: number;

  ocean: number;

  crystal: number;

  electric: number;

  halo: number;

}

export default class EngineBus {

  private readonly registry: EngineRegistry;

  private readonly weights: EngineWeights = {

    plasma: 1,

    ocean: 0,

    crystal: 0,

    electric: 0,

    halo: 1,

  };

  constructor(

    registry: EngineRegistry,

  ) {

    this.registry = registry;

  }

  update(

    state: GenesisState,

    delta: number,

  ): void {

    const engines = this.registry.getAll();

    // The registry contains simulation engines, not separate shell
    // engines. Give each visual channel a meaningful state-derived
    // baseline, then let an explicitly named engine override it when
    // one exists. This keeps the renderer connected to the live
    // universe instead of fading every shell to zero after boot.
    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    const target: EngineWeights = {

      // Use the live evolution channels and heartbeat as well as the
      // slowly growing universe values. This keeps shell activity alive
      // after the awakening sequence reaches its long-term caps.
      plasma: clamp(
        0.18 +
        state.evolutionSystem.plasma * 0.42 +
        state.pulse.intensity * 0.30 +
        state.evolutionSystem.instability * 0.10,
      ),

      ocean: clamp(
        state.ocean.stability * 0.60 +
        state.ocean.wave * 0.20 +
        state.pulse.heartbeat * 0.20,
      ),

      crystal: clamp(
        0.14 +
        state.evolutionSystem.formChange * 0.46 +
        state.evolutionSystem.stage * 0.20 +
        state.pulse.heartbeat * 0.20,
      ),

      electric: clamp(
        0.12 +
        state.energy * 0.25 +
        state.pulse.intensity * 0.30 +
        state.evolutionSystem.mutation * 0.18 +
        state.awareness * 0.15,
      ),

      halo: clamp(
        0.18 +
        state.evolutionSystem.emergence * 0.30 +
        state.consciousness * 0.20 +
        state.pulse.heartbeat * 0.20 +
        state.existence * 0.12,
      ),

    };

    for (const engine of engines) {

      if (engine.enabled === false) {

        continue;

      }

      const id =

        (engine.id ??

        engine.constructor.name)

        .toLowerCase();

      const value =

        engine.getWeight?.(state) ??

        engine.weight;

      // Only engines that explicitly expose a visual weight participate
      // in channel overrides. Simulation engines such as OceanEngine
      // should not accidentally become shell controllers just because
      // their class name happens to contain a channel name.
      if (value === undefined) {

        continue;

      }

      const clampedValue = clamp(value);

      if (id.includes("plasma")) {

        target.plasma = clampedValue;

      }

      else if (id.includes("ocean")) {

        target.ocean = clampedValue;

      }

      else if (id.includes("crystal")) {

        target.crystal = clampedValue;

      }

      else if (id.includes("electric")) {

        target.electric = clampedValue;

      }

      else if (id.includes("halo")) {

        target.halo = clampedValue;

      }

    }

    const speed =

      Math.min(

        delta * 4,

        1,

      );

    this.weights.plasma +=

      (target.plasma - this.weights.plasma) *

      speed;

    this.weights.ocean +=

      (target.ocean - this.weights.ocean) *

      speed;

    this.weights.crystal +=

      (target.crystal - this.weights.crystal) *

      speed;

    this.weights.electric +=

      (target.electric - this.weights.electric) *

      speed;

    this.weights.halo +=

      (target.halo - this.weights.halo) *

      speed;

  }

  getWeights(): EngineWeights {

    return {

      ...this.weights,

    };

  }

}