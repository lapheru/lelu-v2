/**
 * ==========================================================
 * LÉLU
 * ENGINEER SERVICE
 * ==========================================================
 */

import AIService from "../../core/AIService";

export interface EngineerReply {

  text:
    string;

  source:
    "ai" |
    "local";

}



export default class EngineerService {
  private readonly chat = AIService.getInstance();

  async answer(message: string): Promise<EngineerReply> {
    const normalized = message.trim();

    if (!normalized) {
      return {
        text: "I’m ready to help with architecture, debugging, or implementation.",
        source: "local",
      };
    }

    const sandboxResult = await this.runSandboxWorkflow(normalized);
    if (sandboxResult) {
      const reply = await this.chat.chat(`Use the sandbox result below to answer the user request.\nRequest: ${normalized}\nSandbox result:\n${sandboxResult}`);
      return {
        text: reply.text,
        source: "ai",
      };
    }

    const reply = await this.chat.chat(`You are Lélu acting as the engineering agent. Help with the request below in a practical, implementation-focused way.\n\n${normalized}`);

    return {
      text: reply.text,
      source: "ai",
    };
  }

  private async runSandboxWorkflow(message: string): Promise<string | null> {
    const lowered = message.toLowerCase();

    if (lowered.includes("build") || lowered.includes("test") || lowered.includes("verify") || lowered.includes("check")) {
      const response = await fetch("/api/engineer/command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: "npm run build" }),
      });
      const payload = await response.json();
      if (!payload?.ok) {
        return `Sandbox build check failed. ${payload?.error ?? payload?.stderr ?? "Unknown error."}`;
      }
      return `Sandbox build check completed.\n${payload.stdout}`;
    }

    if (lowered.includes("read") || lowered.includes("inspect") || lowered.includes("list") || lowered.includes("show")) {
      const response = await fetch("/api/engineer/command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: "pwd && echo '---' && ls -la && echo '---' && find src -maxdepth 2 -type f | sed -n '1,80p'" }),
      });
      const payload = await response.json();
      if (!payload?.ok) {
        return `Sandbox inspection failed. ${payload?.error ?? payload?.stderr ?? "Unknown error."}`;
      }
      return `Sandbox inspection completed.\n${payload.stdout}`;
    }

    return null;
  }
}