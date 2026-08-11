/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS DOCK
 *
 * Phase 7 — the primary navigation surface for the AI OS.
 *
 * Replaces the flat, wrapping row of plain <button> elements
 * that used to live inline in GenesisInterface with a single
 * source of truth for "what panels exist and how do I open
 * them" — the same list now backs the visible dock AND
 * (in a later pass) the command palette, so the two can never
 * drift apart.
 *
 * Desktop: a vertical rail, pinned left, grouped by concern.
 * Narrow viewports (< 720px): collapses to a horizontal bar
 * pinned to the bottom, scrollable, so nothing clips on mobile.
 * Pure CSS media query via matchMedia — no new dependency.
 * ==========================================================
 */

import { useEffect, useState } from "react";
import type { GenesisPanel } from "./GenesisCore";
import { genesisTheme } from "./GenesisTheme";

export interface DockItem {
  id: GenesisPanel;
  label: string;
  glyph: string;
  group: "core" | "intelligence" | "system";
}

export const DOCK_ITEMS: DockItem[] = [
  { id: "chat", label: "Chat", glyph: "◎", group: "core" },
  { id: "history", label: "History", glyph: "≡", group: "core" },
  { id: "workspaces", label: "Workspaces", glyph: "▦", group: "core" },
  { id: "reasoning", label: "Reasoning", glyph: "✦", group: "intelligence" },
  { id: "agents", label: "Knowledge", glyph: "◈", group: "intelligence" },
  { id: "memory", label: "Memory", glyph: "◐", group: "intelligence" },
  { id: "providers", label: "API Status", glyph: "⌁", group: "system" },
  { id: "diagnostics", label: "Engines", glyph: "●", group: "system" },
  { id: "logs", label: "Logs", glyph: "▤", group: "system" },
];

