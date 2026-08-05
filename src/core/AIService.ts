/**
 * ==========================================================
 * LÉLU
 * AI SERVICE
 *
 * Final cognition learning loop
 *
 * Connects:
 * - AI Runtime
 * - Memory
 * - User profile
 * - Genesis actions
 * - Cognition updates
 * ==========================================================
 */

import AIRuntime from "./AIRuntime";
import MemoryBridge from "./MemoryBridge";
import UserManager from "./user/UserManager";
import type { AIRequest, AIResponse } from "../providers/AIProvider";
import type { ReasoningResult } from "./reasoning/ReasoningEngine";
import type { Plan } from "./planning/PlanningEngine";

export interface AIActionEvent {
  id: string;
  type: "browse" | "search" | "build" | "learn" | "create";
  label: string;
  status: "running" | "complete" | "error";
  timestamp: number;
}

export interface CognitionEvent {
  agents: unknown[];
  workspaces: unknown[];
  nodes: unknown[];
  reasoning?: ReasoningResult | null;
  plan?: Plan | null;
}

export interface AIMessageEvent {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: number;
  provider?: string;
  confidence?: number;
  reasoning?: ReasoningResult | null;
  plan?: Plan | null;
}

export default class AIService {
  private static instance: AIService | null = null;

  private readonly runtime: AIRuntime;
  private readonly user: UserManager;
  private readonly memory: MemoryBridge;

  private readonly actionListeners = new Set<(event: AIActionEvent) => void>();
  private readonly cognitionListeners = new Set<(state: CognitionEvent) => void>();
  private readonly messageListeners = new Set<(message: AIMessageEvent) => void>();
  private readonly thinkingListeners = new Set<(value: boolean) => void>();
  private readonly speakingListeners = new Set<(value: boolean) => void>();
  private readonly listeningListeners = new Set<(value: boolean) => void>();
  private readonly notificationListeners = new Set<(notification: { title: string; description?: string }) => void>();

  private initialized = false;

  private constructor() {
    this.runtime = new AIRuntime();
    this.user = new UserManager();
    this.memory = new MemoryBridge(this.runtime.brain, this.user);
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }

