/**
 * ==========================================================
 * LÉLU
 * AGENT REGISTRY
 * ==========================================================
 */

import type {
  AIRequest,
  AIResponse,
} from "../providers/AIProvider";

export interface Agent {

  id:
    string;

  name:
    string;

  description:
    string;

  priority:
    number;

  enabled:
    boolean;

  canHandle(
    request: AIRequest,
  ): boolean;

  execute(
    request: AIRequest,
  ): Promise<AIResponse>;

}

export default class AgentRegistry {

  private readonly agents =
    new Map<
      string,
      Agent
    >();

  public register(
    agent: Agent,
  ): void {

    this.agents.set(
      agent.id,
      agent,
    );

  }

  public unregister(
    id: string,
  ): void {

    this.agents.delete(
      id,
    );

  }

  public get(
    id: string,
  ): Agent | undefined {

    return this.agents.get(
      id,
    );

  }

  public all():
    Agent[] {

    return Array

      .from(
        this.agents.values(),
      )

      .sort(

        (
          left,
          right,
        ) =>

          right.priority -
          left.priority,

      );

  }

  public available(
    request: AIRequest,
  ): Agent[] {

    return this.all()

      .filter(

        agent =>

          agent.enabled &&

          agent.canHandle(
            request,
          ),

      );

  }

  public async execute(
    request: AIRequest,
  ): Promise<AIResponse | null> {

    const agent =

      this.available(
        request,
      )[0];

    if (

      agent ===
      undefined

    ) {

      return null;

    }

    return agent.execute(
      request,
    );

  }

  public clear():
    void {

    this.agents.clear();

  }

}