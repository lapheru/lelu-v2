/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS MANAGER
 *
 * Master controller of Genesis.
 * ==========================================================
 */

import {

  ConsciousnessEngine,

  CreationEngine,

  CuriosityEngine,

  EvolutionEngine,

  ExistenceEngine,

  InterfaceEngine,

  LearningEngine,

  MemoryEngine,

  RealityEngine,

  SimulationEngine,

  TeachingEngine,

  TimeEngine,

} from "../genesis/engines";

export default class GenesisManager {

  readonly consciousness = new ConsciousnessEngine();

  readonly creation = new CreationEngine();

  readonly curiosity = new CuriosityEngine();

  readonly evolution = new EvolutionEngine();

  readonly existence = new ExistenceEngine();

  readonly interfaces = new InterfaceEngine();

  readonly learning = new LearningEngine();

  readonly memory = new MemoryEngine();

  readonly reality = new RealityEngine();

  readonly simulation = new SimulationEngine();

  readonly teaching = new TeachingEngine();

  readonly time = new TimeEngine();

}