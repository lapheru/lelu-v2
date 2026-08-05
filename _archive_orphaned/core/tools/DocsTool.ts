/**
 * ==========================================================
 * LÉLU
 * DOCS TOOL
 * ==========================================================
 */

import type { Tool, ToolResult } from "./ToolTypes";

export default class DocsTool implements Tool {

  readonly name = "docs";

  canHandle(input: string): boolean {

    const text = input.toLowerCase();

    return (
      text.includes("docs") ||
      text.includes("documentation") ||
      text.includes("api") ||
      text.includes("manual")
    );

  }

  async execute(input: string): Promise<ToolResult> {

    return {
      success: true,
      tool: this.name,
      content: `Documentation Tool Activated\n\n${input}`,
      metadata: {
        timestamp: Date.now(),
      },
    };

  }

}