
/**
 * ==========================================================
 * LÉLU
 * PROJECT TOOL
 * ==========================================================
 */

import type { Tool, ToolResult } from "./ToolTypes";

export default class ProjectTool implements Tool {

  readonly name = "project";

  canHandle(input: string): boolean {

    const text = input.toLowerCase();

    return (
      text.includes("project") ||
      text.includes("milestone") ||
      text.includes("goal") ||
      text.includes("roadmap") ||
      text.includes("progress")
    );

  }

  async execute(input: string): Promise<ToolResult> {

    return {
      success: true,
      tool: this.name,
      content: `Project Manager Activated\n\n${input}`,
      metadata: {
        timestamp: Date.now(),
      },
    };

  }

}