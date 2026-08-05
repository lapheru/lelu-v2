/**
 * ==========================================================
 * LÉLU
 * REFLECTION TOOL
 * ==========================================================
 */

import type { Tool, ToolResult } from "./ToolTypes";

export default class ReflectionTool implements Tool {

  readonly name = "reflection";

  canHandle(input: string): boolean {

    const text = input.toLowerCase();

    return (
      text.includes("reflect") ||
      text.includes("perspective") ||
      text.includes("analyze me") ||
      text.includes("journal")
    );

  }

  async execute(input: string): Promise<ToolResult> {

    return {
      success: true,
      tool: this.name,
      content: `Reflection Started\n\n${input}`,
      metadata: {
        timestamp: Date.now(),
      },
    };

  }

}