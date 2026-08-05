/**
 * ==========================================================
 * LÉLU
 * GOAL ENGINE
 * ==========================================================
 */

export type GoalStatus =
  | "pending"
  | "active"
  | "blocked"
  | "completed"
  | "failed";

export interface Goal {

  id:
    string;

  title:
    string;

  description:
    string;

  priority:
    number;

  status:
    GoalStatus;

  progress:
    number;

  createdAt:
    number;

  updatedAt:
    number;

  tags:
    string[];

}

export default class GoalEngine {

  private readonly goals =
    new Map<
      string,
      Goal
    >();

  public add(
    goal: Goal,
  ): void {

    this.goals.set(
      goal.id,
      goal,
    );

  }

  public get(
    id: string,
  ): Goal | undefined {

    return this.goals.get(
      id,
    );

  }

  public all():
    Goal[] {

    return Array
      .from(
        this.goals.values(),
      )
      .sort(

        (
          a,
          b,
        ) =>

          b.priority -

          a.priority,

      );

  }

  public active():
    Goal[] {

    return this.all()

      .filter(

        goal =>

          goal.status ===
          "active",

      );

  }

  public updateProgress(

    id: string,

    progress: number,

  ): void {

    const goal =
      this.goals.get(
        id,
      );

    if (
      !goal
    ) {

      return;

    }

    goal.progress =
      Math.max(
        0,
        Math.min(
          100,
          progress,
        ),
      );

    goal.updatedAt =
      Date.now();

    if (

      goal.progress >=
      100

    ) {

      goal.status =
        "completed";

    }

  }

  public remove(
    id: string,
  ): void {

    this.goals.delete(
      id,
    );

  }

  public clear():
    void {

    this.goals.clear();

  }

}