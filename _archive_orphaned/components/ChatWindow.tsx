/**
 * ==========================================================
 * LÉLU
 * CHAT WINDOW
 * ==========================================================
 */

import MessageBubble
  from "./MessageBubble";

import type ChatMessage
  from "../core/ChatMessage";

interface Props {

  messages:
    ChatMessage[];

  draft:
    string;

  placeholder:
    string;

  quickActions:
    string[];

  isListening:
    boolean;

  onDraftChange(
    value: string,
  ): void;

  onQuickAction(
    action: string,
  ): void;

  onSend():
    void;

  onVoice():
    void;

}

export default function ChatWindow(
  {
    messages,
    draft,
    placeholder,
    quickActions,
    isListening,
    onDraftChange,
    onQuickAction,
    onSend,
    onVoice,
  }: Props,
) {

  return (

    <>

      <div
        className="assistant-messages"
      >

        {

          messages.map(

            message => (

              <MessageBubble

                key={
                  message.id ??
                  message.timestamp
                }

                message={
                  message
                }

              />

            ),

          )

        }

      </div>



      <div
        className="quick-actions"
      >

        {

          quickActions.map(

            action => (

              <button

                key={
                  action
                }

                type="button"

                onClick={
                  () =>
                    onQuickAction(
                      action,
                    )
                }

              >

                {action}

              </button>

            ),

          )

        }

      </div>



      <form

        className="assistant-input-row"

        onSubmit={
          event => {

            event.preventDefault();

            onSend();

          }
        }

      >

        <input

          value={
            draft
          }

          placeholder={
            placeholder
          }

          onChange={
            event =>
              onDraftChange(
                event.target.value,
              )
          }

        />



        <button
          type="submit"
        >

          Send

        </button>



        <button

          type="button"

          onClick={
            onVoice
          }

        >

          {

            isListening

              ? "Stop"

              : "Mic"

          }

        </button>

      </form>

    </>

  );

}