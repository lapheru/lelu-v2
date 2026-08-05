/**
 * ==========================================================
 * LÉLU
 * KERNEL HEALTH
 * ==========================================================
 */

import type {
  KernelService,
  ServiceStatus,
} from "./Registry";

export interface ServiceHealth {

  id: string;

  name: string;

  version: string;

  status: ServiceStatus;

  healthy: boolean;

}

export interface KernelHealthReport {

  status:
    | "healthy"
    | "degraded"
    | "offline";

  services: ServiceHealth[];

  total: number;

  online: number;

  degraded: number;

  offline: number;

}

export default class Health {

  async report(
    services: KernelService[],
  ): Promise<KernelHealthReport> {

    const reports:
      ServiceHealth[] = [];

    let online = 0;

    let degraded = 0;

    let offline = 0;

    for (const service of services) {

      let healthy = true;

      if (service.health) {

        try {

          healthy =
            await service.health();

        } catch {

          healthy = false;

        }

      }

      if (
        service.status ===
        "online"
      ) {

        online++;

      } else if (
        service.status ===
        "degraded"
      ) {

        degraded++;

      } else {

        offline++;

      }

      reports.push({

        id:
          service.id,

        name:
          service.name,

        version:
          service.version,

        status:
          service.status,

        healthy,

      });

    }

    let status:
      KernelHealthReport["status"];

    if (
      online === 0
    ) {

      status =
        "offline";

    } else if (
      degraded > 0 ||
      reports.some(
        service =>
          !service.healthy,
      )
    ) {

      status =
        "degraded";

    } else {

      status =
        "healthy";

    }

    return {

      status,

      services:
        reports,

      total:
        reports.length,

      online,

      degraded,

      offline,

    };

  }

}