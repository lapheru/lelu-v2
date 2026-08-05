/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS INTERFACE
 *
 * Phase 7 — the panel router for the AI OS.
 *
 * GenesisDock is the single navigation surface (see
 * GenesisDock.tsx); this component owns layout, the floating
 * status/quick-jump card, and mounting exactly one panel at a
 * time. Every panel below is lazy-loaded, so opening "Memory"
 * for the first time is the only moment its code downloads —
 * consistent with GenesisChat's existing lazy-load pattern,
 * now applied to every panel instead of just chat.
 * ==========================================================
 */

import { lazy, Suspense, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { useGenesis } from "./GenesisCore";
import GenesisDock from "./GenesisDock";
import GenesisCommandPalette from "./GenesisCommandPalette";
import GenesisNotificationCenter from "./GenesisNotificationCenter";
import GenesisWindowFrame from "./GenesisWindowFrame";
import { genesisTheme } from "./GenesisTheme";

const GenesisChat = lazy(() => import("./GenesisChat"));
const GenesisReasoningPanel = lazy(() => import("./GenesisReasoningPanel"));
const GenesisDiagnosticsPanel = lazy(() => import("./GenesisDiagnosticsPanel"));
const GenesisMemoryPanel = lazy(() => import("./GenesisMemoryPanel"));
const GenesisProvidersPanel = lazy(() => import("./GenesisProvidersPanel"));
const GenesisKnowledgePanel = lazy(() => import("./GenesisKnowledgePanel"));
const GenesisHistoryPanel = lazy(() => import("./GenesisHistoryPanel"));
const GenesisWorkspacesPanel = lazy(() => import("./GenesisWorkspacesPanel"));
const GenesisLogsPanel = lazy(() => import("./GenesisLogsPanel"));

function PanelFallback({ label }: { label: string }) {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        bottom: 24,
        transform: "translateX(-50%)",
        pointerEvents: "auto",
        background: genesisTheme.glass.panel,
        border: genesisTheme.glass.borderAccent,
        borderRadius: genesisTheme.radius.lg,
        padding: 16,
        color: "white",
        boxShadow: genesisTheme.glass.shadow,
        backdropFilter: genesisTheme.glass.blur,
        fontSize: 12,
        opacity: 0.75,
      }}
    >
      Loading {label}…
    </div>
  );
}

