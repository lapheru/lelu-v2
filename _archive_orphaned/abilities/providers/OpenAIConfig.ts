import OpenAI from "openai";

export const OPENAI_MODEL =
  import.meta.env.VITE_OPENAI_MODEL?.trim() ?? "gpt-4o-mini";

export function createOpenAIClient(): OpenAI | null {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY?.trim();

  if (!apiKey) {
    return null;
  }

  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  });
}
