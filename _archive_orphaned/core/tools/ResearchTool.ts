/**
 * ==========================================================
 * LÉLU
 * RESEARCH TOOL
 * ==========================================================
 */

import type {

  Tool,
  ToolResult,

} from "./ToolTypes";

export default class ResearchTool
  implements Tool {

  readonly name =
    "research";

  canHandle(
    input: string,
  ): boolean {

    const text =
      input.toLowerCase();

    return (

      text.includes("research") ||

      text.includes("study") ||

      text.includes("investigate") ||

      text.includes("learn") ||

      text.includes("analyze") ||

      text.includes("compare") ||

      text.includes("explain") ||

      text.includes("how")

    );

  }

  async execute(
    input: string,
  ): Promise<ToolResult> {

    const objectives = [

      "Understand the user's objective",

      "Collect supporting information",

      "Identify conflicting viewpoints",

      "Produce a concise summary",

      "Save findings for future research",

    ];

    return {

      success: true,

      tool: this.name,

      content:

`RESEARCH CONTEXT

Topic:
${input}

Objectives:
${objectives.map(
  (item, index) =>
    `${index + 1}. ${item}`,
).join("\n")}

Status:
Research session started.`,

      metadata: {

        active: true,

        timestamp:
          Date.now(),

      },

    };

  }

}