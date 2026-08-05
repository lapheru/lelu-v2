/**
 * ==========================================================
 * LÉLUVERSE
 * ENGINE EXECUTION
 * ==========================================================
 */

import { EngineDomain } from "./EngineDomain";

import { EnginePriority } from "./EnginePriority";

import { EnginePhase } from "./EnginePhase";

export interface EngineExecution {

  domain: EngineDomain;

  phase: EnginePhase;

  priority: EnginePriority;

  enabled: boolean;

}