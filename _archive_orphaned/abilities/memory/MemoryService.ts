export interface MemoryEntry {
  text: string;
  createdAt: string;
}

export interface MemorySnapshot {
  shortTerm: MemoryEntry[];
  longTerm: MemoryEntry[];
}

export default class MemoryService {
  private readonly shortKey = "lelu-short-term";
  private readonly longKey = "lelu-long-term";

  private shortTerm: MemoryEntry[] = [];
  private longTerm: MemoryEntry[] = [];

  constructor() {
    this.load();
  }

  recordExchange(userMessage: string, assistantReply: string): void {
    const shortEntry: MemoryEntry = {
      text: `You: ${userMessage} | Lélu: ${assistantReply}`,
      createdAt: new Date().toISOString(),
    };

    this.shortTerm = [...this.shortTerm.slice(-9), shortEntry];

    if (this.shouldPersistLongTerm(userMessage, assistantReply)) {
      this.longTerm = [...this.longTerm.slice(-19), shortEntry];
    }

    this.persist();
  }

  snapshot(): MemorySnapshot {
    return {
      shortTerm: this.shortTerm.slice(-6),
      longTerm: this.longTerm.slice(-6),
    };
  }

  clear(): void {
    this.shortTerm = [];
    this.longTerm = [];
    this.persist();
  }

  private shouldPersistLongTerm(userMessage: string, assistantReply: string): boolean {
    const combined = `${userMessage} ${assistantReply}`.toLowerCase();

    return /remember|important|note|save|plan|project/i.test(combined);
  }

  private load(): void {
    if (typeof window === "undefined") {
      return;
    }

    this.shortTerm = this.readArray(this.shortKey);
    this.longTerm = this.readArray(this.longKey);
  }

  private persist(): void {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(this.shortKey, JSON.stringify(this.shortTerm));
    window.localStorage.setItem(this.longKey, JSON.stringify(this.longTerm));
  }

  private readArray(key: string): MemoryEntry[] {
    if (typeof window === "undefined") {
      return [];
    }

    const raw = window.localStorage.getItem(key);

    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw) as MemoryEntry[];
      return Array.isArray(parsed) ? parsed : [];
    }
    catch {
      return [];
    }
  }
}
