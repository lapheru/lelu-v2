/**
 * ==========================================================
 * LÉLU
 * CAPABILITY REGISTRY
 * ==========================================================
 */

export interface Capability {

  id:
    string;

  name:
    string;

  description:
    string;

  category:
    string;

  version:
    string;

  enabled:
    boolean;

  tags:
    string[];

}

export default class CapabilityRegistry {

  private readonly capabilities =
    new Map<
      string,
      Capability
    >();

  public register(
    capability: Capability,
  ): void {

    this.capabilities.set(
      capability.id,
      capability,
    );

  }

  public unregister(
    id: string,
  ): void {

    this.capabilities.delete(
      id,
    );

  }

  public get(
    id: string,
  ): Capability | undefined {

    return this.capabilities.get(
      id,
    );

  }

  public all():
    Capability[] {

    return Array.from(
      this.capabilities.values(),
    );

  }

  public enabled():
    Capability[] {

    return this.all().filter(

      capability =>

        capability.enabled,

    );

  }

  public byCategory(
    category: string,
  ): Capability[] {

    return this.enabled().filter(

      capability =>

        capability.category ===
        category,

    );

  }

  public search(
    query: string,
  ): Capability[] {

    const value =
      query.toLowerCase();

    return this.enabled().filter(

      capability =>

        capability.name
          .toLowerCase()
          .includes(value)

        ||

        capability.description
          .toLowerCase()
          .includes(value)

        ||

        capability.tags.some(

          tag =>

            tag
              .toLowerCase()
              .includes(value),

        ),

    );

  }

  public has(
    id: string,
  ): boolean {

    return this.capabilities.has(
      id,
    );

  }

  public clear():
    void {

    this.capabilities.clear();

  }

}