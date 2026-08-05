/**
 * ==========================================================
 * LÉLU
 * VOICE DIAGNOSTICS
 * ==========================================================
 */

import VoiceHealth from "./VoiceHealth";
import VoiceMetrics from "./VoiceMetrics";

export default class VoiceDiagnostics {

  readonly health: VoiceHealth;

  readonly metrics: VoiceMetrics;

  constructor(

    health: VoiceHealth,

    metrics: VoiceMetrics,

  ) {

    this.health = health;

    this.metrics = metrics;

  }

}