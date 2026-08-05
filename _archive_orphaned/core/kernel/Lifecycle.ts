/**
 * ==========================================================
 * LÉLU
 * KERNEL LIFECYCLE
 * ==========================================================
 */

import type {
  KernelService,
} from "./Registry";

export type LifecycleState =
  | "offline"
  | "booting"
  | "running"
  | "stopping";

export default class Lifecycle {

  private state:
    LifecycleState =
      "offline";

  getState():
    LifecycleState {

    return this.state;

  }

  isRunning():
    boolean {

    return this.state === "running";

  }

  async boot(
    services: KernelService[],
  ): Promise<void> {

    if (
      this.state !== "offline"
    ) {

      return;

    }

    this.state = "booting";

    for (const service of services) {

      service.status =
        "initializing";

      await service
        .initialize?.();

      service.status =
        "online";

    }

    this.state =
      "running";

  }

  async shutdown(
    services: KernelService[],
  ): Promise<void> {

    if (
      this.state !== "running"
    ) {

      return;

    }

    this.state =
      "stopping";

    const reversed =
      [...services].reverse();

    for (const service of reversed) {

      await service
        .shutdown?.();

      service.status =
        "offline";

    }

    this.state =
      "offline";

  }

  async restart(
    services: KernelService[],
  ): Promise<void> {

    await this.shutdown(
      services,
    );

    await this.boot(
      services,
    );

  }

}