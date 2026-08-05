/**
 * ==========================================================
 * LÉLUVERSE
 * APPLICATION MANAGER
 *
 * Controls every desktop application.
 * ==========================================================
 */

import AppRegistry
  from "./AppRegistry";

import DesktopWindow
  from "../DesktopWindow";

export default class ApplicationManager {

  readonly registry =
    new AppRegistry();

  private initialized =
    false;

  initialize(): void {

    if (this.initialized)
      return;

    this.registry.initialize();

    this.initialized =
      true;

  }

  update(
    delta: number,
  ): void {

    if (!this.initialized)
      return;

    this.registry.update(
      delta,
    );

  }

  shutdown(): void {

    if (!this.initialized)
      return;

    this.registry.shutdown();

    this.initialized =
      false;

  }

  launch(
    id: string,
  ): DesktopWindow | undefined {

    const app =

      this.registry.get(id);

    if (!app)
      return;

    app.show();

    app.focus();

    return app;

  }

  close(
    id: string,
  ): void {

    const app =

      this.registry.get(id);

    if (!app)
      return;

    app.hide();

    app.blur();

  }

  minimize(
    id: string,
  ): void {

    const app =

      this.registry.get(id);

    if (!app)
      return;

    app.minimize();

  }

  maximize(
    id: string,
  ): void {

    const app =

      this.registry.get(id);

    if (!app)
      return;

    app.maximize();

  }

  restore(
    id: string,
  ): void {

    const app =

      this.registry.get(id);

    if (!app)
      return;

    app.restore();

  }

  focus(
    id: string,
  ): void {

    for (

      const app of

      this.registry.getAll()

    ) {

      app.blur();

    }

    const app =

      this.registry.get(id);

    if (!app)
      return;

    app.focus();

  }

  get(
    id: string,
  ):
    | DesktopWindow
    | undefined {

    return this.registry.get(
      id,
    );

  }

  getAll():
    DesktopWindow[] {

    return this.registry.getAll();

  }

}