/**
 * ==========================================================
 * LÉLU
 * CONVERSATION ANALYZER
 * ==========================================================
 */

import MemoryEngine from "./MemoryEngine";
import MemoryCurator from "./MemoryCurator";

export default class ConversationAnalyzer {

  private readonly memory =
    new MemoryEngine();

  private readonly curator =
    new MemoryCurator();

  async analyze(

    user: string,

    reply: string,

  ): Promise<void> {

    await this.memory.initialize();

    const decisions =

      await this.curator.curate(

        user,

        reply,

      );

    for (

      const decision of decisions

    ) {

      if (

        !decision.remember

      ) {

        continue;

      }

      switch (

        decision.space

      ) {

        case "user":

          await this.memory.rememberUser(

            decision.title,

            decision.content,

            decision.tags,

            decision.importance,

          );

          break;

        case "lelu":

          await this.memory.rememberLelu(

            decision.title,

            decision.content,

            decision.tags,

            decision.importance,

          );

          break;

        case "shared":

          await this.memory.rememberShared(

            decision.title,

            decision.content,

            decision.tags,

            decision.importance,

          );

          break;

        case "log":

          await this.memory.rememberLog(

            decision.content,

          );

          break;

        case "reflection":

          await this.memory.rememberReflection(

            decision.content,

          );

          break;

        case "research":

          await this.memory.rememberShared(

            decision.title,

            decision.content,

            [

              ...decision.tags,

              "research",

            ],

            decision.importance,

          );

          break;

        case "project":

          await this.memory.rememberShared(

            decision.title,

            decision.content,

            [

              ...decision.tags,

              "project",

            ],

            decision.importance,

          );

          break;

      }

    }

  }

}