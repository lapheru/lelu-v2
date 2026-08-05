/**
 * ==========================================================
 * LÉLU
 * COGNITIVE STATE
 * ==========================================================
 */

export type CognitiveMode =

  | "idle"

  | "listening"

  | "thinking"

  | "researching"

  | "planning"

  | "executing"

  | "reflecting"

  | "learning"

  | "sleeping"

  | "error";

export interface StateSnapshot {

  mode:
    CognitiveMode;

  previous:
    CognitiveMode;

  since:
    number;

  reason:
    string;

}

export default class CognitiveState {

  private mode:
    CognitiveMode =
      "idle";

  private previous:
    CognitiveMode =
      "idle";

  private since =
    Date.now();

  /**
   * Current mode.
   */
  public current():
    CognitiveMode {

    return this.mode;

  }

  /**
   * Previous mode.
   */
  public last():
    CognitiveMode {

    return this.previous;

  }

  /**
   * Enter a new state.
   */
  public enter(

    mode:
      CognitiveMode,

    reason = "",

  ): StateSnapshot {

    this.previous =
      this.mode;

    this.mode =
      mode;

    this.since =
      Date.now();

    return {

      mode:
        this.mode,

      previous:
        this.previous,

      since:
        this.since,

      reason,

    };

  }

  /**
   * Whether currently in state.
   */
  public is(

    mode:
      CognitiveMode,

  ): boolean {

    return this.mode === mode;

  }

  /**
   * Milliseconds in current state.
   */
  public duration():
    number {

    return (
      Date.now() -
      this.since
    );

  }

  /**
   * Snapshot.
   */
  public snapshot():
    StateSnapshot {

    return {

      mode:
        this.mode,

      previous:
        this.previous,

      since:
        this.since,

      reason:
        "",

    };

  }

  /**
   * Reset.
   */
  public reset():
    void {

    this.mode =
      "idle";

    this.previous =
      "idle";

    this.since =
      Date.now();

  }

}