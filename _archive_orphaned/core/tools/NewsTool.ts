/**
 * ==========================================================
 * LÉLU
 * NEWS TOOL
 * ==========================================================
 */

import type {

  Tool,
  ToolResult,

} from "./ToolTypes";

export default class NewsTool
  implements Tool {

  readonly name =
    "news";

  canHandle(
    input: string,
  ): boolean {

    const text =
      input.toLowerCase();

    return (

      text.includes("news") ||

      text.includes("headline") ||

      text.includes("breaking") ||

      text.includes("update") ||

      text.includes("today") ||

      text.includes("world") ||

      text.includes("technology") ||

      text.includes("ai news") ||

      text.includes("current events")

    );

  }

  async execute(
    input: string,
  ): Promise<ToolResult> {

    return {

      success: true,

      tool: this.name,

      content:
`News Tool Activated

Topic:
${input}

Preparing headline search...
Preparing trusted news sources...
Preparing summary...
Preparing timeline of events...`,

      metadata: {

        category:
          "news",

        timestamp:
          Date.now(),

      },

    };

  }

}