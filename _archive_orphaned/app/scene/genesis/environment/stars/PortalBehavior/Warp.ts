import type {

  LivingPortal,

  PortalParticle,

} from "../PortalTypes";

import {

  updateOrbit,

} from "./Orbit";

export function updateWarp(

  particle: PortalParticle,

  portals: LivingPortal[],

  delta: number,

  time: number,

){

  particle.orbit*=.995;

  particle.angle+=

    delta*6;

  updateOrbit(

    particle,

    portals,

    delta,

    time,

  );

}