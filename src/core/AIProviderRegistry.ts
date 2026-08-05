/**
 * ==========================================================
 * LÉLU
 * AI PROVIDER REGISTRY
 * ==========================================================
 */

import type AIProvider from "../providers/AIProvider";

const FAILURE_COOLDOWN_MS = 30_000;

interface ProviderFailure {
  count: number;
  lastFailure: number;
  reason: string;
}

export default class AIProviderRegistry {
  private readonly providers = new Map<string, AIProvider>();
  private readonly failures = new Map<string, ProviderFailure>();

  public register(provider: AIProvider): void {
    if (this.providers.has(provider.name)) {
      console.warn(
        `[AIProviderRegistry] "${provider.name}" already registered. Replacing.`,
      );
    }

    this.providers.set(provider.name, provider);
    this.failures.delete(provider.name);
  }

  public registerMany(providers: AIProvider[]): void {
    for (const provider of providers) {
      this.register(provider);
    }
  }

  public async initialize(): Promise<void> {
    for (const provider of this.providers.values()) {
      try {
        console.info(
          `[AIProviderRegistry] Initializing ${provider.name}...`,
        );
        await provider.initialize();
        console.info(
          `[AIProviderRegistry] ${provider.name} initialized.`,
        );
      } catch (error) {
        const reason = error instanceof Error ? error.message : String(error);
        this.markFailure(provider.name, reason);
        console.error(
          `[AIProviderRegistry] Failed to initialize ${provider.name}`,
          error,
        );
      }
    }
  }

  public async shutdown(): Promise<void> {
    for (const provider of this.providers.values()) {
      try {
        await provider.shutdown?.();
      } catch (error) {
        console.error(
          `[AIProviderRegistry] Failed to shutdown ${provider.name}`,
          error,
        );
      }
    }
  }

  public get(name: string): AIProvider | undefined {
    return this.providers.get(name);
  }

  public require(name: string): AIProvider {
    const provider = this.get(name);

    if (!provider) {
      throw new Error(`AI Provider "${name}" is not registered.`);
    }

    return provider;
  }

  public all(): AIProvider[] {
    return Array.from(this.providers.values()).sort(
      (a, b) => a.priority - b.priority,
    );
  }

  public enabled(): AIProvider[] {
    return this.all().filter((provider) => provider.enabled);
  }

  public async available(): Promise<AIProvider[]> {
    const available: AIProvider[] = [];
    const now = Date.now();

    for (const provider of this.enabled()) {
      const failure = this.failures.get(provider.name);

      if (failure && now - failure.lastFailure < FAILURE_COOLDOWN_MS) {
        console.info(
          `[AIProviderRegistry] Skipping ${provider.name} during failure cooldown.`,
          {
            retryInMs: FAILURE_COOLDOWN_MS - (now - failure.lastFailure),
            reason: failure.reason,
          },
        );
        continue;
      }

      if (failure) {
        this.failures.delete(provider.name);
      }

      try {
        if (await provider.isAvailable()) {
          available.push(provider);
        }
      } catch (error) {
        const reason = error instanceof Error ? error.message : String(error);
        this.markFailure(provider.name, reason);
        console.error(
          `[AIProviderRegistry] ${provider.name} availability check failed.`,
          error,
        );
      }
    }

    return available;
  }

  public markFailure(name: string, reason: string): void {
    const previous = this.failures.get(name);
    this.failures.set(name, {
      count: (previous?.count ?? 0) + 1,
      lastFailure: Date.now(),
      reason,
    });
  }

  public markSuccess(name: string): void {
    this.failures.delete(name);
  }

  public failure(name: string): ProviderFailure | undefined {
    return this.failures.get(name);
  }

  public names(): string[] {
    return this.all().map((provider) => provider.name);
  }

  public has(name: string): boolean {
    return this.providers.has(name);
  }

  public clear(): void {
    this.providers.clear();
    this.failures.clear();
  }

  public get size(): number {
    return this.providers.size;
  }
}
