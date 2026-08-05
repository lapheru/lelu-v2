/**
 * ==========================================================
 * LÉLU
 * ORCHESTRATOR V2
 * ==========================================================
 */

import Brain
  from "../brain/Brain";

import AttentionEngine
  from "./AttentionEngine";

import Blackboard
  from "./Blackboard";

import ContextEngine
  from "./ContextEngine";

import WorkingMemory
  from "./WorkingMemory";

import KnowledgeGraph
  from "./KnowledgeGraph";

import PredictionEngine
  from "./PredictionEngine";

import DecisionEngine
  from "./DecisionEngine";

import SkillEngine
  from "./SkillEngine";

import DecisionExecutor
  from "./DecisionExecutor";

import ReflectionEngine
  from "./ReflectionEngine";

import GoalEngine
  from "./GoalEngine";

import TaskPlanner
  from "./TaskPlanner";

import EventBus
  from "./EventBus";

import Scheduler
  from "./Scheduler";

import CognitiveState
  from "./CognitiveState";

import type {
  AIRequest,
  AIResponse,
} from "../providers/AIProvider";

export default class Orchestrator {

  constructor(

    private readonly attention:
      AttentionEngine,

    private readonly workingMemory:
      WorkingMemory,

    private readonly context:
      ContextEngine,

    private readonly knowledge:
      KnowledgeGraph,

    private readonly brain:
      Brain,

    private readonly prediction:
      PredictionEngine,

    private readonly decisions:
      DecisionEngine,

    private readonly skills:
      SkillEngine,

    private readonly executor:
      DecisionExecutor,

    private readonly reflection:
      ReflectionEngine,

    private readonly goals:
      GoalEngine,

    private readonly planner:
      TaskPlanner,

    private readonly blackboard:
      Blackboard,

    private readonly events:
      EventBus,

    private readonly scheduler:
      Scheduler,

    private readonly state:
      CognitiveState,

  ) {
    void this.knowledge;
    void this.skills;
    void this.goals;
    void this.planner;
  }

  /**
   * Main cognitive loop.
   */
  public async process(

    request:
      AIRequest,

  ): Promise<AIResponse> {

    //
    // LISTEN
    //

    this.state.enter(
      "listening",
      "Received request",
    );

    this.context.prune();

    this.attention.focus({

      id: "user",

      source: "user",

      value: request.prompt,

      priority: 100,

      confidence: 1,

      timestamp: Date.now(),

    });

    this.workingMemory.set({

      id: "current-prompt",

      value: request.prompt,

      priority: 100,

      createdAt: Date.now(),

      updatedAt: Date.now(),

    });

    await this.events.emit(

      "request.received",

      request,

    );

    //
    // THINK
    //

    this.state.enter(
      "thinking",
      "Reasoning",
    );

    const decision =

      await this.decisions.decide(
        request.prompt,
      );

    await this.events.emit(

      "decision.created",

      decision,

    );

    //
    // EXECUTE
    //

    this.state.enter(
      "executing",
      "Executing response",
    );

    const response =

      await this.executor.execute(

        request,

        decision,

      );

    //
    // LEARN
    //

    this.state.enter(
      "learning",
      "Learning",
    );

    this.brain.learn(

      request.prompt,

      response.text,

    );

    await this.events.emit(

      "brain.learned",

      {

        prompt:
          request.prompt,

        response:
          response.text,

      },

    );

    //
    // REFLECT
    //

    this.state.enter(
      "reflecting",
      "Reflection",

    );

    this.reflection.reflect(

      request.prompt,

      response.text,

    );

    //
    // BLACKBOARD
    //

    this.blackboard.publish({

      id:

`response-${Date.now()}`,

      category:
        "response",

      value:
        response,

      confidence:
        1,

      source:
        "orchestrator",

      createdAt:
        Date.now(),

      updatedAt:
        Date.now(),

    });

    //
    // PREDICTION
    //

    this.prediction.add({

      id:

`prediction-${Date.now()}`,

      description:

"Conversation continuation",

      confidence:
        0.5,

      source:
        "orchestrator",

      createdAt:
        Date.now(),

    });

    //
    // BACKGROUND
    //

    await this.scheduler.tick();

    await this.events.emit(

      "cycle.completed",

      response,

    );

    this.state.enter(

      "idle",

      "Waiting",

    );

    return response;

  }

}