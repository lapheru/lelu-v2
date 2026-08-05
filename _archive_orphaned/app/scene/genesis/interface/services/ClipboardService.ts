/**
 * ==========================================================
 * LÉLUVERSE
 * CLIPBOARD SERVICE
 *
 * Shared clipboard for the desktop.
 * ==========================================================
 */

export default class ClipboardService {

  private initialized =
    false;

  private value:
    unknown =
      null;

  initialize(): void {

    if (this.initialized)
      return;

    this.initialized =
      true;

  }

  shutdown(): void {

    this.value =
      null;

    this.initialized =
      false;

  }

  copy(
    value: unknown,
  ): void {

    this.value =
      value;

  }

  cut(
    value: unknown,
  ): void {

    this.copy(
      value,
    );

  }

  paste():
    unknown {

    return this.value;

  }

  clear(): void {

    this.value =
      null;

  }

  hasValue():
    boolean {

    return this.value !==
      null;

  }

}