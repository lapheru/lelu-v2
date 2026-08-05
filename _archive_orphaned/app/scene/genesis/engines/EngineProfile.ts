/**
 * ==========================================================
 * LÉLUVERSE
 * ENGINE PROFILE
 * ==========================================================
 */

import type {

  EngineExecution,

} from "./EngineExecution";

export interface EngineProfile {

  id: string;

  name: string;

  version: string;

  execution: EngineExecution;

}