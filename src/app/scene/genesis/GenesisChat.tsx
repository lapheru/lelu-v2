/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS CHAT
 *
 * Living chat interface.
 *
 * Connects:
 *
 * User
 *  ↓
 * AIService
 *  ↓
 * Brain / Memory
 *  ↓
 * GenesisCore
 *  ↓
 * Living Genesis
 *
 * ==========================================================
 */


import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import AIService from "../../../core/AIService";
import EngineerService from "../../../abilities/engineer/EngineerService";
import type { GenesisMessage } from "./GenesisCore";
import { genesisTheme } from "./GenesisTheme";

interface GenesisChatProps {
  messages?: GenesisMessage[];
  addMessage?: (message: { id: string; role: "user" | "assistant"; text: string; timestamp: number; source: "ai" | "local"; provider?: string; confidence?: number; reasoning?: unknown; plan?: unknown }) => void;
  setThinking?: (value: boolean) => void;
  notify?: (title: string, description?: string) => void;
}


const ai = AIService.getInstance();
const engineer = new EngineerService();

export default function GenesisChat({ messages = [], addMessage: addMessageProp, setThinking: setThinkingProp, notify: notifyProp }: GenesisChatProps) {


  const addMessage =
    addMessageProp ?? (() => undefined);

  const setThinking =
    setThinkingProp ?? (() => undefined);

  const notify =
    notifyProp ?? (() => undefined);





  const [

    input,

    setInput,

  ] = useState("");

  const [
    status,
    setStatus,
  ] = useState<"connecting" | "ready" | "error">("connecting");

  const [
    errorText,
    setErrorText,
  ] = useState("");

  const [
    isSending,
    setIsSending,
  ] = useState(false);

  const [expandedThinkingId, setExpandedThinkingId] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isSending]);

  useEffect(() => {
    let cancelled = false;

    async function probe() {
      try {
        await ai.initialize();
        if (!cancelled) {
          setStatus("ready");
          setErrorText("");
        }
      } catch (error) {
        if (!cancelled) {
          setStatus("error");
          setErrorText(error instanceof Error ? error.message : String(error));
        }
      }
    }

    void probe();

    return () => {
      cancelled = true;
    };
  }, []);

  const statusLabel = useMemo(() => {
    if (status === "ready") {
      return "Connected";
    }

    if (status === "error") {
      return "Disconnected";
    }

    return "Connecting";
  }, [status]);

  async function sendMessage() {


    const message =

      input.trim();





    if (!message) {


      return;

    }





    setInput("");
    setErrorText("");
    setIsSending(true);
    setStatus("connecting");



    addMessage({

      id:

        crypto.randomUUID(),


      role:

        "user",


      text:

        message,


      timestamp:

        Date.now(),


      source:

        "local",

    });





    setThinking(true);





    try {
      const isEngineeringTask = /\b(code|build|compile|test|debug|fix|implement|modify|edit|sandbox|engineer|workspace|task)\b/i.test(message);

      let assistantText = "";
      let assistantSource: "ai" | "local" = "ai";
      let provider: string | undefined;
      let confidence: number | undefined;
      let reasoning: unknown;
      let plan: unknown;

      if (isEngineeringTask) {
        const response = await engineer.answer(message);
        assistantText = response.text;
        assistantSource = response.source;
        provider = response.source === "ai" ? "github-models" : "local";
      } else {
        const response = await ai.chat(message);
        assistantText = response.text;
        provider = response.model ?? "github-models";
        confidence = (response as { metadata?: { confidence?: number } }).metadata?.confidence;
        reasoning = (response as { metadata?: { reasoning?: unknown } }).metadata?.reasoning;
        plan = (response as { metadata?: { plan?: unknown } }).metadata?.plan;
      }

      if (!assistantText || assistantText === "Lélu could not generate a response.") {
        throw new Error("The assistant returned an empty or failed response.");
      }

      setStatus("ready");

      addMessage({
        id: crypto.randomUUID(),
        role: "assistant",
        text: assistantText,
        timestamp: Date.now(),
        source: assistantSource,
        provider,
        confidence,
        reasoning,
        plan,
      });





    }

    catch(error) {

      const messageText = error instanceof Error ? error.message : String(error);

      setStatus("error");
      setErrorText(messageText);

      notify(

        "Lélu Error",

        messageText,

      );


    }

    finally {


      setThinking(false);
      setIsSending(false);


    }


  }





  return (

    <div

      className="genesis-chat"

      style={{

        display: "flex",

        flexDirection: "column",

        gap: 10,

      }}

    >


      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, opacity: 0.8 }}>
        <span>Assistant status: {statusLabel}</span>
        <span>{isSending ? "Sending…" : status === "ready" ? "Live • Sandbox ready" : status === "error" ? "Needs attention" : "Checking"}</span>
      </div>

      <div style={{ maxHeight: 260, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, paddingRight: 4 }}>
        {messages.length === 0 ? (
          <div style={{ fontSize: 12, opacity: 0.7, border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "8px 10px" }}>
            Start a conversation. The assistant will keep a live history here.
          </div>
        ) : null}

        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              display: "flex",
              justifyContent: message.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "84%",
                padding: "10px 12px",
                borderRadius: 16,
                background: message.role === "user" ? "rgba(34, 211, 238, 0.24)" : "rgba(15, 23, 42, 0.8)",
                border: message.role === "user" ? "1px solid rgba(34, 211, 238, 0.35)" : "1px solid rgba(255,255,255,0.12)",
                color: "white",
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
              }}
            >
              <div style={{ fontSize: 11, opacity: 0.68, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.16em" }}>
                {message.role === "user" ? "You" : "Lélu"}
              </div>
              <div style={{ lineHeight: 1.45 }}>{message.text}</div>
              {message.role === "assistant" && (message.reasoning || message.plan) ? (
                <MessageThinking
                  message={message}
                  expanded={expandedThinkingId === message.id}
                  onToggle={() =>
                    setExpandedThinkingId((current) => (current === message.id ? null : message.id))
                  }
                />
              ) : null}
            </div>
          </div>
        ))}

        {isSending ? (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ padding: "10px 12px", borderRadius: 16, background: "rgba(15, 23, 42, 0.8)", border: "1px solid rgba(255,255,255,0.12)", color: "white" }}>
              Lélu is preparing a response…
            </div>
          </div>
        ) : null}

        <div ref={scrollRef} />
      </div>

      {errorText ? (
        <div style={{ border: "1px solid rgba(248, 113, 113, 0.45)", borderRadius: 12, background: "rgba(127, 29, 29, 0.45)", padding: "8px 10px", fontSize: 12, color: "#fecaca" }}>
          {errorText}
        </div>
      ) : null}

      <input

        value={input}

        onChange={(event) =>

          setInput(

            event.target.value,

          )

        }


        onKeyDown={(event) => {


          if (

            event.key === "Enter"

          ) {


            sendMessage();

          }


        }}


        placeholder="Speak with Lélu..."

        style={{

          width: "100%",

          borderRadius: 999,

          border: "1px solid rgba(125, 211, 252, 0.3)",

          background: "rgba(15, 23, 42, 0.78)",

          color: "white",

          padding: "10px 14px",

          outline: "none",

          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",

        }}

      />





      <button

        type="button"

        onClick={sendMessage}

        disabled={isSending}

        style={{

          border: "1px solid rgba(125, 211, 252, 0.3)",

          borderRadius: 999,

          background: "linear-gradient(135deg, rgba(34, 211, 238, 0.18), rgba(59, 130, 246, 0.26))",

          color: "white",

          padding: "10px 14px",

          cursor: isSending ? "wait" : "pointer",

          fontWeight: 600,

          opacity: isSending ? 0.7 : 1,

        }}

      >

        {isSending ? "Connecting…" : "Send pulse"}

      </button>


    </div>

  );

}