function useIsNarrow() {
  const [narrow, setNarrow] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 720 : false,
  );

  useEffect(() => {
    const query = window.matchMedia("(max-width: 720px)");
    const listener = (event: MediaQueryListEvent) => setNarrow(event.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return narrow;
}

interface GenesisDockProps {
  activePanel: GenesisPanel;
  onSelect: (panel: GenesisPanel) => void;
  online: boolean;
  /**
   * Phase 11 — optional live signals (same source Phase 10 wired into
   * the 3D core: GenesisUIState). All optional and default to inert
   * so existing callers that don't pass them render exactly as before.
   */
  thinking?: boolean;
  speaking?: boolean;
  reasoningActive?: boolean;
  engineErrorCount?: number;
}

export default function GenesisDock({
  activePanel,
  onSelect,
  online,
  thinking = false,
  speaking = false,
  reasoningActive = false,
  engineErrorCount = 0,
}: GenesisDockProps) {
  const narrow = useIsNarrow();
  const hasErrors = engineErrorCount > 0;
  const isLive = thinking || speaking;

  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloadDone, setDownloadDone] = useState(false);

  const base = typeof import.meta.env.BASE_URL === "string" ? import.meta.env.BASE_URL : "/";
  const zipHref = `${base}lelu-project.zip`;

  const statusColor = hasErrors
    ? genesisTheme.status.error
    : isLive
      ? genesisTheme.status.accent
      : online
        ? genesisTheme.status.ok
        : genesisTheme.status.idle;

  const statusPulsing = !hasErrors && isLive;
  const statusTitle = hasErrors
    ? `${engineErrorCount} engine${engineErrorCount === 1 ? "" : "s"} reporting errors`
    : isLive
      ? speaking
        ? "Speaking"
        : "Thinking"
      : online
        ? "Live"
        : "Booting";

  function toggle(id: GenesisPanel) {
    onSelect(activePanel === id ? "none" : id);
  }

  function itemGlow(id: GenesisPanel): { border?: string; boxShadow?: string; className?: string } {
    if (id === "reasoning" && reasoningActive) {
      return {
        border: genesisTheme.glass.borderAccent,
        className: "genesis-signal-active",
      };
    }
    if (id === "diagnostics" && hasErrors) {
      return {
        border: `1px solid ${genesisTheme.status.error}`,
      };
    }
    return {};
  }

  async function handleZipDownload(event: { preventDefault(): void }) {
    const savePicker = (
      window as unknown as {
        showSaveFilePicker?: (opts?: unknown) => Promise<unknown>;
      }
    ).showSaveFilePicker;

    // Browsers without the File System Access API get the plain native
    // download of the linked file (anchor `download` attribute).
    if (typeof savePicker !== "function") return;

    event.preventDefault();
    setDownloading(true);
    setDownloadError(null);
    setDownloadDone(false);
    try {
      const response = await fetch(zipHref, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status} for ${zipHref}`);
      const blob = await response.blob();
      if (blob.size < 1000) throw new Error("Downloaded file looks empty");
      try {
        const handle = (await savePicker({
          suggestedName: "lelu-project.zip",
          types: [{ description: "ZIP archive", accept: { "application/zip": [".zip"] } }],
        })) as {
          createWritable: () => Promise<{
            write: (data: Blob) => Promise<void>;
            close: () => Promise<void>;
          }>;
        };
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        setDownloadDone(true);
      } catch (pickerError) {
        if ((pickerError as Error)?.name === "AbortError") return; // user cancelled
        throw pickerError;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setDownloadError(message);
      console.error("[GenesisDock] Project ZIP download failed:", error);
      // Last resort: open the served file in a new tab so the browser
      // handles it natively. Right-click → "Save link as…" always works.
      window.open(zipHref, "_blank", "noopener");
    } finally {
      setDownloading(false);
    }
  }

  if (narrow) {
    return (
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 25,
          pointerEvents: "auto",
          display: "flex",
          gap: 6,
          overflowX: "auto",
          padding: "10px 12px",
          background: "linear-gradient(0deg, rgba(2, 6, 23, 0.95), rgba(2, 6, 23, 0.75))",
          borderTop: genesisTheme.glass.borderSoft,
          backdropFilter: genesisTheme.glass.blurSoft,
        }}
      >
        {DOCK_ITEMS.map((item) => {
          const active = activePanel === item.id;
          const glow = itemGlow(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              className={glow.className}
              style={{
                flexShrink: 0,
                border: active ? genesisTheme.glass.borderAccent : glow.border ?? genesisTheme.glass.borderSoft,
                borderRadius: genesisTheme.radius.pill,
                background: active ? "rgba(34, 211, 238, 0.18)" : "rgba(255,255,255,0.05)",
                color: "white",
                padding: "6px 12px",
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                gap: 6,
                cursor: "pointer",
              }}
            >
              <span aria-hidden>{item.glyph}</span>
              {item.label}
            </button>
          );
        })}
        <a
          href={zipHref}
          download="lelu-project.zip"
          onClick={handleZipDownload}
          title={
            downloadError
              ? `Download blocked: ${downloadError} — right-click → "Save link as…"`
              : "Download project ZIP (right-click → “Save link as…” if no download starts)"
          }
          style={{
            flexShrink: 0,
            border: downloadError
              ? `1px solid ${genesisTheme.status.error}`
              : genesisTheme.glass.borderSoft,
            borderRadius: genesisTheme.radius.pill,
            background: downloading ? "rgba(34, 211, 238, 0.18)" : "rgba(255,255,255,0.05)",
            color: "white",
            padding: "6px 12px",
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          <span aria-hidden>{downloading ? "◌" : downloadDone ? "✓" : "⬇"}</span>
          {downloading ? "Preparing…" : downloadDone ? "Saved" : "ZIP"}
        </a>
      </div>
    );
  }

  const groups: DockItem["group"][] = ["core", "intelligence", "system"];

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: 16,
        transform: "translateY(-50%)",
        zIndex: 25,
        pointerEvents: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        padding: "14px 8px",
        background: genesisTheme.glass.chip,
        border: genesisTheme.glass.borderSoft,
        borderRadius: genesisTheme.radius.lg,
        backdropFilter: genesisTheme.glass.blurSoft,
        boxShadow: genesisTheme.glass.shadow,
      }}
    >
      <div
        title={statusTitle}
        className={statusPulsing ? "genesis-signal-active" : undefined}
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          alignSelf: "center",
          color: statusColor,
          background: statusColor,
          boxShadow: online || isLive ? `0 0 8px ${statusColor}` : "none",
        }}
      />

      {groups.map((group, groupIndex) => (
        <div key={group} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {groupIndex > 0 ? (
            <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "0 4px 4px" }} />
          ) : null}
          {DOCK_ITEMS.filter((item) => item.group === group).map((item) => {
            const active = activePanel === item.id;
            const glow = itemGlow(item.id);
            return (
              <button
                key={item.id}
                type="button"
                title={item.label}
                onClick={() => toggle(item.id)}
                className={glow.className}
                style={{
                  width: 40,
                  height: 40,
                  border: active ? genesisTheme.glass.borderAccent : glow.border ?? "1px solid transparent",
                  borderRadius: genesisTheme.radius.md,
                  background: active ? "rgba(34, 211, 238, 0.18)" : "transparent",
                  color: "white",
                  fontSize: 16,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.15s ease, border-color 0.15s ease",
                }}
              >
                <span aria-hidden>{item.glyph}</span>
              </button>
            );
          })}
        </div>
      ))}

      <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "4px 4px 0" }} />
      <a
        href={zipHref}
        download="lelu-project.zip"
        onClick={handleZipDownload}
        title={
          downloadError
            ? `Download blocked: ${downloadError} — right-click → "Save link as…"`
            : "Download project ZIP (right-click → “Save link as…” if no download starts)"
        }
        style={{
          width: 40,
          height: 40,
          border: downloadError ? `1px solid ${genesisTheme.status.error}` : "1px solid transparent",
          borderRadius: genesisTheme.radius.md,
          background: downloading ? "rgba(34, 211, 238, 0.12)" : "transparent",
          color: "white",
          fontSize: 16,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
          transition: "background 0.15s ease, border-color 0.15s ease",
        }}
      >
        <span aria-hidden>{downloading ? "◌" : downloadDone ? "✓" : "⬇"}</span>
      </a>
      {downloadError ? (
        <div
          style={{
            width: 128,
            fontSize: 10,
            lineHeight: 1.35,
            textAlign: "center",
            color: genesisTheme.status.error,
          }}
        >
          {downloadError}
        </div>
      ) : null}
    </div>
  );
}
