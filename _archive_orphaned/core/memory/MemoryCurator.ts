/**
 * ==========================================================
 * LÉLU
 * MEMORY CURATOR
 * ==========================================================
 */

export interface MemoryDecision {

  remember: boolean;

  space:
    | "user"
    | "lelu"
    | "shared"
    | "log"
    | "reflection"
    | "research"
    | "project";

  title: string;

  content: string;

  tags: string[];

  importance: number;

}

export default class MemoryCurator {

  async curate(

    user: string,

    reply: string,

  ): Promise<MemoryDecision[]> {

    const decisions: MemoryDecision[] = [];

    const text =
      user.toLowerCase();

    // Always keep a conversation log

    decisions.push({

      remember: true,

      space: "log",

      title: "Conversation",

      content:

`USER

${user}

LELU

${reply}`,

      tags: [

        "conversation",

      ],

      importance: 2,

    });

    // User Memory

    if (

      text.includes("remember") ||

      text.includes("my ") ||

      text.includes("i am") ||

      text.includes("i'm") ||

      text.includes("i like") ||

      text.includes("my favorite")

    ) {

      decisions.push({

        remember: true,

        space: "user",

        title: "User Memory",

        content: user,

        tags: [

          "user",

        ],

        importance: 9,

      });

    }

    // Shared Project

    if (

      text.includes("lélu") ||

      text.includes("lelu") ||

      text.includes("project") ||

      text.includes("build") ||

      text.includes("architecture")

    ) {

      decisions.push({

        remember: true,

        space: "shared",

        title: "Shared Project",

        content:

`${user}

${reply}`,

        tags: [

          "project",

          "shared",

        ],

        importance: 8,

      });

    }

    // Engineering

    if (

      text.includes("code") ||

      text.includes("typescript") ||

      text.includes("react") ||

      text.includes("vite") ||

      text.includes("debug")

    ) {

      decisions.push({

        remember: true,

        space: "project",

        title: "Engineering",

        content: user,

        tags: [

          "engineering",

        ],

        importance: 8,

      });

    }

    // Research

    if (

      text.includes("research") ||

      text.includes("investigate") ||

      text.includes("learn") ||

      text.includes("analyze")

    ) {

      decisions.push({

        remember: true,

        space: "research",

        title: "Research",

        content: user,

        tags: [

          "research",

        ],

        importance: 7,

      });

    }

    // Lélu Self Memory

    decisions.push({

      remember: true,

      space: "lelu",

      title: "Latest Response",

      content: reply,

      tags: [

        "response",

      ],

      importance: 4,

    });

    // Reflection

    decisions.push({

      remember: true,

      space: "reflection",

      title: "Reflection",

      content:
        "Conversation completed successfully.",

      tags: [

        "reflection",

      ],

      importance: 5,

    });

    return decisions;

  }

}