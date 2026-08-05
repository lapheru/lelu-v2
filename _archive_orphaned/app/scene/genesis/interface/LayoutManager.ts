/**
 * ==========================================================
 * LÉLUVERSE
 * LAYOUT MANAGER
 *
 * Manages interface layouts.
 * ==========================================================
 */

export default class LayoutManager {

  private initialized =
    false;

  initialize(): void {

    if (this.initialized)
      return;

    this.initialized =
      true;

  }

  update(
    _delta: number,
  ): void {

    if (!this.initialized)
      return;

  }

  shutdown(): void {

    this.initialized =
      false;

  }

}