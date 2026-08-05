/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS PROVIDERS PANEL
 *
 * Phase 7 — makes provider routing visible.
 *
 * Reads AIService.getProviders(), which surfaces both provider
 * registries the pipeline actually routes through: AIRouter's
 * language-model providers (AIProviderRegistry) and the
 * research/knowledge providers AIRouter falls through to
 * (ProviderRegistry — Wikipedia, GitHub, arXiv, ...). Same
 * read-only, poll-on-an-interval approach as GenesisMemoryPanel.
 * ==========================================================
 */

import { useEffect, useState } from "react";
import { genesisTheme } from "./GenesisTheme";
import AIService from "../../../core/AIService";
import GenesisWindowFrame from "./GenesisWindowFrame";

const ai = AIService.getInstance();

interface AIProviderRow {
  name: string;
  priority: number;
  enabled: boolean;
  requiresApiKey: boolean;
  timeout: number;
}

interface KnowledgeProviderRow {
  name: string;
  category: string;
  priority: number;
  enabled: boolean;
  requiresApiKey: boolean;
  capabilities: readonly string[];
}

function StatusDot({ enabled }: { enabled: boolean }) {
  return (
    <span
      style={{
        width: 8,
        height: 8,
        borderRadius: 999,
        flexShrink: 0,
        background: enabled ? genesisTheme.status.ok : genesisTheme.status.idle,
        boxShadow: enabled ? `0 0 8px ${genesisTheme.status.ok}` : "none",
      }}
    />
  );
}

function ProviderRow({
  name,
  detail,
  enabled,
  requiresApiKey,
}: {
  name: string;
  detail: string;
  enabled: boolean;
  requiresApiKey: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 8,
        fontSize: 12,
        padding: "6px 8px",
        borderRadius: 10,
        background: "rgba(255,255,255,0.03)",
      }}
    >
      <span style={{ marginTop: 4 }}>
        <StatusDot enabled={enabled} />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
          <span style={{ fontWeight: 600 }}>{name}</span>
          {requiresApiKey ? (
            <span style={{ opacity: 0.55, whiteSpace: "nowrap", fontSize: 11 }}>needs API key</span>
          ) : null}
        </div>
        <div style={{ opacity: 0.6, marginTop: 2 }}>{detail}</div>
      </div>
    </div>
  );
}

interface GenesisProvidersPanelProps {
  onClose: () => void;
}

export default function GenesisProvidersPanel({ onClose }: GenesisProvidersPanelProps) {
  const [aiProviders, setAiProviders] = useState<AIProviderRow[]>([]);
  const [knowledgeProviders, setKnowledgeProviders] = useState<KnowledgeProviderRow[]>([]);

  useEffect(() => {
    function refresh() {
      const snapshot = ai.getProviders();
      setAiProviders(snapshot.ai);
      setKnowledgeProviders(snapshot.knowledge);
    }

    refresh();
    const interval = window.setInterval(refresh, 5000);
    return () => window.clearInterval(interval);
  }, []);

  const activeAi = aiProviders.filter((p) => p.enabled).length;
  const activeKnowledge = knowledgeProviders.filter((p) => p.enabled).length;

  return (
    <GenesisWindowFrame
      title={
        <>
          Providers · {activeAi + activeKnowledge}/{aiProviders.length + knowledgeProviders.length} active
        </>
      }
      onClose={onClose}
      width="min(92vw, 540px)"
    >
      <div style={genesisTheme.text.label}>Language / reasoning providers</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, margin: "8px 0 14px" }}>
        {aiProviders.length === 0 ? (
          <div style={{ fontSize: 12, opacity: 0.6 }}>No AI providers registered.</div>
        ) : (
          aiProviders
            .slice()
            .sort((a, b) => a.priority - b.priority)
            .map((provider) => (
              <ProviderRow
                key={provider.name}
                name={provider.name}
                detail={`priority ${provider.priority} · timeout ${provider.timeout}ms`}
                enabled={provider.enabled}
                requiresApiKey={provider.requiresApiKey}
              />
            ))
        )}
      </div>

      <div style={genesisTheme.text.label}>Research / knowledge providers</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
        {knowledgeProviders.length === 0 ? (
          <div style={{ fontSize: 12, opacity: 0.6 }}>No knowledge providers registered.</div>
        ) : (
          knowledgeProviders
            .slice()
            .sort((a, b) => a.priority - b.priority)
            .map((provider) => (
              <ProviderRow
                key={provider.name}
                name={provider.name}
                detail={`${provider.category} · ${provider.capabilities.join(", ") || "general"}`}
                enabled={provider.enabled}
                requiresApiKey={provider.requiresApiKey}
              />
            ))
        )}
      </div>
    </GenesisWindowFrame>
  );
}
