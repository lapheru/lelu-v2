/**
 * ==========================================================
 * LÉLU
 * MOBILE CHAT INTERFACE
 * ==========================================================
 */

import {
  useEffect,
  useRef,
  useState,
} from "react";

import useLeluChat
  from "../hooks/useLeluChat";


export default function LeluChat() {


  const {
    messages,
    send,
    loading,
    ready,
  } = useLeluChat();



  const [input, setInput] =
    useState("");



  const bottom =
    useRef<HTMLDivElement | null>(null);



  useEffect(() => {

    bottom.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, loading]);





  async function submit() {

    const text =
      input.trim();


    if (
      !text ||
      loading
    ) {

      return;

    }


    setInput("");

    await send(text);

  }





  return (

    <div

      style={{

        position:
          "fixed",

        bottom:
          "16px",

        left:
          "50%",

        transform:
          "translateX(-50%)",

        width:
          "calc(100vw - 24px)",

        maxWidth:
          "430px",

        height:
          "520px",

        display:
          "flex",

        flexDirection:
          "column",

        borderRadius:
          "24px",

        overflow:
          "hidden",

        background:
          "rgba(10,10,18,.92)",

        backdropFilter:
          "blur(20px)",

      }}

    >

      <header

        style={{

          padding:
            "14px 18px",

          borderBottom:
            "1px solid rgba(255,255,255,.1)",

        }}

      >

        <strong>
          ✦ Lélu
        </strong>

        <div
          style={{
            fontSize:"12px",
            opacity:.6,
          }}
        >

          {
            ready
              ? "Online"
              : "Loading"
          }

        </div>

      </header>





      <div

        style={{

          flex:
            1,

          overflowY:
            "auto",

          padding:
            "14px",

        }}

      >

        {
          messages.map(
            (
              message,
              index,
            ) => (

              <div

                key={index}

                style={{

                  display:
                    "flex",

                  justifyContent:

                    message.role === "user"

                      ? "flex-end"

                      : "flex-start",

                  marginBottom:
                    "12px",

                }}

              >

                <div

                  style={{

                    maxWidth:
                      "78%",

                    padding:
                      "12px 14px",

                    borderRadius:
                      "18px",

                    background:

                      message.role === "user"

                        ? "#6757ff"

                        : "rgba(255,255,255,.1)",

                    color:
                      "white",

                    wordBreak:
                      "break-word",

                  }}

                >

                  {message.content}

                </div>


              </div>

            )
          )

        }


        {
          loading && (

            <div>

              Lélu is thinking...

            </div>

          )

        }


        <div ref={bottom}/>

      </div>





      <div

        style={{

          padding:
            "10px",

          display:
            "flex",

          gap:
            "8px",

        }}

      >

        <input

          value={input}

          onChange={
            e =>
              setInput(
                e.target.value,
              )
          }

          onKeyDown={
            e => {

              if (
                e.key === "Enter"
              ) {

                submit();

              }

            }
          }

          placeholder="Talk to Lélu..."

          style={{

            flex:
              1,

            height:
              "42px",

            borderRadius:
              "22px",

            padding:
              "0 16px",

            border:
              "none",

          }}

        />

        <button

          onClick={submit}

          disabled={loading}

          style={{

            width:
              "42px",

            borderRadius:
              "50%",

          }}

        >

          ➤

        </button>


      </div>


    </div>

  );

}