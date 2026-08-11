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

import { useEffect, useMemo, useState } from "react";
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
    engineRuntime,
    openPanel,
    focusWorkspace,
    selectDestination,
    addMessage,
    setThinking,
    notify,
    minimize,
    expand,
  } = useGenesis();

  /*
   * Live ONE-Core telemetry. Reads the single authoritative CoreVisualState
   * (the same object the surface material, emission, atmosphere and motes
   * consume every frame) on a light timer and prints the current engine
   * weights + color. This proves on screen that exactly one Genesis Core
   * exists and that it is morphing through its states in real time.
   */
  const [coreTelemetry, setCoreTelemetry] = useState<string>("core booting…");

  useEffect(() => {
    const id = window.setInterval(() => {
      const vs = engineRuntime?.getEngineBus().getVisualState();
      if (!vs) {
        setCoreTelemetry("core offline");
        return;
      }
      const weights = vs.stateWeights;
      setCoreTelemetry(
        `CORE 1 · t=${Math.round(vs.time)}s · #${vs.stateColor.getHexString()} · ` +
          `O${weights.ocean.toFixed(2)} P${weights.plasma.toFixed(2)} E${weights.electric.toFixed(2)} ` +
          `C${weights.crystal.toFixed(2)} H${weights.halo.toFixed(2)} B${weights.bio.toFixed(2)}`,
      );
    }, 500);
    return () => window.clearInterval(id);
  }, [engineRuntime]);

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
        {state.minimized ? (
          <button
            type="button"
            onClick={expand}
            title="Expand Genesis"
            aria-label="Expand Genesis"
            style={{
              pointerEvents: "auto",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: `rgba(8, 16, 38, ${0.72 + interfaceActivity * 0.12})`,
              border: `1px solid ${evolutionColor}${Math.round((0.24 + interfaceActivity * 0.32) * 255).toString(16).padStart(2, "0")}`,
              borderRadius: genesisTheme.radius.pill,
              padding: "8px 14px",
              color: "white",
              backdropFilter: genesisTheme.glass.blurSoft,
              cursor: "pointer",
              boxShadow: genesisTheme.elevation.chrome.boxShadow,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: evolutionColor,
                boxShadow: `0 0 ${6 + pulse * 8}px ${evolutionColor}`,
                transform: `scale(${0.8 + pulse * 0.45})`,
              }}
            />
            <strong style={{ fontSize: 12 }}>Genesis</strong>
            <span style={{ opacity: 0.6, fontSize: 11 }}>＋</span>
          </button>
        ) : (
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
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span style={{ opacity: 0.75, fontSize: 12 }}>
                  {state.runtimeReady ? `Live · ${Math.round(pulse * 100)}% pulse` : "Booting"}
                </span>
                <button
                  type="button"
                  onClick={minimize}
                  title="Minimize Genesis"
                  aria-label="Minimize Genesis"
                  style={{
                    border: "1px solid rgba(255,255,255,0.16)",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.08)",
                    color: "white",
                    width: 22,
                    height: 22,
                    padding: 0,
                    fontSize: 13,
                    lineHeight: 1,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  –
                </button>
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
          <div
            style={{
              marginTop: 6,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 10,
              opacity: 0.62,
              letterSpacing: "0.02em",
            }}
          >
            {coreTelemetry}
          </div>
          </div>
        )}

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
