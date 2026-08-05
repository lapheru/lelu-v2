/**
 * ==========================================================
 * LÉLU
 * MESSAGE BUBBLE
 * ==========================================================
 */

import {
  useState,
} from "react";

import type ChatMessage
  from "../core/ChatMessage";


interface Props {

  message:
    ChatMessage;

}


export default function MessageBubble(
  {
    message,
  }: Props,
) {

  const [expanded, setExpanded] =
    useState(false);


  const isUser =
    message.role === "user";


  const long =
    message.content.length > 220;


  const content =

    !isUser &&
    long &&
    !expanded

      ? `${message.content.slice(0, 220)}...`

      : message.content;


  return (

    <div

      style={{

        display:
          "flex",

        justifyContent:

          isUser

            ? "flex-end"

            : "flex-start",

        width:
          "100%",

      }}

    >

      <div

        style={{

          maxWidth:
            "82%",

          padding:
            "12px 16px",

          borderRadius:
            "18px",

          background:

            isUser

              ? "rgba(120,80,255,.9)"

              : "rgba(255,255,255,.08)",

          color:
            "white",

          whiteSpace:
            "pre-wrap",

          overflowWrap:
            "break-word",

        }}

      >

        <div

          style={{

            fontSize:
              ".75rem",

            opacity:
              .65,

            marginBottom:
              6,

            fontWeight:
              600,

          }}

        >

          {

            isUser

              ? "You"

              : "Lélu"

          }

        </div>


        <p

          style={{

            margin:
              0,

            lineHeight:
              1.6,

          }}

        >

          {content}

        </p>


        {

          !isUser &&
          long && (

            <button

              type="button"

              onClick={
                () =>
                  setExpanded(
                    value => !value,
                  )
              }

            >

              {

                expanded

                  ? "Less"

                  : "More"

              }

            </button>

          )

        }

      </div>

    </div>

  );

}