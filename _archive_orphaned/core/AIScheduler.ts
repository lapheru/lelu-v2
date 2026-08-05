/**
 * ==========================================================
 * LÉLU
 * AI SCHEDULER
 * ==========================================================
 */

export default class AIScheduler {

  private readonly queue:
    (() => Promise<void>)[] = [];

  enqueue(
    task: () => Promise<void>,
  ): void {

    this.queue.push(task);

  }

  async run(): Promise<void> {

    while (this.queue.length) {

      const task = this.queue.shift();

      if (task) {

        await task();

      }

    }

  }

}