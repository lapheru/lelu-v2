/**
 * ==========================================================
 * LÉLU
 * AI PROVIDER REGISTRY
 * ==========================================================
 */

import type AIProvider
  from "../providers/AIProvider";

export default class AIProviderRegistry {

  private readonly providers =
    new Map<string, AIProvider>();

  public register(
    provider: AIProvider,
  ): void {

    if (
      this.providers.has(
        provider.name,
      )
    ) {

      console.warn(
        `[AIProviderRegistry] "${provider.name}" already registered. Replacing.`,
      );

    }

    this.providers.set(
      provider.name,
      provider,
    );

  }

  public registerMany(
    providers: AIProvider[],
  ): void {

    for (
      const provider of providers
    ) {

      this.register(
        provider,
      );

    }

  }

  public async initialize():
    Promise<void> {

    for (
      const provider of this.providers.values()
    ) {

      try {

        console.info(
          `[AIProviderRegistry] Initializing ${provider.name}...`,
        );

        await provider.initialize();

        console.info(
          `[AIProviderRegistry] ${provider.name} initialized.`,
        );

      }

      catch (error) {

        console.error(
          `[AIProviderRegistry] Failed to initialize ${provider.name}`,
          error,
        );

      }

    }

  }

  public async shutdown():
    Promise<void> {

    for (
      const provider of this.providers.values()
    ) {

      try {

        await provider.shutdown?.();

      }

      catch (error) {

        console.error(
          `[AIProviderRegistry] Failed to shutdown ${provider.name}`,
          error,
        );

      }

    }

  }

  public get(
    name: string,
  ):
    AIProvider | undefined {

    return this.providers.get(
      name,
    );

  }

  public require(
    name: string,
  ):
    AIProvider {

    const provider =
      this.get(
        name,
      );

    if (!provider) {

      throw new Error(
        `AI Provider "${name}" is not registered.`,
      );

    }

    return provider;

  }

  public all():
    AIProvider[] {

    return Array.from(
      this.providers.values(),
    ).sort(

      (
        a,
        b,
      ) =>

        a.priority -
        b.priority,

    );

  }

  public enabled():
    AIProvider[] {

    return this.all()

      .filter(

        provider =>
          provider.enabled,

      );

  }

  public async available():
    Promise<AIProvider[]> {

    const available:
      AIProvider[] = [];

    for (
      const provider of this.enabled()
    ) {

      try {

        if (
          await provider.isAvailable()
        ) {

          available.push(
            provider,
          );

        }

      }

      catch (error) {

        console.error(
          `[AIProviderRegistry] ${provider.name} availability check failed.`,
          error,
        );

      }

    }

    return available;

  }

  public names():
    string[] {

    return this.all()

      .map(

        provider =>
          provider.name,

      );

  }

  public has(
    name: string,
  ):
    boolean {

    return this.providers.has(
      name,
    );

  }

  public clear():
    void {

    this.providers.clear();

  }

  public get size():
    number {

    return this.providers.size;

  }

}