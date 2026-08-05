/**
 * ==========================================================
 * LÉLU
 * RESOURCE MANAGER
 * ==========================================================
 */

export type ResourceType =

  | "memory"

  | "cpu"

  | "network"

  | "storage"

  | "provider"

  | "custom";

export interface Resource {

  id:
    string;

  type:
    ResourceType;

  name:
    string;

  available:
    boolean;

  capacity:
    number;

  usage:
    number;

  metadata:
    Record<
      string,
      unknown
    >;

}

export default class ResourceManager {

  private readonly resources =
    new Map<
      string,
      Resource
    >();

  /**
   * Register.
   */
  public register(
    resource: Resource,
  ): void {

    this.resources.set(
      resource.id,
      resource,
    );

  }

  /**
   * Lookup.
   */
  public get(
    id: string,
  ): Resource | undefined {

    return this.resources.get(
      id,
    );

  }

  /**
   * Available resources.
   */
  public available():
    Resource[] {

    return this.all()

      .filter(

        resource =>

          resource.available,

      );

  }

  /**
   * Update usage.
   */
  public updateUsage(

    id:
      string,

    usage:
      number,

  ): boolean {

    const resource =
      this.resources.get(
        id,
      );

    if (

      resource ===
      undefined

    ) {

      return false;

    }

    resource.usage =
      usage;

    return true;

  }

  /**
   * Utilization.
   */
  public utilization(
    id: string,
  ): number {

    const resource =
      this.resources.get(
        id,
      );

    if (

      resource ===
      undefined ||

      resource.capacity ===
      0

    ) {

      return 0;

    }

    return (

      resource.usage /

      resource.capacity

    );

  }

  /**
   * All resources.
   */
  public all():
    Resource[] {

    return Array.from(
      this.resources.values(),
    );

  }

  /**
   * Remove.
   */
  public remove(
    id: string,
  ): void {

    this.resources.delete(
      id,
    );

  }

  /**
   * Clear.
   */
  public clear():
    void {

    this.resources.clear();

  }

}