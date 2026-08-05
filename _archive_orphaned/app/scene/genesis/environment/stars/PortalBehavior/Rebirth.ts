/**
 * ==========================================================
 * LÉLUVERSE
 * REBIRTH
 *
 * Respawns particles after collapse.
 * ==========================================================
 */

import type {

  LivingPortal,

  PortalParticle,

} from "../PortalTypes";

import {

  respawnParticle,

} from "../ParticleSpawner";

export function updateRebirth(

  particle: PortalParticle,

  portals: LivingPortal[],

){

  if(

    portals.length===0

  ){

    return;

  }

  respawnParticle(

    particle,

    portals.length,

  );

  const portal=

    portals[

      particle.portalId

    ];

  particle.position=[

    portal.position[0],

    portal.position[1],

    portal.position[2],

  ];

}