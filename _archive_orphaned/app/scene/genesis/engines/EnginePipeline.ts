/**
 * ==========================================================
 * LÉLUVERSE
 * ENGINE PIPELINE
 * ==========================================================
 */

import type { GenesisState } from "../state/GenesisState";
import type { GenesisEngine } from "./EngineRegistry";

export enum EngineStage {

  PRE_UPDATE = "PRE_UPDATE",

  SIMULATION = "SIMULATION",

  EVOLUTION = "EVOLUTION",

  CONSCIOUSNESS = "CONSCIOUSNESS",

  POST_UPDATE = "POST_UPDATE",

}

export default class EnginePipeline {

  private readonly stages =
    new Map<EngineStage, GenesisEngine[]>();

  constructor() {

    Object.values(EngineStage).forEach(

      stage =>

        this.stages.set(

          stage,

          [],

        ),

    );

  }

  register(

    stage: EngineStage,

    engine: GenesisEngine,

  ): void {

    this.stages
      .get(stage)
      ?.push(engine);

  }

  update(

    state: GenesisState,

    delta: number,

  ): void {

    for (const engines of this.stages.values()) {

      for (const engine of engines) {

        if (!engine.enabled || typeof engine.update !== "function") continue;

        engine.update(

          state,

          delta,

        );

      }

    }

  }

}