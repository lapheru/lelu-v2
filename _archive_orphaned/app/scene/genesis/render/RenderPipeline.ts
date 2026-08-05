/**
 * ==========================================================
 * LÉLUVERSE
 * RENDER PIPELINE
 * ==========================================================
 */

export interface RenderFrame {
  time: number;
  delta: number;
  activity: number;
}

export default class RenderPipeline {
  private initialized = false;
  private frame = 0;

  initialize(): void {
    this.initialized = true;
    this.frame = 0;
  }

  render(frame: RenderFrame): void {
    if (!this.initialized) {
      return;
    }

    this.frame += 1;
    if (frame.activity > 0) {
      this.frame += 1;
    }
  }

  dispose(): void {
    this.initialized = false;
    this.frame = 0;
  }

  getFrameCount(): number {
    return this.frame;
  }
}