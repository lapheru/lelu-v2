/**
 * ==========================================================
 * LÉLU
 * KERNEL REGISTRY
 * ==========================================================
 */

export type ServiceStatus =
  | "offline"
  | "initializing"
  | "online"
  | "degraded";

export interface KernelService {

  readonly id: string;

  readonly name: string;

  readonly version: string;

  status: ServiceStatus;

  initialize?(): Promise<void>;

  shutdown?(): Promise<void>;

  health?(): Promise<boolean>;

}

export interface KernelModule {

  readonly id: string;

  readonly name: string;

  readonly version: string;

  enabled: boolean;

}

export default class Registry {

  private readonly services =
    new Map<
      string,
      KernelService
    >();

  private readonly modules =
    new Map<
      string,
      KernelModule
    >();

  registerService(
    service: KernelService,
  ): void {

    this.services.set(
      service.id,
      service,
    );

  }

  unregisterService(
    id: string,
  ): void {

    this.services.delete(
      id,
    );

  }

  getService(
    id: string,
  ): KernelService | undefined {

    return this.services.get(
      id,
    );

  }

  servicesList():
    KernelService[] {

    return [
      ...this.services.values(),
    ];

  }

  registerModule(
    module: KernelModule,
  ): void {

    this.modules.set(
      module.id,
      module,
    );

  }

  unregisterModule(
    id: string,
  ): void {

    this.modules.delete(
      id,
    );

  }

  getModule(
    id: string,
  ): KernelModule | undefined {

    return this.modules.get(
      id,
    );

  }

  modulesList():
    KernelModule[] {

    return [
      ...this.modules.values(),
    ];

  }

  clear(): void {

    this.services.clear();

    this.modules.clear();

  }

  get serviceCount():
    number {

    return this.services.size;

  }

  get moduleCount():
    number {

    return this.modules.size;

  }

}