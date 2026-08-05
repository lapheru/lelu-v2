/**
 * ==========================================================
 * LÉLUVERSE
 * CONVERSATION ENGINE
 * ==========================================================
 */

import AIService
  from "../services/AIService";

import SpeechRecognitionService
  from "../services/SpeechRecognition";

import SpeechSynthesisService
  from "../services/SpeechSynthesisService";

import Conversation
  from "./Conversation";

import ConversationHistory
  from "./ConversationHistory";

import type ConversationMessage
  from "./ConversationMessage";

export default class ConversationEngine {

  private readonly ai =
    new AIService();

  private readonly speechRecognition =
    new SpeechRecognitionService();

  private readonly speechSynthesis =
    new SpeechSynthesisService();

  private readonly history =
    new ConversationHistory();

  private conversation:
    Conversation;

  constructor() {

    this.conversation =
      new Conversation(
        crypto.randomUUID(),
      );

    this.history.add(
      this.conversation,
    );

  }

  async initialize():
    Promise<void> {

    this.speechRecognition.initialize();

    this.speechSynthesis.initialize();

    this.speechRecognition.onTranscript(

      async (transcript: string) => {

        await this.send(
          transcript,
        );

      },

    );

  }

  startListening():
    void {

    this.speechRecognition.start();

  }

  stopListening():
    void {

    this.speechRecognition.stop();

  }

  isListening():
    boolean {

    return this.speechRecognition.isListening();

  }

  async send(
    text: string,
  ): Promise<void> {

    const userMessage:
      ConversationMessage = {

      id:
        crypto.randomUUID(),

      role:
        "user",

      content:
        text,

      timestamp:
        Date.now(),

    };

    this.conversation.addMessage(
      userMessage,
    );

    const response =

      await this.ai.generate(
        text,
      );

    const assistantMessage:
      ConversationMessage = {

      id:
        crypto.randomUUID(),

      role:
        "assistant",

      content:
        response.text,

      timestamp:
        response.timestamp,

      model:
        response.model,

    };

    this.conversation.addMessage(
      assistantMessage,
    );

    await this.speechSynthesis.speak(
      assistantMessage.content,
    );

  }

  newConversation():
    void {

    this.conversation =
      new Conversation(
        crypto.randomUUID(),
      );

    this.history.add(
      this.conversation,
    );

  }

  getConversation():
    Conversation {

    return this.conversation;

  }

  getHistory():
    ConversationHistory {

    return this.history;

  }

  getAIService():
    AIService {

    return this.ai;

  }

  getSpeechRecognition():
    SpeechRecognitionService {

    return this.speechRecognition;

  }

  getSpeechSynthesis():
    SpeechSynthesisService {

    return this.speechSynthesis;

  }

}