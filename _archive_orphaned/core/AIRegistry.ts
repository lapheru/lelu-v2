/**
 * ==========================================================
 * LÉLU
 * AI REGISTRY
 * ==========================================================
 */

export interface AIService {

  readonly id: string;

}

export default class AIRegistry {

  private readonly services =
    new Map<string, AIService>();

  register(
    service: AIService,
  ): void {

    this.services.set(
      service.id,
      service,
    );

  }

  get(
    id: string,
  ) {

    return this.services.get(id);

  }

  getAll() {

    return Array.from(
      this.services.values(),
    );

  }

}