/**
 * ==========================================================
 * LÉLUVERSE
 * FOCUS MANAGER
 *
 * Tracks interface focus.
 * ==========================================================
 */

export default class FocusManager {

  private initialized =
    false;

  private focusedId:
    string | null =
      null;

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

    this.focusedId =
      null;

    this.initialized =
      false;

  }

  focus(
    id: string,
  ): void {

    this.focusedId =
      id;

  }

  clear(): void {

    this.focusedId =
      null;

  }

  isFocused(
    id: string,
  ): boolean {

    return this.focusedId === id;

  }

  getFocused():
    string | null {

    return this.focusedId;

  }

}