/**
 * ==========================================================
 * LÉLUVERSE
 * WIDGET MANAGER
 *
 * Manages every desktop widget.
 * ==========================================================
 */

import DesktopWidget
  from "./DesktopWidget";

export default class WidgetManager {

  private readonly widgets =
    new Map<
      string,
      DesktopWidget
    >();

  register(
    widget: DesktopWidget,
  ): void {

    this.widgets.set(

      widget.state.id,

      widget,

    );

  }

  unregister(
    id: string,
  ): void {

    this.widgets.delete(
      id,
    );

  }

  initialize(): void {

    for (

      const widget of

      this.widgets.values()

    ) {

      widget.initialize();

    }

  }

  update(
    delta: number,
  ): void {

    for (

      const widget of

      this.widgets.values()

    ) {

      widget.update(
        delta,
      );

    }

  }

  shutdown(): void {

    for (

      const widget of

      this.widgets.values()

    ) {

      widget.shutdown();

    }

  }

  get(
    id: string,
  ):
    | DesktopWidget
    | undefined {

    return this.widgets.get(
      id,
    );

  }

  getAll():
    DesktopWidget[] {

    return Array.from(

      this.widgets.values(),

    );

  }

}