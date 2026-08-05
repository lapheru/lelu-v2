/**
 * ==========================================================
 * LÉLU
 * SCHEDULER
 * ==========================================================
 */

export interface ScheduledJob {

  id:
    string;

  name:
    string;

  priority:
    number;

  enabled:
    boolean;

  interval:
    number;

  lastRun:
    number;

  nextRun:
    number;

  action():
    Promise<void>;

}

export default class Scheduler {

  private readonly jobs =
    new Map<
      string,
      ScheduledJob
    >();

  /**
   * Register a job.
   */
  public register(
    job: ScheduledJob,
  ): void {

    this.jobs.set(
      job.id,
      job,
    );

  }

  /**
   * Remove a job.
   */
  public remove(
    id: string,
  ): void {

    this.jobs.delete(
      id,
    );

  }

  /**
   * Execute all due jobs.
   */
  public async tick():
    Promise<void> {

    const now =
      Date.now();

    const jobs =

      Array

        .from(
          this.jobs.values(),
        )

        .filter(

          job =>

            job.enabled &&

            job.nextRun <=
            now,

        )

        .sort(

          (
            left,
            right,
          ) =>

            right.priority -

            left.priority,

        );

    for (

      const job of
      jobs

    ) {

      try {

        await job.action();

      }

      finally {

        job.lastRun =
          now;

        job.nextRun =
          now +
          job.interval;

      }

    }

  }

  /**
   * Execute a single job immediately.
   */
  public async run(
    id: string,
  ): Promise<boolean> {

    const job =
      this.jobs.get(
        id,
      );

    if (

      job ===
      undefined

    ) {

      return false;

    }

    await job.action();

    const now =
      Date.now();

    job.lastRun =
      now;

    job.nextRun =
      now +
      job.interval;

    return true;

  }

  /**
   * Get a job.
   */
  public get(
    id: string,
  ): ScheduledJob | undefined {

    return this.jobs.get(
      id,
    );

  }

  /**
   * All jobs.
   */
  public all():
    ScheduledJob[] {

    return Array.from(
      this.jobs.values(),
    );

  }

  /**
   * Number of jobs.
   */
  public size():
    number {

    return this.jobs.size;

  }

  /**
   * Clear scheduler.
   */
  public clear():
    void {

    this.jobs.clear();

  }

}