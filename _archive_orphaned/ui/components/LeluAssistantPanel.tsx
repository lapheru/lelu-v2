import { useEffect, useMemo, useState } from "react";
import LeluAssistant from "../../abilities/assistant/LeluAssistant";

interface MessageItem {
  id: string;
  role: "user" | "assistant";
  text: string;
  source: "ai" | "local";
}

interface LeluAssistantPanelProps {
  assistant: LeluAssistant;
}

export default function LeluAssistantPanel({
  assistant,
}: LeluAssistantPanelProps) {

  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "welcome",
      role: "assistant",
      text:
        "Lélu is ready. Ask a question, request engineering help, or say something to remember.",
      source: "local",
    },
  ]);

  const [draft, setDraft] =
    useState("");

  const [status, setStatus] =
    useState(
      "Initializing Lélu...",
    );

  const [isListening, setIsListening] =
    useState(false);

  const [mode, setMode] =
    useState<"chat" | "engineering">(
      "chat",
    );

  const [ready, setReady] =
    useState(false);

  const quickActions =
    useMemo(
      () => [
        "Summarize this project",
        "Help debug this app",
        "Remember that I am building a voice assistant",
      ],
      [],
    );

  useEffect(() => {

    let mounted = true;

    async function initialize() {

      try {

        await assistant.initialize();

        if (!mounted) {

          return;

        }

        setReady(true);

        setStatus(
          "Lélu is ready.",
        );

      }

      catch (

        error

      ) {

        console.error(
          error,
        );

        if (!mounted) {

          return;

        }

        setStatus(
          "Failed to initialize Lélu.",
        );

      }

    }

    void initialize();

    return () => {

      mounted = false;

      assistant.voice.dispose();

    };

  }, [assistant]);

  async function sendMessage(
    messageText: string,
  ) {

    const text =
      messageText.trim();

    if (

      !ready ||

      !text

    ) {

      return;

    }

    const userMessage:
      MessageItem = {

      id:
        `${Date.now()}-user`,

      role:
        "user",

      text,

      source:
        "local",

    };

    setMessages(

      current => [

        ...current,

        userMessage,

      ],

    );

    setDraft("");

    setStatus(
      "Thinking...",
    );

    try {

      const reply =
        mode ===
        "engineering"

          ? await assistant.respondEngineering(
              text,
            )

          : await assistant.respond(
              text,
            );

      const assistantMessage:
        MessageItem = {

        id:
          `${Date.now()}-assistant`,

        role:
          "assistant",

        text:
          reply.text,

        source:
          reply.source,

      };

      setMessages(

        current => [

          ...current,

          assistantMessage,

        ],

      );

      setStatus(

        `Reply ready (${reply.source}).`,

      );

      assistant.voice.speak(
        reply.text,
      );

    }

    catch (

      error

    ) {

      console.error(
        error,
      );

      setStatus(
        "Lélu failed to respond.",
      );

    }

  }

  function handleListening() {

    if (

      !ready

    ) {

      return;

    }

    if (

      isListening

    ) {

      assistant.voice.stopListening();

      setIsListening(
        false,
      );

      setStatus(
        "Voice input stopped.",
      );

      return;

    }

    assistant.voice.startListening(

      transcript => {

        if (

          !transcript

        ) {

          setStatus(
            "No speech detected.",
          );

          setIsListening(
            false,
          );

          return;

        }

        setDraft(
          transcript,
        );

        setStatus(
          "Captured voice input.",
        );

        setIsListening(
          false,
        );

        void sendMessage(
          transcript,
        );

      },

    );

    setIsListening(
      true,
    );

    setStatus(
      "Listening for speech...",
    );

  }

  return (

    <section className="assistant-panel">

      <div className="assistant-header">

        <div>

          <p className="eyebrow">
            LÉLU ASSISTANT
          </p>

          <h2>
            Conversation interface
          </h2>

        </div>

        <div className="mode-switcher">

          <button
            type="button"
            className={
              mode === "chat"
                ? "active"
                : ""
            }
            onClick={() =>
              setMode(
                "chat",
              )
            }
          >
            Chat
          </button>

          <button
            type="button"
            className={
              mode === "engineering"
                ? "active"
                : ""
            }
            onClick={() =>
              setMode(
                "engineering",
              )
            }
          >
            Engineering
          </button>

        </div>

      </div>

      <div className="assistant-status">
        {status}
      </div>

      <div className="assistant-messages">

        {messages.map(

          message => (

            <article
              key={message.id}
              className={`message ${message.role}`}
            >

              <strong>

                {message.role ===
                "user"

                  ? "You"

                  : "Lélu"}

              </strong>

              <p>
                {message.text}
              </p>

            </article>

          ),

        )}

      </div>

      <div className="quick-actions">

        {quickActions.map(

          action => (

            <button
              key={action}
              type="button"
              disabled={!ready}
              onClick={() =>
                setDraft(
                  action,
                )
              }
            >
              {action}
            </button>

          ),

        )}

      </div>

      <form
        className="assistant-input-row"
        onSubmit={event => {

          event.preventDefault();

          void sendMessage(
            draft,
          );

        }}
      >

        <input
          value={draft}
          disabled={!ready}
          onChange={event =>
            setDraft(
              event.target.value,
            )
          }
          placeholder={
            mode ===
            "engineering"

              ? "Ask for engineering help..."

              : "Type a message..."
          }
        />

        <button
          type="submit"
          disabled={!ready}
        >
          Send
        </button>

        <button
          type="button"
          disabled={!ready}
          onClick={
            handleListening
          }
        >
          {isListening
            ? "Stop"
            : "Mic"}
        </button>

      </form>

    </section>

  );

}