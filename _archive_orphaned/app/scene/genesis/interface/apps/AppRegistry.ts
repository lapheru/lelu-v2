/**
 * ==========================================================
 * LÉLUVERSE
 * APP REGISTRY
 *
 * Central registry for every desktop application.
 * ==========================================================
 */

import ChatApp
  from "./ChatApp";

import MemoryGardenApp
  from "./MemoryGardenApp";

import KnowledgeApp
  from "./KnowledgeApp";

import ExplorerApp
  from "./ExplorerApp";

import TerminalApp
  from "./TerminalApp";

import SettingsApp
  from "./SettingsApp";

import SimulationApp
  from "./SimulationApp";

import ConsoleApp
  from "./ConsoleApp";

import MediaApp
  from "./MediaApp";

import BrowserApp
  from "./BrowserApp.ts";

import DesktopWindow
  from "../DesktopWindow";

export default class AppRegistry {

  private readonly apps =
    new Map<
      string,
      DesktopWindow
    >();

  constructor() {

    this.register(
      new ChatApp(),
    );

    this.register(
      new MemoryGardenApp(),
    );

    this.register(
      new KnowledgeApp(),
    );

    this.register(
      new ExplorerApp(),
    );

    this.register(
      new TerminalApp(),
    );

    this.register(
      new SettingsApp(),
    );

    this.register(
      new SimulationApp(),
    );

    this.register(
      new ConsoleApp(),
    );

    this.register(
      new MediaApp(),
    );

    this.register(
      new BrowserApp(),
    );

  }

  register(
    app: DesktopWindow,
  ): void {

    this.apps.set(

      app.state.id,

      app,

    );

  }

  unregister(
    id: string,
  ): void {

    this.apps.delete(
      id,
    );

  }

  get(
    id: string,
  ):
    | DesktopWindow
    | undefined {

    return this.apps.get(
      id,
    );

  }

  getAll():
    DesktopWindow[] {

    return Array.from(

      this.apps.values(),

    );

  }

  initialize(): void {

    for (

      const app of

      this.apps.values()

    ) {

      app.initialize();

    }

  }

  update(
    delta: number,
  ): void {

    for (

      const app of

      this.apps.values()

    ) {

      app.update(
        delta,
      );

    }

  }

  shutdown(): void {

    for (

      const app of

      this.apps.values()

    ) {

      app.shutdown();

    }

  }

}