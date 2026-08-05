/**
 * ==========================================================
 * LÉLUVERSE
 * DESKTOP
 *
 * Root desktop for the Lélu interface.
 * ==========================================================
 */

import WorkspaceManager
  from "./WorkspaceManager";

import WindowManager
  from "./WindowManager";

import OverlayManager
  from "./OverlayManager";

import FocusManager
  from "./FocusManager";

import DockManager
  from "./DockManager";

import NotificationManager
  from "./NotificationManager";

import CommandManager
  from "./CommandManager";

export default class Desktop {

  private initialized =
    false;

  constructor(

    readonly workspaces:
      WorkspaceManager,

    readonly windows:
      WindowManager,

    readonly overlays:
      OverlayManager,

    readonly focus:
      FocusManager,

    readonly dock:
      DockManager,

    readonly notifications:
      NotificationManager,

    readonly commands:
      CommandManager,

  ) {}

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