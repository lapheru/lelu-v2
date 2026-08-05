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
 * time. Every panel stays in the same eager module graph as the
 * GenesisCore provider. This is intentional: these panels are
 * tightly coupled to the live Genesis context, and keeping them
 * together avoids context/runtime identity problems across
 * asynchronous chunks.
 * ==========================================================
 */

import { useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { useGenesis } from "./GenesisCore";
import GenesisDock from "./GenesisDock";
import GenesisCommandPalette from "./GenesisCommandPalette";
import GenesisNotificationCenter from "./GenesisNotificationCenter";
import GenesisWindowFrame from "./GenesisWindowFrame";
import { genesisTheme } from "./GenesisTheme";
import GenesisChat from "./GenesisChat";
import GenesisReasoningPanel from "./GenesisReasoningPanel";
import GenesisDiagnosticsPanel from "./GenesisDiagnosticsPanel";
import GenesisMemoryPanel from "./GenesisMemoryPanel";
import GenesisProvidersPanel from "./GenesisProvidersPanel";
import GenesisKnowledgePanel from "./GenesisKnowledgePanel";
import GenesisHistoryPanel from "./GenesisHistoryPanel";
import GenesisWorkspacesPanel from "./GenesisWorkspacesPanel";
import GenesisLogsPanel from "./GenesisLogsPanel";

export default function GenesisInterface() {
  const {
    state,
    universe,
    openPanel,
    focusWorkspace,
    selectDestination,
    addMessage,
    setThinking,
    notify,
  } = useGenesis();

  const workspaces = useMemo(() => state.cognition?.workspaces ?? [], [state.cognition?.workspaces]);
  const evolutionStage = Math.max(0, Math.min(1, universe.evolutionSystem.stage));
  const pulse = universe.pulse.heartbeat;
  const interfaceActivity = Math.max(
    0.12,
    Math.min(1, pulse * 0.45 + universe.evolutionSystem.emergence * 0.35 + universe.awareness * 0.2),
  );
  const evolutionColor = universe.evolutionSystem.colorShift > 0.72
    ? "#fbbf24"
    : universe.evolutionSystem.colorShift > 0.42
      ? "#a78bfa"
      : "#67e8f9";

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
            background: `rgba(8, 16, 38, ${0.72 + interfaceActivity * 0.12})`,
            border: `1px solid ${evolutionColor}${Math.round((0.24 + interfaceActivity * 0.32) * 255).toString(16).padStart(2, "0")}`,
            borderRadius: genesisTheme.radius.md,
            padding: "10px 14px",
            color: "white",
            backdropFilter: genesisTheme.glass.blurSoft,
            maxWidth: 280,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: workspaces.length ? 8 : 0 }}>
            <strong>Genesis</strong>
            <span style={{ opacity: 0.75, fontSize: 12 }}>
              {state.runtimeReady ? `Live · ${Math.round(pulse * 100)}% pulse` : "Booting"}
            </span>
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
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, fontSize: 10, opacity: 0.8 }}>
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: evolutionColor,
                boxShadow: `0 0 ${6 + pulse * 8}px ${evolutionColor}`,
                transform: `scale(${0.8 + pulse * 0.45})`,
                transition: "transform 100ms linear, box-shadow 100ms linear",
              }}
            />
            <span>Evolution {Math.round(evolutionStage * 100)}% · cycle {Math.floor(universe.age)}</span>
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
            <GenesisChat messages={state.messages} addMessage={addMessage} setThinking={setThinking} notify={notify} />
            <div style={{ fontSize: 12, opacity: 0.72, marginTop: 8 }}>
              {state.messages.length > 0 ? `${state.messages.length} messages preserved in Genesis` : "No messages yet"}
            </div>
          </GenesisWindowFrame>
        ) : null}

        {state.activePanel === "reasoning" ? (
          <GenesisReasoningPanel onClose={handleExitChat} />
        ) : null}

        {state.activePanel === "diagnostics" ? (
          <GenesisDiagnosticsPanel onClose={handleExitChat} />
        ) : null}

        {state.activePanel === "memory" ? (
          <GenesisMemoryPanel onClose={handleExitChat} />
        ) : null}

        {state.activePanel === "providers" ? (
          <GenesisProvidersPanel onClose={handleExitChat} />
        ) : null}

        {state.activePanel === "agents" ? (
          <GenesisKnowledgePanel onClose={handleExitChat} />
        ) : null}

        {state.activePanel === "history" ? (
          <GenesisHistoryPanel onClose={handleExitChat} />
        ) : null}

        {state.activePanel === "workspaces" ? (
          <GenesisWorkspacesPanel onClose={handleExitChat} />
        ) : null}

        {state.activePanel === "logs" ? (
          <GenesisLogsPanel onClose={handleExitChat} />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