export default function GenesisInterface() {
  const {
    state,
    openPanel,
    focusWorkspace,
    selectDestination,
    addMessage,
    setThinking,
    notify,
  } = useGenesis();

  const workspaces = useMemo(() => state.cognition?.workspaces ?? [], [state.cognition?.workspaces]);

  function handleWorkspace(id: string, name: string, index: number) {
    focusWorkspace(id);
    selectDestination({
      id,
      type: "workspace",
      name,
      position: { x: index * 3 - 3, y: 0, z: -5 },
    });
  }

  function handleExitChat() {
    openPanel("none");
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 20,
      }}
    >
      <GenesisDock
        activePanel={state.activePanel}
        onSelect={openPanel}
        online={state.runtimeReady}
        thinking={state.thinking}
        speaking={state.speaking}
        reasoningActive={Boolean(state.cognition?.reasoning)}
        engineErrorCount={state.engineStatuses.filter((engine) => Boolean(engine.error)).length}
      />

      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          right: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 10,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            pointerEvents: "auto",
            background: genesisTheme.glass.chip,
            border: genesisTheme.glass.borderSoft,
            borderRadius: genesisTheme.radius.md,
            padding: "10px 14px",
            color: "white",
            backdropFilter: genesisTheme.glass.blurSoft,
            maxWidth: 280,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: workspaces.length ? 8 : 0 }}>
            <strong>Genesis</strong>
            <span style={{ opacity: 0.75, fontSize: 12 }}>{state.runtimeReady ? "Live" : "Booting"}</span>
          </div>

          {workspaces.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
              {workspaces.map((workspace: any, index: number) => (
                <button
                  key={workspace.id ?? index}
                  type="button"
                  onClick={() => handleWorkspace(workspace.id ?? String(index), workspace.name ?? "Workspace", index)}
                  style={{
                    border: state.activeWorkspace === (workspace.id ?? String(index)) ? genesisTheme.glass.borderAccent : genesisTheme.glass.borderSoft,
                    borderRadius: genesisTheme.radius.pill,
                    background: state.activeWorkspace === (workspace.id ?? String(index)) ? "rgba(34, 211, 238, 0.16)" : "rgba(255,255,255,0.04)",
                    color: "white",
                    padding: "4px 10px",
                    fontSize: 11,
                    cursor: "pointer",
                  }}
                >
                  {workspace.name ?? "Workspace"}
                </button>
              ))}
            </div>
          ) : null}

          <div style={{ opacity: 0.65, fontSize: 11 }}>
            {state.activeDestination ? `At: ${state.activeDestination}` : "No active destination"}
          </div>
        </div>

        <div style={{ pointerEvents: "auto" }}>
          <GenesisCommandPalette />
        </div>
      </div>

      <GenesisNotificationCenter />

      <AnimatePresence mode="wait">
        {state.activePanel === "chat" ? (
          <GenesisWindowFrame
            motionKey="chat"
            title="Lélu interface"
            onClose={handleExitChat}
            width="min(92vw, 500px)"
            elevation="focus"
            background={genesisTheme.glass.panelAlt}
            overflow="hidden"
            beforeHeader={
              <div
                style={{
                  position: "absolute",
                  inset: "auto 50% 100% auto",
                  width: 140,
                  height: 2,
                  left: "50%",
                  top: -10,
                  transform: "translateX(-50%)",
                  background: "linear-gradient(90deg, transparent, rgba(125, 211, 252, 0.94), transparent)",
                  boxShadow: "0 0 18px rgba(125, 211, 252, 0.8)",
                }}
              />
            }
          >
            <Suspense fallback={<PanelFallback label="chat" />}>
              <GenesisChat messages={state.messages} addMessage={addMessage} setThinking={setThinking} notify={notify} />
            </Suspense>
            <div style={{ fontSize: 12, opacity: 0.72, marginTop: 8 }}>
              {state.messages.length > 0 ? `${state.messages.length} messages preserved in Genesis` : "No messages yet"}
            </div>
          </GenesisWindowFrame>
        ) : null}

        {state.activePanel === "reasoning" ? (
          <Suspense key="reasoning" fallback={<PanelFallback label="reasoning" />}>
            <GenesisReasoningPanel onClose={handleExitChat} />
          </Suspense>
        ) : null}

        {state.activePanel === "diagnostics" ? (
          <Suspense key="diagnostics" fallback={<PanelFallback label="engine diagnostics" />}>
            <GenesisDiagnosticsPanel onClose={handleExitChat} />
          </Suspense>
        ) : null}

        {state.activePanel === "memory" ? (
          <Suspense key="memory" fallback={<PanelFallback label="memory" />}>
            <GenesisMemoryPanel onClose={handleExitChat} />
          </Suspense>
        ) : null}

        {state.activePanel === "providers" ? (
          <Suspense key="providers" fallback={<PanelFallback label="providers" />}>
            <GenesisProvidersPanel onClose={handleExitChat} />
          </Suspense>
        ) : null}

        {state.activePanel === "agents" ? (
          <Suspense key="agents" fallback={<PanelFallback label="knowledge" />}>
            <GenesisKnowledgePanel onClose={handleExitChat} />
          </Suspense>
        ) : null}

        {state.activePanel === "history" ? (
          <Suspense key="history" fallback={<PanelFallback label="history" />}>
            <GenesisHistoryPanel onClose={handleExitChat} />
          </Suspense>
        ) : null}

        {state.activePanel === "workspaces" ? (
          <Suspense key="workspaces" fallback={<PanelFallback label="workspaces" />}>
            <GenesisWorkspacesPanel onClose={handleExitChat} />
          </Suspense>
        ) : null}

        {state.activePanel === "logs" ? (
          <Suspense key="logs" fallback={<PanelFallback label="logs" />}>
            <GenesisLogsPanel onClose={handleExitChat} />
          </Suspense>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
