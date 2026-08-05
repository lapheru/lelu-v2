/**
 * ==========================================================
 * LÉLU
 * KERNEL
 * ==========================================================
 */

import Constitution
  from "../../constitution/Constitution";

import Ordinances
  from "../../constitution/Ordinances";

import Government
  from "../../constitution/Roles";

import Registry
  from "./Registry";

import type {
  KernelModule,
  KernelService,
} from "./Registry";

import Events
  from "./Events";

import Lifecycle
  from "./Lifecycle";

import Health
  from "./Health";

class Kernel {

  readonly constitution =
    Constitution;

  readonly ordinances =
    Ordinances;

  readonly government =
    Government;

  readonly registry =
    new Registry();

  readonly events =
    new Events();

  readonly lifecycle =
    new Lifecycle();

  readonly health =
    new Health();

  async boot(): Promise<void> {

    console.clear();

    console.log("=================================");
    console.log("LÉLU ENGINE");
    console.log("=================================");
    console.log(
      `Version: ${this.constitution.identity.version}`,
    );
    console.log(
      `Codename: ${this.constitution.identity.codename}`,
    );
    console.log(
      `Government Roles: ${this.government.length}`,
    );
    console.log("=================================");

    await this.lifecycle.boot(
      this.registry.servicesList(),
    );

    console.log("Kernel Online");

    await this.events.emit(
      "kernel.booted",
    );

  }

  async shutdown(): Promise<void> {

    await this.events.emit(
      "kernel.shutdown",
    );

    await this.lifecycle.shutdown(
      this.registry.servicesList(),
    );

  }

  async restart(): Promise<void> {

    await this.lifecycle.restart(
      this.registry.servicesList(),
    );

    await this.events.emit(
      "kernel.restarted",
    );

  }

  registerService(
    service: KernelService,
  ): void {

    this.registry.registerService(
      service,
    );

  }

  registerModule(
    module: KernelModule,
  ): void {

    this.registry.registerModule(
      module,
    );

  }

  getService(
    id: string,
  ): KernelService | undefined {

    return this.registry.getService(
      id,
    );

  }

  getModule(
    id: string,
  ): KernelModule | undefined {

    return this.registry.getModule(
      id,
    );

  }

  async healthReport() {

    return this.health.report(
      this.registry.servicesList(),
    );

  }

}

const kernel =
  new Kernel();

export {
  Kernel,
  kernel,
};

export default kernel;