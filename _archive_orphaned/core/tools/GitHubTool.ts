/**
 * ==========================================================
 * LÉLU
 * GITHUB TOOL
 * ==========================================================
 */

import type {

  Tool,
  ToolResult,

} from "./ToolTypes";

export default class GitHubTool
  implements Tool {

  readonly name =
    "github";

  canHandle(
    input: string,
  ): boolean {

    const text =
      input.toLowerCase();

    return (

      text.includes("github") ||

      text.includes("repository") ||

      text.includes("repo") ||

      text.includes("commit") ||

      text.includes("branch") ||

      text.includes("pull request") ||

      text.includes("issue") ||

      text.includes("copilot") ||

      text.includes("source code")

    );

  }

  async execute(
    input: string,
  ): Promise<ToolResult> {

    return {

      success: true,

      tool: this.name,

      content:
`GitHub Tool Activated

Repository Task:
${input}

Preparing repository analysis...
Preparing file inspection...
Preparing commit history...
Preparing code review...
Preparing project architecture summary...`,

      metadata: {

        provider:
          "GitHub",

        timestamp:
          Date.now(),

      },

    };

  }

}