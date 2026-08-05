/**
 * ==========================================================
 * LÉLUVERSE
 * LAYOUT MANAGER
 *
 * Manages workspace layouts, docking regions,
 * panels, and responsive arrangements.
 * ==========================================================
 */

export interface LayoutRegion {

  id: string;

  visible: boolean;

  x: number;

  y: number;

  width: number;

  height: number;

}

export default class LayoutManager {

  private initialized =
    false;

  private readonly regions =
    new Map<
      string,
      LayoutRegion
    >();

  initialize(): void {

    if (this.initialized)
      return;

    this.initialized = true;

  }

  update(
    _delta: number,
  ): void {

    if (!this.initialized)
      return;

  }

  shutdown(): void {

    this.regions.clear();

    this.initialized = false;

  }

  register(
    region: LayoutRegion,
  ): void {

    this.regions.set(
      region.id,
      region,
    );

  }

  unregister(
    id: string,
  ): void {

    this.regions.delete(
      id,
    );

  }

  get(
    id: string,
  ): LayoutRegion | undefined {

    return this.regions.get(
      id,
    );

  }

  getAll():
    LayoutRegion[] {

    return Array.from(
      this.regions.values(),
    );

  }

  show(
    id: string,
  ): void {

    const region =
      this.regions.get(id);

    if (!region)
      return;

    region.visible = true;

  }

  hide(
    id: string,
  ): void {

    const region =
      this.regions.get(id);

    if (!region)
      return;

    region.visible = false;

  }

  move(

    id: string,

    x: number,

    y: number,

  ): void {

    const region =
      this.regions.get(id);

    if (!region)
      return;

    region.x = x;

    region.y = y;

  }

  resize(

    id: string,

    width: number,

    height: number,

  ): void {

    const region =
      this.regions.get(id);

    if (!region)
      return;

    region.width = width;

    region.height = height;

  }

  clear(): void {

    this.regions.clear();

  }

}