/**
 * Per-bubble reasoning/plan snapshot.
 *
 * `message.reasoning` / `message.plan` are typed `unknown` on
 * GenesisMessage on purpose (same convention as
 * GenesisReasoningPanel's ReasoningResultShape / PlanShape) so
 * this file doesn't pull AI-core types into the chat subtree.
 * Narrows defensively at render time instead.
 */
interface MessageThinkingProps {
  message: GenesisMessage;
  expanded: boolean;
  onToggle: () => void;
}

function MessageThinking({ message, expanded, onToggle }: MessageThinkingProps) {
  const reasoning = message.reasoning as { explanation?: string } | null | undefined;
  const plan = message.plan as { goal?: string; steps?: Array<{ id: string; title: string }> } | null | undefined;

  return (
    <div style={{ marginTop: 6 }}>
      <button
        type="button"
        onClick={onToggle}
        style={{
          border: "none",
          background: "transparent",
          color: genesisTheme.status.accent,
          fontSize: 11,
          padding: 0,
          cursor: "pointer",
          opacity: 0.85,
        }}
      >
        {expanded ? "Hide reasoning" : "Show reasoning"}
      </button>
      {expanded ? (
        <div
          style={{
            marginTop: 6,
            fontSize: 12,
            lineHeight: 1.4,
            opacity: 0.85,
            borderLeft: "2px solid rgba(34, 211, 238, 0.4)",
            paddingLeft: 8,
          }}
        >
          {reasoning?.explanation ? <div style={{ marginBottom: plan?.steps?.length ? 6 : 0 }}>{reasoning.explanation}</div> : null}
          {plan?.steps && plan.steps.length > 0 ? (
            <div>
              <div style={{ opacity: 0.7, marginBottom: 2 }}>{plan.goal ?? "Plan"}</div>
              {plan.steps.map((step, index) => (
                <div key={step.id}>{index + 1}. {step.title}</div>
              ))}
            </div>
          ) : null}
          {!reasoning?.explanation && !plan?.steps?.length ? (
            <div style={{ opacity: 0.6 }}>No detail recorded for this message.</div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}