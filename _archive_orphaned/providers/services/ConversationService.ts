/**
 * ==========================================================
 * LÉLU
 * CONVERSATION SERVICE
 * ==========================================================
 */

import ConversationEngine
  from "../../brain/ConversationEngine";

import Brain
  from "../../brain/Brain";



export default class ConversationService {


  constructor(

    private readonly conversation:
      ConversationEngine,


    private readonly brain:
      Brain,

  ) {}





  /**
   * ==========================================================
   * Create new conversation starter
   * ==========================================================
   */
  public async start():

    Promise<string> {


    const starters =

      await this.conversation.starters();



    if (

      starters.length === 0

    ) {


      return (

        "What would you like to explore today?"

      );

    }



    const index =

      Math.floor(

        Math.random() *

        starters.length,

      );



    return starters[index];

  }





  /**
   * ==========================================================
   * Continue previous conversation
   * ==========================================================
   */
  public async continue():

    Promise<string> {


    const state =

      this.conversation.context();



    if (

      !state.lastTopic

    ) {


      return await this.start();

    }



    const memories =

      await this.brain.recall(

        state.lastTopic,

      );



    if (

      memories.length === 0

    ) {


      return (

        `We were talking about ${state.lastTopic}. How has that been going?`

      );

    }



    const memory =

      memories[0];



    return (

      `I remember we were discussing ${state.lastTopic}. ${memory.response} How is that going now?`

    );

  }





  /**
   * ==========================================================
   * Get current conversation state
   * ==========================================================
   */
  public state() {


    return this.conversation.context();

  }

}