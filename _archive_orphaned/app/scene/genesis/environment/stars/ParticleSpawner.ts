/**
 * ==========================================================
 * LÉLUVERSE
 * PARTICLE SPAWNER
 *
 * Creates and respawns portal particles using
 * true 3D spherical distribution.
 * ==========================================================
 */

import type { PortalParticle } from "./PortalTypes";

export const PARTICLE_COUNT = 600;

const TAU = Math.PI * 2;

function randomUnitVector(): [number, number, number] {

  const z = Math.random() * 2 - 1;

  const theta = Math.random() * TAU;

  const r = Math.sqrt(1 - z * z);

  return [

    r * Math.cos(theta),

    z,

    r * Math.sin(theta),

  ];

}

function randomRadius(): number {

  return 4 + Math.random() * 12;

}

export function createParticles(): PortalParticle[] {

  return Array.from(

    {

      length: PARTICLE_COUNT,

    },

    (_, id): PortalParticle => {

      const direction = randomUnitVector();

      const axis = randomUnitVector();

      const radius = randomRadius();

      return {

        id,

        portalId:

          Math.floor(

            Math.random() * 4,

          ),

        position: [

          direction[0] * radius,

          direction[1] * radius,

          direction[2] * radius,

        ],

        velocity: [

          0,

          0,

          0,

        ],

        direction,

        axis,

        rotation:

          Math.random() * TAU,

        angle:

          Math.random() * TAU,

        orbit:

          radius,

        speed:

          0.15 +

          Math.random() * 0.6,

        size:

          0.006 +

          Math.random() * 0.02,

        pulse:

          Math.random() * TAU,

        age: 0,

        life:

          8 +

          Math.random() * 12,

        evolution:

          "birth",

        alive: true,

      };

    },

  );

}

export function respawnParticle(

  particle: PortalParticle,

  portalCount: number,

): void {

  const direction = randomUnitVector();

  const axis = randomUnitVector();

  const radius = randomRadius();

  particle.portalId =

    Math.floor(

      Math.random() *

      Math.max(portalCount, 1),

    );

  particle.position = [

    direction[0] * radius,

    direction[1] * radius,

    direction[2] * radius,

  ];

  particle.velocity = [

    0,

    0,

    0,

  ];

  particle.direction = direction;

  particle.axis = axis;

  particle.rotation =

    Math.random() * TAU;

  particle.orbit =

    radius;

  particle.speed =

    0.15 +

    Math.random() * 0.6;

  particle.size =

    0.006 +

    Math.random() * 0.02;

  particle.pulse =

    Math.random() * TAU;

  particle.age = 0;

  particle.life =

    8 +

    Math.random() * 12;

  particle.evolution =

    "birth";

  particle.alive = true;

}