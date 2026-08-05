/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS STORE
 *
 * Shared Genesis UI state helpers
 * ==========================================================
 */

export function getActiveMessages(

  state: {
    messages: Array<{
      id: string;
      role: "user" | "assistant";
      text: string;
      timestamp: number;
      source: "ai" | "local";
      provider?: string;
      confidence?: number;
    }>;
  },

) {


  return state.messages.slice(

    -50,

  );

}





export function getRecentNotifications(

  state: {
    notifications: Array<{
      id: string;
      title: string;
      description?: string;
      created: number;
    }>;
  },

) {


  return state.notifications.slice(

    -20,

  );

}





export function hasActiveCognition(

  state: {
    cognition: unknown | null;
  },

) {


  return Boolean(

    state.cognition,

  );

}