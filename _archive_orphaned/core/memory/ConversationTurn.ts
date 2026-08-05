/**
 * ==========================================================
 * LÉLU
 * CONVERSATION TURN
 * ==========================================================
 */

import type {
  MemorySpace,
} from "./MemoryStore";

export interface ConversationTurn {

  id: string;

  user: string;

  assistant: string;

  created: number;

  updated: number;

  space: MemorySpace;

  title: string;

  tags: string[];

  importance: number;

  metadata: Record<
    string,
    unknown
  >;

}

export function createConversationTurn(

  user: string,

  assistant: string,

  options: {

    title?: string;

    tags?: string[];

    space?: MemorySpace;

    importance?: number;

    metadata?: Record<
      string,
      unknown
    >;

  } = {},

): ConversationTurn {

  const now = Date.now();

  return {

    id: crypto.randomUUID(),

    user,

    assistant,

    created: now,

    updated: now,

    title:

      options.title ??

      "Conversation",

    space:

      options.space ??

      "shared",

    tags:

      options.tags ??

      [],

    importance:

      options.importance ??

      5,

    metadata:

      options.metadata ??

      {},

  };

}