/**
 * ==========================================================
 * LÉLUVERSE
 * DOCK MANAGER
 *
 * Manages the Lélu dock.
 * ==========================================================
 */

export interface DockItem {

  id: string;

  title: string;

  icon: string;

  enabled: boolean;

  pinned: boolean;

}

export default class DockManager {

  private initialized =
    false;

  private readonly items =
    new Map<
      string,
      DockItem
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

    this.items.clear();

    this.initialized =
      false;

  }

  register(
    item: DockItem,
  ): void {

    this.items.set(
      item.id,
      item,
    );

  }

  unregister(
    id: string,
  ): void {

    this.items.delete(
      id,
    );

  }

  get(
    id: string,
  ):
    | DockItem
    | undefined {

    return this.items.get(
      id,
    );

  }

  getAll():
    DockItem[] {

    return Array.from(

      this.items.values(),

    );

  }

  pin(
    id: string,
  ): void {

    const item =

      this.items.get(id);

    if (!item)
      return;

    item.pinned =
      true;

  }

  unpin(
    id: string,
  ): void {

    const item =

      this.items.get(id);

    if (!item)
      return;

    item.pinned =
      false;

  }

  enable(
    id: string,
  ): void {

    const item =

      this.items.get(id);

    if (!item)
      return;

    item.enabled =
      true;

  }

  disable(
    id: string,
  ): void {

    const item =

      this.items.get(id);

    if (!item)
      return;

    item.enabled =
      false;

  }

}