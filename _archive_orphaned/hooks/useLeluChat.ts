/**
 * ==========================================================
 * LÉLU
 * CHAT HOOK
 * ==========================================================
 */

import {
  useEffect,
  useState,
  useRef,
} from "react";

import ChatSession
  from "../core/ChatSession";

import type {
  ChatMessage,
} from "../core/ChatController";


export default function useLeluChat() {


  const session =
    useRef<ChatSession | null>(
      null,
    );



  const [messages, setMessages] =
    useState<ChatMessage[]>([]);



  const [loading, setLoading] =
    useState(false);



  const [error, setError] =
    useState<string | null>(
      null,
    );



  const [ready, setReady] =
    useState(false);



  useEffect(() => {


    if (
      !session.current
    ) {

      session.current =
        new ChatSession();

    }



    const start =
      async () => {

        try {

          await session.current?.initialize();



          setMessages(
            session.current?.history() ?? [],
          );


          setReady(
            true,
          );


        }

        catch (err) {

          setError(
            err instanceof Error
              ? err.message
              : "Failed to initialize Lélu",
          );

        }

      };



    start();



    return () => {

      session.current?.close();

    };


  }, []);





  async function send(
    message:
      string,
  ) {


    if (
      !session.current ||
      !message.trim()
    ) {

      return;

    }



    setLoading(
      true,
    );


    setError(
      null,
    );



    try {


      await session.current.send(
        message,
      );



      setMessages(

        session.current.history(),

      );


    }

    catch (err) {


      setError(

        err instanceof Error

          ? err.message

          : "Lélu failed to respond",

      );


    }

    finally {


      setLoading(
        false,
      );


    }

  }





  function clear() {


    session.current?.clear();



    setMessages([]);

  }





  return {


    messages,


    send,


    clear,


    loading,


    ready,


    error,


    sessionId:

      session.current?.id(),


  };

}