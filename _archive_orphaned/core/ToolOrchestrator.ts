/**
 * ==========================================================
 * LÉLU
 * TOOL ORCHESTRATOR
 * ==========================================================
 */

export interface ToolRequest {

  tool:
    string;

  action:
    string;

  payload:
    unknown;

}

export interface ToolResult {

  success:
    boolean;

  data:
    unknown;

  error?:
    string;

}

export interface Tool {

  name:
    string;

  description:
    string;

  execute(
    request: ToolRequest,
  ): Promise<ToolResult>;

}

export default class ToolOrchestrator {

  private readonly tools =
    new Map<
      string,
      Tool
    >();

  public register(
    tool: Tool,
  ): void {

    this.tools.set(
      tool.name,
      tool,
    );

  }

  public unregister(
    name: string,
  ): void {

    this.tools.delete(
      name,
    );

  }

  public has(
    name: string,
  ): boolean {

    return this.tools.has(
      name,
    );

  }

  public async execute(

    request:
      ToolRequest,

  ): Promise<ToolResult> {

    const tool =

      this.tools.get(
        request.tool,
      );

    if (

      tool ===
      undefined

    ) {

      return {

        success:
          false,

        data:
          null,

        error:

          `Unknown tool: ${request.tool}`,

      };

    }

    return tool.execute(
      request,
    );

  }

  public list():
    Tool[] {

    return Array.from(
      this.tools.values(),
    );

  }

  public clear():
    void {

      this.tools.clear();

  }

}