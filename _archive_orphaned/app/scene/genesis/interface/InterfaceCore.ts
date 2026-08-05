/**
 * ==========================================================
 * LÉLUVERSE
 * INTERFACE CORE
 *
 * Central coordinator for every interface system.
 * The UI equivalent of GenesisController.
 * ==========================================================
 */

import WorkspaceManager from "./WorkspaceManager";
import WindowManager from "./WindowManager";
import OverlayManager from "./OverlayManager";
import FocusManager from "./FocusManager";
import LayoutManager from "./LayoutManager";
import NotificationManager from "./NotificationManager";
import DockManager from "./DockManager";
import CommandManager from "./CommandManager";

export default class InterfaceCore {

  readonly workspace =
    new WorkspaceManager();

  readonly windows =
    new WindowManager();

  readonly overlays =
    new OverlayManager();

  readonly focus =
    new FocusManager();

  readonly layout =
    new LayoutManager();

  readonly notifications =
    new NotificationManager();

  readonly dock =
    new DockManager();

  readonly commands =
    new CommandManager();

  private initialized =
    false;

  initialize(): void {

    if (this.initialized)
      return;

    this.layout.initialize();

    this.workspace.initialize();

    this.windows.initialize();

    this.overlays.initialize();

    this.focus.initialize();

    this.notifications.initialize();

    this.dock.initialize();

    this.commands.initialize();

    this.initialized = true;

  }

  update(
    delta: number,
  ): void {

    if (!this.initialized)
      return;

    this.workspace.update(delta);

    this.windows.update(delta);

    this.overlays.update(delta);

    this.focus.update(delta);

    this.layout.update(delta);

    this.notifications.update(delta);

    this.dock.update(delta);

    this.commands.update(delta);

  }

  shutdown(): void {

    if (!this.initialized)
      return;

    this.commands.shutdown();

    this.dock.shutdown();

    this.notifications.shutdown();

    this.layout.shutdown();

    this.focus.shutdown();

    this.overlays.shutdown();

    this.windows.shutdown();

    this.workspace.shutdown();

    this.initialized = false;

  }

}