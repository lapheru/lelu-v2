export interface ToolResult {

  success: boolean;

  tool: string;

  content: string;

  metadata?: Record<string, unknown>;

}

export interface Tool {

  readonly name: string;

  canHandle(
    input: string,
  ): boolean;

  execute(
    input: string,
  ): Promise<ToolResult>;

}