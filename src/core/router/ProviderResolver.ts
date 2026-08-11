/**
 * ==========================================================
 * LÉLU
 * PROVIDER RESOLVER
 * ==========================================================
 *
 * Priority-ordered provider fallback. A provider failure is
 * recorded and quarantined briefly by the registry; the next
 * configured provider is attempted immediately.
 */

import type AIProvider from "../../providers/AIProvider";
import type { AIResponse } from "../../providers/AIProvider";
import type RouterContext from "./RouterContext";
import type { ProviderResult } from "./RouterResults";

export default class ProviderResolver {
  public async execute(context: RouterContext): Promise<ProviderResult> {
    const providers = await context.aiProviders.available();

    if (providers.length === 0) {
      context.logger.error(
        "ProviderResolver",
        "No AI providers are available.",
        {
          reason: "missing-credentials-or-provider-cooldown",
          registeredProviders: context.aiProviders.names(),
        },
      );

      return {
        handled: true,
        response: this.offline(context.started),
      };
    }

    for (const provider of providers) {
      if (!provider.canHandle(context.request.prompt)) {
        context.logger.info(
          "ProviderResolver",
          `${provider.name} cannot handle request.`,
          { provider: provider.name },
        );
        continue;
      }

      try {
        context.logger.info(
          "ProviderResolver",
          `Trying ${provider.name}`,
          {
            provider: provider.name,
            priority: provider.priority,
            promptLength: context.request.prompt.length,
            requestedModel: context.request.model,
          },
        );

        const response = await this.executeProvider(provider, context);
        context.aiProviders.markSuccess(
          provider.name,
          response.metadata?.usage,
        );

        context.logger.info(
          "ProviderResolver",
          `${provider.name} generated response`,
          {
            provider: response.provider,
            model: response.model,
            latencyMs: response.processingTime,
            responseLength: response.text.length,
            usage: response.metadata?.usage,
            finishReason: response.metadata?.finishReason,
            activeProvider: response.provider,
          },
        );

        return {
          handled: true,
          response,
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        context.aiProviders.markFailure(provider.name, message);

        context.logger.error(
          "ProviderResolver",
          `${provider.name} failed; falling back to the next provider.`,
          {
            provider: provider.name,
            priority: provider.priority,
            fallbackReason: message,
            latencyMs: Date.now() - context.started,
          },
        );
      }
    }

    context.logger.error(
      "ProviderResolver",
      "All available AI providers failed.",
      {
        attemptedProviders: providers.map((provider) => provider.name),
        fallbackReason: "provider-exhaustion",
      },
    );

    return {
      handled: true,
      response: this.offline(context.started),
    };
  }

  private async executeProvider(
    provider: AIProvider,
    context: RouterContext,
  ): Promise<AIResponse> {
    const started = Date.now();
    const response = await provider.generate(context.request);

    if (!response || typeof response.text !== "string") {
      throw new Error(`${provider.name} returned an invalid response.`);
    }

    const text = response.text.trim();

    if (!text) {
      throw new Error(`${provider.name} returned empty response text.`);
    }

    return {
      ...response,
      text,
      provider: response.provider || provider.name,
      model: response.model || context.request.model || "unknown",
      processingTime:
        response.processingTime > 0
          ? response.processingTime
          : Date.now() - started,
      metadata: {
        ...response.metadata,
        providerPriority: provider.priority,
      },
    };
  }

  private offline(started: number): AIResponse {
    return {
      text:
        "I'm in offline mode right now — all AI providers are unreachable or unconfigured, so I can't generate new answers. My local memory, your profile and our shared history are still here and I'm still recording this conversation locally. Try asking \"who are you\", \"who am I\", or about something we've discussed.",
      provider: "offline",
      model: "offline",
      processingTime: Date.now() - started,
      metadata: {
        success: false,
        reason: "all-ai-providers-failed",
        offline: true,
        identity: true,
        memory: true,
      },
    };
  }
}
