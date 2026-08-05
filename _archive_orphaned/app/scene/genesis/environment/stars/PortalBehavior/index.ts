/**
 * ==========================================================
 * LÉLUVERSE
 * PORTAL BEHAVIOR
 *
 * Master behavior dispatcher.
 * ==========================================================
 */

import type {

  LivingPortal,

  PortalParticle,

} from "../PortalTypes";

import { updateOrbit } from "./Orbit";
import { updateWarp } from "./Warp";
import { updateBloom } from "./Bloom";
import { updateGalaxy } from "./Galaxy";
import { updateRebirth } from "./Rebirth";

export function updateParticle(

  particle: PortalParticle,

  portals: LivingPortal[],

  delta: number,

  time: number,

){

  if(!portals.length) return;

  switch(

    particle.evolution

  ){

    case "birth":

      updateOrbit(

        particle,

        portals,

        delta,

        time,

      );

      break;

    case "portal":

      updateOrbit(

        particle,

        portals,

        delta,

        time,

      );

      break;

    case "warp":

      updateWarp(

        particle,

        portals,

        delta,

        time,

      );

      break;

    case "bloom":

      updateBloom(

        particle,

        portals,

        delta,

        time,

      );

      break;

    case "galaxy":

      updateGalaxy(

        particle,

        portals,

        delta,

        time,

      );

      break;

    case "death":

      updateRebirth(

        particle,

        portals,

      );

      break;

    case "rebirth":

      updateRebirth(

        particle,

        portals,

      );

      break;

    default:

      updateOrbit(

        particle,

        portals,

        delta,

        time,

      );

  }

}