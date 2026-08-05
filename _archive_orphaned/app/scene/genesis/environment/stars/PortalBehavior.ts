/**
 * ==========================================================
 * LÉLUVERSE
 * PORTAL BEHAVIOR
 *
 * True 3D spherical portal movement.
 * ==========================================================
 */

import { Vector3 } from "three";

import type {
  LivingPortal,
  PortalParticle,
} from "./PortalTypes";

import {
  evolveParticle,
} from "./ParticleEvolution";

import {
  respawnParticle,
} from "./ParticleSpawner";

const tmp = new Vector3();

export function updateParticle(
  particle: PortalParticle,
  portals: LivingPortal[],
  delta: number,
  time: number,
) {

  if (!portals.length) return;

  evolveParticle(particle);

  if (particle.portalId >= portals.length) {
    particle.portalId = 0;
  }

  const portal = portals[particle.portalId];

  switch (particle.evolution) {

    case "birth":
      particle.rotation += particle.speed * delta;
      particle.orbit += delta * .15;
      break;

    case "warp":
      particle.rotation += particle.speed * delta * 6;
      particle.orbit *= .996;
      break;

    case "portal":
      particle.rotation += delta * 2;
      break;

    case "galaxy":
      particle.rotation += delta * .6;
      particle.orbit +=
        Math.sin(
          time +
          particle.pulse
        ) * delta;
      break;

    case "bloom":
      particle.orbit +=
        Math.sin(
          time * 4 +
          particle.pulse
        ) * delta * 3;
      break;

    case "crystal":
      particle.rotation =
        Math.round(
          particle.rotation /
          (Math.PI / 4)
        ) *
        (Math.PI / 4);
      break;

    case "morph":
      particle.rotation += delta * 3;
      particle.orbit +=
        Math.cos(time * 2) *
        delta;
      break;

    case "death":
      particle.orbit -= delta * 4;

      if (particle.orbit < .2) {
        particle.evolution = "rebirth";
      }

      break;

    case "rebirth":
      respawnParticle(
        particle,
        portals.length,
      );
      return;
  }

  tmp.set(
    particle.direction[0],
    particle.direction[1],
    particle.direction[2],
  );

  tmp.applyAxisAngle(
    new Vector3(
      particle.axis[0],
      particle.axis[1],
      particle.axis[2],
    ),
    particle.rotation + portal.rotation,
  );

  tmp.normalize();

  const radius =
    portal.radius *
    particle.orbit;

  particle.position = [

    portal.position[0] +
      tmp.x * radius,

    portal.position[1] +
      tmp.y * radius,

    portal.position[2] +
      tmp.z * radius,

  ];
}