/**
 * ==========================================================
 * LÉLUVERSE
 * ENGINE DIAGNOSTICS
 * ==========================================================
 */

import EngineMetrics from "./EngineMetrics";

export default class EngineDiagnostics {

  constructor(

    private readonly metrics: EngineMetrics,

  ) {}

  report() {

    return {

      ...this.metrics.get(),

      healthy: true,

      timestamp: Date.now(),

    };

  }

}