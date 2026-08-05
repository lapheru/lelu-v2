/**
 * ==========================================================
 * LÉLU
 * PROVIDER QUEUE
 * ==========================================================
 */

import type Provider
  from "../providers/Provider";

import type {
  KnowledgeResult,
} from "../providers/Provider";

interface QueueJob {

  provider:
    Provider;

  query: string;

  resolve(
    value: KnowledgeResult[],
  ): void;

  reject(
    reason?: unknown,
  ): void;

}

export default class ProviderQueue {

  private readonly queue:
    QueueJob[] = [];

  private readonly active =
    new Map<string, number>();

  async enqueue(

    provider:
      Provider,

    query: string,

  ): Promise<KnowledgeResult[]> {

    return new Promise(

      (resolve, reject) => {

        this.queue.push({

          provider,

          query,

          resolve,

          reject,

        });

        void this.run();

      },

    );

  }

  private async run(): Promise<void> {

    if (
      this.queue.length === 0
    ) {

      return;

    }

    const job =
      this.queue.shift();

    if (!job) {

      return;

    }

    const running =

      this.active.get(
        job.provider.name,
      ) ?? 0;

    if (

      running >=
      job.provider.maxConcurrent

    ) {

      this.queue.push(job);

      return;

    }

    this.active.set(

      job.provider.name,

      running + 1,

    );

    try {

      const timeout =
        new Promise<never>(

          (_, reject) =>

            setTimeout(

              () =>

                reject(

                  new Error(

                    `${job.provider.name} timeout`,

                  ),

                ),

              job.provider.timeout,

            ),

        );

      const results =
        await Promise.race([

          job.provider.search(
            job.query,
          ),

          timeout,

        ]);

      job.resolve(
        results,
      );

    } catch {

      job.resolve(
        [],
      );

    } finally {

      this.active.set(

        job.provider.name,

        Math.max(

          0,

          (this.active.get(
            job.provider.name,
          ) ?? 1) - 1,

        ),

      );

      setTimeout(

        () => {

          void this.run();

        },

        job.provider.cooldown,

      );

    }

  }

}