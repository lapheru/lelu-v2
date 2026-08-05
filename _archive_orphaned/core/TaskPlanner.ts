/**
 * ==========================================================
 * LÉLU
 * TASK PLANNER
 * ==========================================================
 */

import type {
  Goal,
} from "./GoalEngine";

export type TaskStatus =
  | "pending"
  | "active"
  | "blocked"
  | "completed";

export interface Task {

  id:
    string;

  goalId:
    string;

  title:
    string;

  description:
    string;

  priority:
    number;

  order:
    number;

  status:
    TaskStatus;

  createdAt:
    number;

  updatedAt:
    number;

  completedAt?:
    number;

  dependencies:
    string[];

  tags:
    string[];

}

export default class TaskPlanner {

  private readonly tasks =
    new Map<
      string,
      Task
    >();

  /**
   * Build starter tasks
   * for a goal.
   */
  public generate(
    goal: Goal,
  ): Task[] {

    const now =
      Date.now();

    const templates = [

      "Research",

      "Plan",

      "Build",

      "Test",

      "Review",

    ];

    const created =
      templates.map(

        (
          title,
          index,
        ) => {

          const task: Task = {

            id:

`${goal.id}-${index + 1}`,

            goalId:
              goal.id,

            title,

            description:

`${title} ${goal.title}`,

            priority:
              goal.priority,

            order:
              index + 1,

            status:
              "pending",

            createdAt:
              now,

            updatedAt:
              now,

            dependencies:

              index === 0

                ? []

                : [

`${goal.id}-${index}`,

                ],

            tags:
              [...goal.tags],

          };

          this.tasks.set(

            task.id,

            task,

          );

          return task;

        },

      );

    return created;

  }

  /**
   * Add task.
   */
  public add(
    task: Task,
  ): void {

    this.tasks.set(
      task.id,
      task,
    );

  }

  /**
   * Get task.
   */
  public get(
    id: string,
  ): Task | undefined {

    return this.tasks.get(
      id,
    );

  }

  /**
   * Tasks for goal.
   */
  public forGoal(
    goalId: string,
  ): Task[] {

    return this.all()

      .filter(

        task =>

          task.goalId ===
          goalId,

      );

  }

  /**
   * All tasks.
   */
  public all():
    Task[] {

    return Array

      .from(
        this.tasks.values(),
      )

      .sort(

        (
          left,
          right,
        ) =>

          left.order -

          right.order,

      );

  }

  /**
   * Ready tasks.
   */
  public ready():
    Task[] {

    return this.all()

      .filter(

        task =>

          task.status ===
          "pending",

      )

      .filter(

        task =>

          task.dependencies.every(

            dependency =>

              this.tasks.get(
                dependency,
              )?.status ===
              "completed",

          ),

      );

  }

  /**
   * Begin work.
   */
  public start(
    id: string,
  ): boolean {

    const task =
      this.tasks.get(
        id,
      );

    if (

      task ===
      undefined

    ) {

      return false;

    }

    task.status =
      "active";

    task.updatedAt =
      Date.now();

    return true;

  }

  /**
   * Complete task.
   */
  public complete(
    id: string,
  ): boolean {

    const task =
      this.tasks.get(
        id,
      );

    if (

      task ===
      undefined

    ) {

      return false;

    }

    task.status =
      "completed";

    task.updatedAt =
      Date.now();

    task.completedAt =
      Date.now();

    return true;

  }

  /**
   * Block task.
   */
  public block(
    id: string,
  ): boolean {

    const task =
      this.tasks.get(
        id,
      );

    if (

      task ===
      undefined

    ) {

      return false;

    }

    task.status =
      "blocked";

    task.updatedAt =
      Date.now();

    return true;

  }

  /**
   * Remove task.
   */
  public remove(
    id: string,
  ): void {

    this.tasks.delete(
      id,
    );

  }

  /**
   * Clear planner.
   */
  public clear():
    void {

    this.tasks.clear();

  }

}