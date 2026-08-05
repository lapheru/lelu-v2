/**
 * ==========================================================
 * LÉLU
 * TOOL ROUTER
 * ==========================================================
 */

import type {

  Tool,
  ToolResult,

} from "./ToolTypes";

import MemoryTool from "./MemoryTool";
import ResearchTool from "./ResearchTool";
import EngineeringTool from "./EngineeringTool";
import InternetTool from "./InternetTool";
import NewsTool from "./NewsTool";
import GitHubTool from "./GitHubTool";
import DocsTool from "./DocsTool";
import ReflectionTool from "./ReflectionTool";
import ProjectTool from "./ProjectTool";

export default class ToolRouter {

  private readonly tools: Tool[] = [

    new MemoryTool(),
    new ResearchTool(),
    new EngineeringTool(),
    new InternetTool(),
    new NewsTool(),
    new GitHubTool(),
    new DocsTool(),
    new ReflectionTool(),
    new ProjectTool(),

  ];

  async buildContext(
    input: string,
  ): Promise<string> {

    const matches = this.tools.filter(

      tool => tool.canHandle(input),

    );

    if (matches.length === 0) {

      return "";

    }

    const results: ToolResult[] =

      await Promise.all(

        matches.map(

          tool =>

            tool.execute(input),

        ),

      );

    return results

      .filter(

        result => result.success,

      )

      .map(

        result =>

`### ${result.tool.toUpperCase()}

${result.content}`,

      )

      .join("\n\n");

  }

}