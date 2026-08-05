/**
 * ==========================================================
 * LÉLUVERSE
 * DESKTOP WINDOW
 *
 * Base class for every desktop window.
 * ==========================================================
 */

export interface DesktopWindowState {
  id: string;
  title: string;
  visible: boolean;
  focused: boolean;
  minimized: boolean;
  maximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  updated?: number;
}

export default class DesktopWindow {

  readonly state:
    DesktopWindowState;

  constructor(
    state: DesktopWindowState,
  ) {

    this.state = {
      ...state,
      updated: state.updated ?? Date.now(),
    };

  }

  initialize(): void {}

  update(
    _delta: number,
  ): void {}

  shutdown(): void {}

  show(): void {

    this.state.visible =
      true;

  }

  hide(): void {

    this.state.visible =
      false;

  }

  focus(): void {

    this.state.focused =
      true;

  }

  blur(): void {

    this.state.focused =
      false;

  }

  minimize(): void {

    this.state.minimized =
      true;

    this.state.maximized =
      false;

  }

  maximize(): void {

    this.state.maximized =
      true;

    this.state.minimized =
      false;

  }

  restore(): void {

    this.state.minimized =
      false;

    this.state.maximized =
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