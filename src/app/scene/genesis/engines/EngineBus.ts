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
import {
  createCoreVisualState,
  refreshCoreVisualState,
  type CoreVisualState,
} from "../render/CoreVisualState";

export interface EngineWeights {

  plasma: number;

  ocean: number;

  crystal: number;

  electric: number;

  halo: number;

  /** Organic / biological state derived from life, mutation and emergence. */
  bio: number;

}

export default class EngineBus {

  private readonly registry: EngineRegistry;

  private readonly weights: EngineWeights = {

    plasma: 1,

    ocean: 0,

    crystal: 0,

    electric: 0,

    halo: 1,

    bio: 0,

  };

  /*
   * The ONE visual state of the ONE Core. Computed here, once per
   * frame, from the same smoothed weights that drive the surface —
   * every visual layer reads this instead of deriving its own copy.
   */
  private readonly visualState: CoreVisualState = createCoreVisualState();

  private time = 0;

  constructor(

    registry: EngineRegistry,

  ) {

    this.registry = registry;

  }

  update(

    state: GenesisState,

    delta: number,

  ): void {

    // Pausing the universe freezes the ONE Core's morph, color, pulse and
    // weights as one unit — the renderer keeps reading the same frozen
    // visual state, so the Core simply holds still instead of continuing
    // to mutate while the simulation sleeps.
    if (state.paused) {

      return;

    }

    const engines = this.registry.getAll();

    // The registry contains simulation engines, not separate shell
    // engines. Give each visual channel a meaningful state-derived
    // baseline, then let an explicitly named engine override it when
    // one exists. This keeps the renderer connected to the live
    // universe instead of fading every shell to zero after boot.
    const clamp = (value: number) => Math.max(0, Math.min(1, value));

    /*
     * ONE travelling morph cycle for the ONE Core.
     *
     * Breathing every channel at once kept each engine state half-lit
     * forever, so the surface froze into a single muddy blend. Instead
     * the Core walks a continuous loop through its six engine states:
     *
     *   ocean → plasma → electric → crystal → halo → bio → ocean …
     *
     * Each state's target is a triangle wave centred on its slot in the
     * loop: exactly one state leads while the two neighbours cross-fade
     * through the transition, so the Core MORPHS through its states
     * instead of snapping between them. The universe (energy, awareness,
     * heartbeat, evolution stage) modulates the amplitude of the whole
     * wave, so the Core still answers to LÉLU rather than running on a
     * fixed timer. The surface, color, glow, emission, arcs and rings
     * all read these same weights downstream — one state, one Core.
     */
    const stateOrder = ["ocean", "plasma", "electric", "crystal", "halo", "bio"] as const;
    const cycleCount = stateOrder.length;

    /*
     * Position on the six-state loop, driven by the EngineBus REAL clock
     * (this.time, seconds) — NOT state.age. The simulation advances
     * state.age at 120× real time, so a cycle driven by state.age swept
     * all six states in ~1.1 s: the 4/s weight smoothing could never
     * track a leading state, every channel hovered near the average of
     * the whole palette, and the Core looked stuck on one pale blend.
     * On the real clock a full loop takes ~70 s (6 / 0.085), each state
     * leads for ~12 s before cross-fading onward — fast enough that the
     * ONE Core's color/morph change is unmistakable when watching the
     * running app — and the smoothing tracks the target, so the Core
     * visibly morphs through its engine states instead of freezing into
     * an average or sitting on one color.
     */
    const cycle =
      ((this.time * 0.085) % cycleCount + cycleCount) % cycleCount;

    // Life-force amplitude of the whole morph wave — the Core's overall
    // liveliness, so the cycle still reacts to the simulation.
    const lifeForce = clamp(
      0.40 +
      state.energy * 0.22 +
      state.awareness * 0.14 +
      state.pulse.intensity * 0.16 +
      state.pulse.heartbeat * 0.08 +
      state.evolutionSystem.stage * 0.10 +
      (0.5 + 0.5 * Math.sin(state.age * 0.9)) * 0.08,
    );

    // Per-state universe bias so the simulation still leaves a
    // fingerprint on each engine state without washing out the cycle.
    const bias = {
      ocean: state.ocean.stability * 0.50 + state.ocean.wave * 0.20,
      plasma:
        state.evolutionSystem.plasma * 0.50 +
        state.evolutionSystem.instability * 0.15,
      electric:
        state.energy * 0.30 +
        state.evolutionSystem.mutation * 0.20,
      crystal:
        state.evolutionSystem.formChange * 0.45 +
        state.evolutionSystem.stage * 0.20,
      halo:
        state.evolutionSystem.emergence * 0.35 +
        state.consciousness * 0.20,
      bio:
        state.life * 0.45 +
        state.evolutionSystem.mutation * 0.25,
    };

    // Triangle wave: 1 exactly at the state's slot, falling linearly to
    // 0 at the midpoint toward each neighbour — the morph cross-fade.
    const dominance = (slot: number): number => {
      const distance = Math.min(
        Math.abs(cycle - slot),
        cycleCount - Math.abs(cycle - slot),
      );
      return clamp(1 - distance);
    };

    // A small presence floor on every engine keeps ALL six systems visibly
    // layered inside the ONE Core at all times (so the paused core already
    // shows layered engine detail) and makes the cross-fades genuine blends
    // instead of hard switches between presets.
    const target: EngineWeights = {
      ocean: clamp(dominance(0) * lifeForce + bias.ocean * 0.22 + 0.09),
      plasma: clamp(dominance(1) * lifeForce + bias.plasma * 0.22 + 0.09),
      electric: clamp(dominance(2) * lifeForce + bias.electric * 0.22 + 0.09),
      crystal: clamp(dominance(3) * lifeForce + bias.crystal * 0.22 + 0.09),
      halo: clamp(dominance(4) * lifeForce + bias.halo * 0.22 + 0.09),
      bio: clamp(dominance(5) * lifeForce + bias.bio * 0.22 + 0.09),
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

      else if (id.includes("bio")) {

        target.bio = clampedValue;

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

    this.weights.bio +=

      (target.bio - this.weights.bio) *

      speed;

    /*
     * One shared clock and one refresh of the authoritative visual
     * state per frame. The Core body, emission, atmosphere, life and
     * the cosmic field all consume this same object, so the Core is
     * always ONE living system with one color, one pulse, one set of
     * engine-state weights.
     */
    this.time += delta;

    refreshCoreVisualState(

      this.visualState,

      state,

      this.weights,

      this.time,

    );

  }

  getWeights(): EngineWeights {

    return {

      ...this.weights,

    };

  }

  /** The ONE visual state — same object every frame, refreshed in update(). */
  getVisualState(): CoreVisualState {

    return this.visualState;

  }

}