/**
 * ==========================================================
 * LÉLUVERSE
 * DESKTOP WIDGET
 *
 * Base widget for every desktop widget.
 * ==========================================================
 */

export interface DesktopWidgetState {

  id: string;

  title: string;

  visible: boolean;

  enabled: boolean;

  x: number;

  y: number;

  width: number;

  height: number;

}

export default abstract class DesktopWidget {

  readonly state:
    DesktopWidgetState;

  protected initialized =
    false;

  constructor(
    state: DesktopWidgetState,
  ) {

    this.state =
      state;

  }

  initialize(): void {

    if (this.initialized)
      return;

    this.initialized =
      true;

  }

  update(
    _delta: number,
  ): void {

  }

  shutdown(): void {

    this.initialized =
      false;

  }

  show(): void {

    this.state.visible =
      true;

  }

  hide(): void {

    this.state.visible =
      false;

  }

  enable(): void {

    this.state.enabled =
      true;

  }

  disable(): void {

    this.state.enabled =
      false;

  }

  move(

    x: number,

    y: number,

  ): void {

    this.state.x =
      x;

    this.state.y =
      y;

  }

  resize(

    width: number,

    height: number,

  ): void {

    this.state.width =
      width;

    this.state.height =
      height;

  }

}