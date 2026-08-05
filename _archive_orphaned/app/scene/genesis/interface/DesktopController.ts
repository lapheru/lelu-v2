/**
 * ==========================================================
 * LÉLUVERSE
 * DESKTOP CONTROLLER
 *
 * Controls the complete desktop interface.
 * ==========================================================
 */

import Desktop
  from "./Desktop";

import DesktopDock
  from "./DesktopDock";

import DesktopHUD
  from "./DesktopHUD";

import CommandPalette
  from "./CommandPalette";

import InterfaceCore
  from "./InterfaceCore";

export default class DesktopController {

  readonly desktop:
    Desktop;

  readonly dock:
    DesktopDock;

  readonly hud:
    DesktopHUD;

  readonly palette:
    CommandPalette;

  private initialized =
    false;

  constructor(

    readonly interfaceCore:
      InterfaceCore,

  ) {

    this.desktop =

      new Desktop(

        interfaceCore.workspace,

        interfaceCore.windows,

        interfaceCore.overlays,

        interfaceCore.focus,

        interfaceCore.dock,

        interfaceCore.notifications,

        interfaceCore.commands,

      );

    this.dock =

      new DesktopDock(

        interfaceCore.dock,

      );

    this.hud =

      new DesktopHUD(

        interfaceCore.notifications,

      );

    this.palette =

      new CommandPalette(

        interfaceCore.commands,

      );

  }

  initialize(): void {

    if (this.initialized)
      return;

    this.desktop.initialize();

    this.dock.initialize();

    this.hud.initialize();

    this.palette.initialize();

    this.initialized =
      true;

  }

  update(
    delta: number,
  ): void {

    if (!this.initialized)
      return;

    this.desktop.update(
      delta,
    );

    this.dock.update(
      delta,
    );

    this.hud.update(
      delta,
    );

    this.palette.update(
      delta,
    );

  }

  shutdown(): void {

    if (!this.initialized)
      return;

    this.palette.shutdown();

    this.hud.shutdown();

    this.dock.shutdown();

    this.desktop.shutdown();

    this.initialized =
      false;

  }

}