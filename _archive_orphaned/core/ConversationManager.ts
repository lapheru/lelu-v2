/**
 * ==========================================================
 * LÉLU
 * CONVERSATION MANAGER
 * ==========================================================
 */

export interface ConversationMessage {

  id: string;

  timestamp: number;

  role:
    "system" |
    "user" |
    "assistant";

  content: string;

  metadata?:
    Record<
      string,
      unknown
    >;

}

export default class ConversationManager {

  private readonly history:
    ConversationMessage[] = [];

  constructor(

    private readonly maxMessages =
      100,

  ) {}

  /**
   * Add a message.
   */
  public add(

    role:
      ConversationMessage["role"],

    content:
      string,

    metadata?:
      Record<
        string,
        unknown
      >,

  ): ConversationMessage {

    const message:
      ConversationMessage = {

      id:
        crypto.randomUUID(),

      timestamp:
        Date.now(),

      role,

      content,

      metadata,

    };

    this.history.push(
      message,
    );

    this.prune();

    return message;

  }

  /**
   * Entire history.
   */
  public all():
    readonly ConversationMessage[] {

    return this.history;

  }

  /**
   * Latest message.
   */
  public latest():
    ConversationMessage |
    undefined {

    return this.history.at(
      -1,
    );

  }

  /**
   * Last N messages.
   */
  public recent(

    count:
      number,

  ): ConversationMessage[] {

    return this.history.slice(
      -count,
    );

  }

  /**
   * User messages.
   */
  public userMessages():
    ConversationMessage[] {

    return this.history.filter(

      message =>

        message.role ===
        "user",

    );

  }

  /**
   * Assistant messages.
   */
  public assistantMessages():
    ConversationMessage[] {

    return this.history.filter(

      message =>

        message.role ===
        "assistant",

    );

  }

  /**
   * System messages.
   */
  public systemMessages():
    ConversationMessage[] {

    return this.history.filter(

      message =>

        message.role ===
        "system",

    );

  }

  /**
   * Find matching messages.
   */
  public search(

    text:
      string,

  ): ConversationMessage[] {

    const query =
      text.toLowerCase();

    return this.history.filter(

      message =>

        message.content

          .toLowerCase()

          .includes(
            query,
          ),

    );

  }

  /**
   * Remove oldest messages.
   */
  private prune():
    void {

    while (

      this.history.length >
      this.maxMessages

    ) {

      this.history.shift();

    }

  }

  /**
   * Clear conversation.
   */
  public clear():
    void {

    this.history.length =
      0;

  }

}