    return AIService.instance;
  }

  public subscribeActions(listener: (event: AIActionEvent) => void): () => void {
    this.actionListeners.add(listener);
    return () => {
      this.actionListeners.delete(listener);
    };
  }

  public subscribeCognition(listener: (state: CognitionEvent) => void): () => void {
    this.cognitionListeners.add(listener);
    return () => {
      this.cognitionListeners.delete(listener);
    };
  }

  public subscribeMessages(listener: (message: AIMessageEvent) => void): () => void {
    this.messageListeners.add(listener);
    return () => {
      this.messageListeners.delete(listener);
    };
  }

  public subscribeThinking(listener: (value: boolean) => void): () => void {
    this.thinkingListeners.add(listener);
    return () => {
      this.thinkingListeners.delete(listener);
    };
  }

  public subscribeSpeaking(listener: (value: boolean) => void): () => void {
    this.speakingListeners.add(listener);
    return () => {
      this.speakingListeners.delete(listener);
    };
  }

  public subscribeListening(listener: (value: boolean) => void): () => void {
    this.listeningListeners.add(listener);
    return () => {
      this.listeningListeners.delete(listener);
    };
  }

  public subscribeNotifications(listener: (notification: { title: string; description?: string }) => void): () => void {
    this.notificationListeners.add(listener);
    return () => {
      this.notificationListeners.delete(listener);
    };
  }

  private emitAction(type: AIActionEvent["type"], label: string, status: AIActionEvent["status"]): string {
    const event: AIActionEvent = {
      id: crypto.randomUUID(),
      type,
      label,
      status,
      timestamp: Date.now(),
    };

    for (const listener of this.actionListeners) {
      listener(event);
    }

    return event.id;
  }

  private emitCognition(cognition: CognitionEvent): void {
    for (const listener of this.cognitionListeners) {
      listener(cognition);
    }
  }

  private emitMessage(message: AIMessageEvent): void {
    for (const listener of this.messageListeners) {
      listener(message);
    }
  }

  private emitThinking(value: boolean): void {
    for (const listener of this.thinkingListeners) {
      listener(value);
    }
  }

  private emitSpeaking(value: boolean): void {
    for (const listener of this.speakingListeners) {
      listener(value);
    }
  }

  private emitListening(value: boolean): void {
    for (const listener of this.listeningListeners) {
      listener(value);
    }
  }

  private emitNotification(notification: { title: string; description?: string }): void {
    for (const listener of this.notificationListeners) {
      listener(notification);
    }
  }

  public async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      await this.runtime.initialize();
      await this.user.initialize();
      await this.runtime.brain.initialize();
      this.initialized = true;
    } catch (error) {
      this.emitNotification({
        title: "Lélu initialization failed",
        description: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  public async chat(prompt: string): Promise<AIResponse> {
    const message = prompt.trim();

    if (!message) {
      this.emitThinking(false);
      return {
        text: "I need something to think about.",
        provider: "brain",
        model: "empty-input",
        processingTime: 0,
        metadata: {
          intent: "idle",
          success: true,
        },
      };
    }

    if (!this.initialized) {
      await this.initialize();
    }

    this.emitThinking(true);
    this.emitSpeaking(true);
    this.emitListening(true);

    const actionId = this.emitAction("learn", `Processing ${message}`, "running");

    try {
      const request: AIRequest = {
        messages: [{ role: "user", content: message }],
        prompt: message,
        timestamp: Date.now(),
      };

      const enriched = await this.memory.enrich(request);
      const response = await this.runtime.process(enriched);

      const reasoning = (response.metadata?.reasoning as ReasoningResult | undefined) ?? null;
      const plan = (response.metadata?.plan as Plan | undefined) ?? null;

      this.emitAction("learn", "Response generated", "complete");
      this.emitMessage({
        id: crypto.randomUUID(),
        role: "assistant",
        text: response.text,
        timestamp: Date.now(),
        provider: response.provider,
        confidence: response.metadata?.confidence as number | undefined,
        reasoning,
        plan,
      });

      const responseSucceeded =
        response.provider !== "offline" &&
        response.metadata?.success !== false;

      if (responseSucceeded) {
        // Fold this request's Reasoning/Planning output into the live
        // cognitive state, so it's visible beyond the single response
        // object (Genesis's Reasoning/Planning panel reads it from here).
        this.runtime.brain.recordThinking(reasoning, plan);

        await this.memory.learn(message, response.text);
        await this.runtime.brain.getConversation().update(message);

        const memories = await this.runtime.brain.recall(message);
        for (const memory of memories) {
          await this.user.learn(memory.category, memory.response);
        }

        const cognition = this.runtime.brain.cognitiveState();
        this.emitCognition({
          agents: cognition.agents,
          workspaces: cognition.workspaces,
          nodes: cognition.nodes,
          reasoning: cognition.reasoning,
          plan: cognition.plan,
        });
      }

      return {
        ...response,
        metadata: {
          ...(response.metadata ?? {}),
          action: actionId,
          cognition: true,
          memory: true,
          profile: true,
        },
      };
    } catch (error) {
      this.emitAction("learn", "Response failed", "error");
      this.emitNotification({
        title: "Lélu Error",
        description: error instanceof Error ? error.message : String(error),
      });

      return {
        text: error instanceof Error ? error.message : "Unknown AI error.",
        provider: "error",
        model: "error",
        processingTime: 0,
        metadata: {
          intent: "error",
          success: false,
          error: error instanceof Error ? error.message : "Unknown AI error.",
        },
      };
    } finally {
      this.emitThinking(false);
      this.emitSpeaking(false);
      this.emitListening(false);
    }
  }

  /**
   * Read-only snapshot of stored long-term memories, newest
   * first, for the Memory panel. Safe to poll — it never
   * mutates state and never throws.
   */
  public async getMemories(limit = 200): Promise<
    { id: string; category: string; prompt: string; response: string; confidence: number; timestamp: number }[]
  > {
    if (!this.initialized) {
      return [];
    }

    try {
      const patterns = await this.runtime.brain.recallAll();
      return patterns
        .slice()
        .sort((a: any, b: any) => (b.updatedAt ?? b.timestamp ?? 0) - (a.updatedAt ?? a.timestamp ?? 0))
        .slice(0, limit)
        .map((pattern: any) => ({
          id: pattern.id,
          category: pattern.category ?? "general",
          prompt: pattern.prompt ?? "",
          response: pattern.response ?? "",
          confidence: pattern.confidence ?? 0,
          timestamp: pattern.updatedAt ?? pattern.timestamp ?? Date.now(),
        }));
    } catch (error) {
      console.error("[AIService] Failed to read memories", error);
      return [];
    }
  }

  /**
   * Read-only snapshot of every registered AI provider and
   * knowledge/research provider, for the Providers panel.
   */
  public getProviders(): {
    ai: ReturnType<AIRuntime["aiProviderList"]>;
    knowledge: ReturnType<AIRuntime["knowledgeProviderList"]>;
  } {
    return {
      ai: this.runtime.aiProviderList(),
      knowledge: this.runtime.knowledgeProviderList(),
    };
  }

  public async getProviderHealth() {
    return await this.runtime.aiProviderHealthList();
  }

  /**
   * Read-only execution trace of the request pipeline, for the
   * Logs panel — one entry per stage per request.
   */
  public getExecutionLogs() {
    return this.runtime.executionLogs();
  }

  public ready(): boolean {
    return this.runtime.isReady();
  }

  public async shutdown(): Promise<void> {
    if (!this.initialized) {
      return;
    }

    await this.runtime.shutdown();
    this.initialized = false;
  }
}
