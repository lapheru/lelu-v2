/**
 * ==========================================================
 * LÉLU
 * MEMORY TOOL
 * ==========================================================
 */

import type {

  Tool,
  ToolResult,

} from "./ToolTypes";

export default class MemoryTool
  implements Tool {

  readonly name =
    "memory";

  canHandle(
    input: string,
  ): boolean {

    const text =
      input.toLowerCase();

    return (

      text.includes("remember") ||

      text.includes("memory") ||

      text.includes("forgot") ||

      text.includes("recall") ||

      text.includes("what do you know")

    );

  }

  async execute(
    input: string,
  ): Promise<ToolResult> {

    return {

      success: true,

      tool: this.name,

      content:
`Memory Tool Activated

User Request:
${input}

Short-term and long-term memory integration will be connected here.`,

      metadata: {

        timestamp:
          Date.now(),

      },

    };

  }

}