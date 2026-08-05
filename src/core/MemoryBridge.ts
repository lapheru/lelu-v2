/**
 * ==========================================================
 * LÉLU
 * MEMORY BRIDGE
 *
 * Connects memory + cognition + user model
 * ==========================================================
 */

import type Brain
  from "../brain/Brain";

import type UserManager
  from "./user/UserManager";

import type {
  AIRequest,
} from "../providers/AIProvider";





export default class MemoryBridge {


  constructor(

    private readonly brain:
      Brain,


    private readonly user:
      UserManager,

  ) {}





  /**
   * ==========================================================
   * Inject cognition context
   * ==========================================================
   */
  public async enrich(

    request:
      AIRequest,

  ):
    Promise<AIRequest> {


    const memories =

      await this.brain.recall(

        request.prompt,

      );





    const reflection =

      await this.brain.reflect();





    const conversation =

      this.brain

        .getConversation()

        .context();





    const cognition =

      this.brain

        .cognitiveState();





    const profile =

      this.user.context();





    const context =

      this.buildContext(

        profile,

        memories,

        reflection,

        conversation,

        cognition,

      );





    if (

      context.trim().length === 0

    ) {


      return request;

    }





    return {


      ...request,


      context,



      messages:

      [

        ...(request.messages ?? []),



        {

          role:

            "system",



          content:
`You are Lélu.

You have an evolving memory and cognition model.

Rules:

- Memories are stored facts.
- Cognition is a working model.
- Never invent personal information.
- Use context naturally.
- Continue ongoing projects.

${context}`,

        },

      ],

    };

  }





  /**
   * ==========================================================
   * Build context
   * ==========================================================
   */
  private buildContext(

    profile:
      string,


    memories:
      any[],


    reflection:
      any,


    conversation:
      any,


    cognition:
      any,

  ):
    string {


    const sections:

      string[] = [];





    if (

      profile

    ) {


      sections.push(

`## User Model

${profile}`,

      );

    }





    if (

      memories.length

    ) {


      sections.push(

`## Memories

${this.formatMemories(

  memories,

)}`,

      );

    }





    if (

      reflection

    ) {


      sections.push(

`## Reflection

${this.formatReflection(

  reflection,

)}`,

      );

    }





    if (

      conversation?.lastTopic

    ) {


      sections.push(

`## Current Thread

Topic:
${conversation.lastTopic}`,

      );

    }





    if (

      cognition

    ) {


      sections.push(

`## Cognitive State

${this.formatCognition(

  cognition,

)}`,

      );

    }





    return sections.join(

      "\n\n",

    );

  }





  /**
   * ==========================================================
   * Format cognition
   * ==========================================================
   */
  private formatCognition(

    cognition:
      any,

  ):
    string {


    const output:

      string[] = [];





    if (

      cognition.agents?.length

    ) {


      output.push(

`Agents:

${cognition.agents

.map(

(agent:any) =>

`- ${agent.name}: ${agent.role}

Memories:
${agent.memories?.join(", ") || "None"}`,

)

.join("\n\n")}`,

      );

    }





    if (

      cognition.workspaces?.length

    ) {


      output.push(

`Workspaces:

${cognition.workspaces

.map(

(space:any) =>

"- " + space.name,

)

.join("\n")}`,

      );

    }





    if (

      cognition.nodes?.length

    ) {


      output.push(

`Knowledge Nodes:

${cognition.nodes

.slice(-10)

.map(

(node:any)=>

"- " + node.label,

)

.join("\n")}`,

      );

    }





    return output.join(

      "\n\n",

    );

  }





  /**
   * ==========================================================
   * Format memories
   * ==========================================================
   */
  private formatMemories(

    memories:
      any[],

  ):
    string {


    return memories

      .map(

        memory =>

`- ${memory.response}`,

      )

      .join(

        "\n",

      );

  }





  /**
   * ==========================================================
   * Format reflection
   * ==========================================================
   */
  private formatReflection(

    reflection:
      any,

  ):
    string {


    const output:

      string[] = [];





    if (

      reflection.summary

    ) {


      output.push(

        reflection.summary,

      );

    }





    if (

      reflection.priorities?.length

    ) {


      output.push(

`Priorities:

${reflection.priorities

.map(

(item:string)=>

"- " + item,

)

.join("\n")}`,

      );

    }





    return output.join(

      "\n\n",

    );

  }





  /**
   * ==========================================================
   * Learn conversation
   * ==========================================================
   */
  public async learn(

    prompt:
      string,


    response:
      string,

  ):
    Promise<void> {


    await this.brain.learn(

      prompt,

      response,

      "conversation",

      [],

      {

        source:

          "lelu-chat",

      },

    );

  }

}