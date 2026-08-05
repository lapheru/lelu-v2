/**
 * ==========================================================
 * LÉLUVERSE
 * ENGINE METRICS
 * ==========================================================
 */

export interface EngineMetricsState {

  updates: number;

  elapsed: number;

  delta: number;

  fps: number;

}

export default class EngineMetrics {

  private readonly metrics: EngineMetricsState = {

    updates: 0,

    elapsed: 0,

    delta: 0,

    fps: 0,

  };

  update(
    delta: number,
  ): void {

    this.metrics.updates++;

    this.metrics.delta = delta;

    this.metrics.elapsed += delta;

    this.metrics.fps =
      delta > 0
        ? Math.round(1 / delta)
        : 0;

  }

  get(): EngineMetricsState {

    return this.metrics;

  }

  reset(): void {

    this.metrics.updates = 0;

    this.metrics.elapsed = 0;

    this.metrics.delta = 0;

    this.metrics.fps = 0;

  }

}