/**
 * ==========================================================
 * LÉLU
 * INTERNET TOOL
 * ==========================================================
 */

import type {

  Tool,
  ToolResult,

} from "./ToolTypes";

export default class InternetTool
  implements Tool {

  readonly name =
    "internet";

  canHandle(
    input: string,
  ): boolean {

    const text =
      input.toLowerCase();

    return (

      text.includes("search") ||

      text.includes("internet") ||

      text.includes("web") ||

      text.includes("online") ||

      text.includes("latest") ||

      text.includes("today") ||

      text.includes("current") ||

      text.includes("news") ||

      text.includes("research") ||

      text.includes("find")

    );

  }

  async execute(
    input: string,
  ): Promise<ToolResult> {

    return {

      success: true,

      tool: this.name,

      content:
`LIVE INTERNET REQUEST

Query:
${input}

InternetTool has accepted this request.

Next version:
• Search multiple providers
• Collect trusted sources
• Rank results
• Remove duplicates
• Pass verified context back to Lélu.`,

      metadata: {

        online: true,

        query: input,

        timestamp:
          Date.now(),

      },

    };

  }

}