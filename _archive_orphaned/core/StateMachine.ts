/**
 * ==========================================================
 * LÉLU
 * STATE MACHINE
 * ==========================================================
 */

export type State =

  | "idle"

  | "listening"

  | "thinking"

  | "planning"

  | "executing"

  | "learning"

  | "reflecting"

  | "sleeping"

  | "error";

export default class StateMachine {

  private readonly transitions =
    new Map<
      State,
      Set<State>
    >();

  private current:
    State =
      "idle";

  constructor() {

    this.allow(
      "idle",
      [
        "listening",
        "sleeping",
      ],
    );

    this.allow(
      "listening",
      [
        "thinking",
        "idle",
      ],
    );

    this.allow(
      "thinking",
      [
        "planning",
        "executing",
        "idle",
        "error",
      ],
    );

    this.allow(
      "planning",
      [
        "executing",
        "thinking",
      ],
    );

    this.allow(
      "executing",
      [
        "learning",
        "reflecting",
        "idle",
        "error",
      ],
    );

    this.allow(
      "learning",
      [
        "idle",
        "thinking",
      ],
    );

    this.allow(
      "reflecting",
      [
        "learning",
        "idle",
      ],
    );

    this.allow(
      "sleeping",
      [
        "idle",
      ],
    );

    this.allow(
      "error",
      [
        "idle",
      ],
    );

  }

  /**
   * Allow transitions.
   */
  private allow(

    from:
      State,

    to:
      State[],

  ): void {

    this.transitions.set(

      from,

      new Set(to),

    );

  }

  /**
   * Current state.
   */
  public state():
    State {

    return this.current;

  }

  /**
   * Can transition?
   */
  public can(

    next:
      State,

  ): boolean {

    return (

      this.transitions

        .get(this.current)

        ?.has(next)

      ??

      false

    );

  }

  /**
   * Transition.
   */
  public transition(

    next:
      State,

  ): boolean {

    if (

      !this.can(next)

    ) {

      return false;

    }

    this.current =
      next;

    return true;

  }

  /**
   * Reset.
   */
  public reset():
    void {

    this.current =
      "idle";

  }

}