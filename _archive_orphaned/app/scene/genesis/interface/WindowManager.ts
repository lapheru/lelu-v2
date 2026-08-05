/**
 * ==========================================================
 * LÉLUVERSE
 * WINDOW MANAGER
 *
 * Manages every window in the Lélu interface.
 * ==========================================================
 */

export interface InterfaceWindow {

  id: string;

  title: string;

  visible: boolean;

  minimized: boolean;

  maximized: boolean;

  focused: boolean;

  x: number;

  y: number;

  width: number;

  height: number;

  zIndex: number;

}

export default class WindowManager {

  private initialized =
    false;

  private nextZ =
    1;

  private readonly windows =
    new Map<
      string,
      InterfaceWindow
    >();

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

    this.windows.clear();

    this.nextZ =
      1;

    this.initialized =
      false;

  }

  register(
    window: InterfaceWindow,
  ): void {

    window.zIndex =
      this.nextZ++;

    this.windows.set(
      window.id,
      window,
    );

  }

  unregister(
    id: string,
  ): void {

    this.windows.delete(
      id,
    );

  }

  get(
    id: string,
  ):
    | InterfaceWindow
    | undefined {

    return this.windows.get(
      id,
    );

  }

  getAll():
    InterfaceWindow[] {

    return Array.from(

      this.windows.values(),

    );

  }

  focus(
    id: string,
  ): void {

    for (

      const window of

      this.windows.values()

    ) {

      window.focused =
        false;

    }

    const window =

      this.windows.get(id);

    if (!window)
      return;

    window.focused =
      true;

    window.zIndex =
      this.nextZ++;

  }

  show(
    id: string,
  ): void {

    const window =
      this.windows.get(id);

    if (!window)
      return;

    window.visible =
      true;

    this.focus(id);

  }

  hide(
    id: string,
  ): void {

    const window =
      this.windows.get(id);

    if (!window)
      return;

    window.visible =
      false;

    window.focused =
      false;

  }

  toggle(
    id: string,
  ): void {

    const window =
      this.windows.get(id);

    if (!window)
      return;

    if (window.visible)
      this.hide(id);
    else
      this.show(id);

  }

  move(

    id: string,

    x: number,

    y: number,

  ): void {

    const window =
      this.windows.get(id);

    if (!window)
      return;

    window.x =
      x;

    window.y =
      y;

  }

  resize(

    id: string,

    width: number,

    height: number,

  ): void {

    const window =
      this.windows.get(id);

    if (!window)
      return;

    window.width =
      width;

    window.height =
      height;

  }

  minimize(
    id: string,
  ): void {

    const window =
      this.windows.get(id);

    if (!window)
      return;

    window.minimized =
      true;

    window.maximized =
      false;

  }

  maximize(
    id: string,
  ): void {

    const window =
      this.windows.get(id);

    if (!window)
      return;

    window.maximized =
      true;

    window.minimized =
      false;

    this.focus(id);

  }

  restore(
    id: string,
  ): void {

    const window =
      this.windows.get(id);

    if (!window)
      return;

    window.minimized =
      false;

    window.maximized =
      false;

  }

}