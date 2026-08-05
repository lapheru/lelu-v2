/**
 * ==========================================================
 * LÉLU
 * BRAIN
 *
 * Memory + Reflection + Cognition Core
 * ==========================================================
 */

import PatternMemory
  from "./PatternMemory";

import LearningEngine
  from "./LearningEngine";

import MemoryEngine
  from "./MemoryEngine";

import OfflineComposer
  from "./OfflineComposer";

import ConfidenceEngine
  from "./ConfidenceEngine";

import ReflectionEngine
  from "./ReflectionEngine";

import ConversationEngine
  from "./ConversationEngine";

import CognitionRuntime
  from "./CognitionRuntime";

import CognitiveCore
  from "../core/cognition/CognitiveCore";

import type ResponsePattern
  from "./ResponsePattern";

import type {
  Reflection,
} from "./ReflectionEngine";

import type {
  ReasoningResult,
} from "../core/reasoning/ReasoningEngine";

import type {
  Plan,
} from "../core/planning/PlanningEngine";





export default class Brain {


  private readonly memory:
    PatternMemory;



  private readonly learning:
    LearningEngine;



  private readonly memoryEngine:
    MemoryEngine;



  private readonly composer:
    OfflineComposer;



  private readonly confidence:
    ConfidenceEngine;



  private readonly reflection:
    ReflectionEngine;



  private readonly conversation:
    ConversationEngine;



  private readonly cognition:
    CognitiveCore;



  private readonly cognitionRuntime:
    CognitionRuntime;





  constructor() {


    this.memory =

      new PatternMemory();



    this.learning =

      new LearningEngine(

        this.memory,

      );



    this.memoryEngine =

      new MemoryEngine(

        this.learning,

        this.memory,

      );



    this.composer =

      new OfflineComposer(

        this.memory,

      );



    this.confidence =

      new ConfidenceEngine();



    this.reflection =

      new ReflectionEngine(

        this.memory,

      );



    this.cognition =

      new CognitiveCore();



    this.cognitionRuntime =

      new CognitionRuntime(

        this.cognition,

      );



    this.conversation =

      new ConversationEngine(

        this,

      );

  }





  /**
   * ==========================================================
   * Initialize
   * ==========================================================
   */
  public async initialize():

    Promise<void> {


    await this.memory.initialize();



    this.cognition.initialize();

  }





  /**
   * ==========================================================
   * Learn
   * ==========================================================
   */
  public async learn(

    prompt:
      string,


    response:
      string,


    intent =
      "general",


    keywords:
      string[] = [],


    context:
      Record<string, unknown> = {},

  ):
    Promise<ResponsePattern> {


    const memories =

      await this.memoryEngine.learn(

        prompt,

        response,

      );





    this.cognitionRuntime.observe(

      `${prompt}\n${response}`,

    );





    if (

      memories.length > 0

    ) {


      return memories[0];

    }





    return await this.learning.learn(

      prompt,

      response,

      intent,

      keywords,

      context,

    );

  }





  /**
   * ==========================================================
   * Recall
   * ==========================================================
   */
  public async recall(

    prompt:
      string,

  ):
    Promise<ResponsePattern[]> {


    return await this.memoryEngine.recall(

      prompt,

    );

  }





  /**
   * ==========================================================
   * Recall all
   * ==========================================================
   */
  public async recallAll():

    Promise<ResponsePattern[]> {


    await this.memory.initialize();



    return this.memory.getAll();

  }





  /**
   * ==========================================================
   * Compose
   * ==========================================================
   */
  public async compose(

    prompt:
      string,

  ):
    Promise<string> {


    return await this.composer.compose(

      prompt,

    );

  }





  /**
   * ==========================================================
   * Best memory
   * ==========================================================
   */
  public async best(

    prompt:
      string,

  ):
    Promise<ResponsePattern | undefined> {


    const patterns =

      await this.memory.search(

        prompt,

      );



    return this.confidence.best(

      patterns,

    );

  }





  /**
   * ==========================================================
   * Knows
   * ==========================================================
   */
  public async knows(

    prompt:
      string,

  ):
    Promise<boolean> {


    const memories =

      await this.memory.search(

        prompt,

      );



    return memories.length > 0;

  }





  /**
   * ==========================================================
   * Reflection
   * ==========================================================
   */
  public async reflect():

    Promise<Reflection> {


    return await this.reflection.reflect();

  }





  /**
   * ==========================================================
   * Conversation
   * ==========================================================
   */
  public getConversation():

    ConversationEngine {


    return this.conversation;

  }





  /**
   * ==========================================================
   * Cognition runtime
   * ==========================================================
   */
  public getCognitionRuntime():

    CognitionRuntime {


    return this.cognitionRuntime;

  }





  /**
   * ==========================================================
   * Cognition state
   * ==========================================================
   */
  public cognitiveState():

  {

    nodes:
      unknown[];


    connections:
      unknown[];


    agents:
      unknown[];


    workspaces:
      unknown[];


    reasoning:
      ReasoningResult | null;


    plan:
      Plan | null;

  } {


    return this.cognition.state();

  }



  /**
   * ==========================================================
   * Record Reasoning/Planning output
   *
   * Called after a request completes so the Reasoning and
   * Planning stage output (RouterContext.reasoning /
   * RouterContext.plan, already attached to
   * AIResponse.metadata by AIRouter) becomes part of the
   * live cognitive state instead of only living on the
   * one-off response object.
   * ==========================================================
   */
  public recordThinking(
    reasoning: ReasoningResult | null | undefined,
    plan: Plan | null | undefined,
  ): void {

    this.cognitionRuntime.think(reasoning, plan);
  }





  /**
   * ==========================================================
   * Suggestions
   * ==========================================================
   */
  public async suggestions(

    prompt:
      string,

  ):
    Promise<string[]> {


    return await this.composer.suggestions(

      prompt,

    );

  }





  /**
   * ==========================================================
   * Reset
   * ==========================================================
   */
  public async reset():

    Promise<void> {


    await this.memory.clear();

  }

}