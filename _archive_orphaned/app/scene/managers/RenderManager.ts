/**
 * ==========================================================
 * LÉLUVERSE
 * RENDER MANAGER
 * ==========================================================
 */

import RenderPipeline

from "../genesis/render/RenderPipeline";

export default class RenderManager {

  readonly pipeline = new RenderPipeline();

  initialize() {

    this.pipeline.initialize();

  }

  render() {

    this.pipeline.render({
      time: performance.now(),
      delta: 0.016,
      activity: 0,
    });

  }

  dispose() {

    this.pipeline.dispose();

  }

}