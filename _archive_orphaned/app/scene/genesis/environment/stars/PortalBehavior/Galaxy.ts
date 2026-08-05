import type {

  LivingPortal,

  PortalParticle,

} from "../PortalTypes";

import {

  updateOrbit,

} from "./Orbit";

export function updateGalaxy(

  particle: PortalParticle,

  portals: LivingPortal[],

  delta: number,

  time: number,

){

  particle.angle+=

    delta*.5;

  particle.orbit+=

    Math.sin(

      time+

      particle.pulse,

    )*

    delta;

  updateOrbit(

    particle,

    portals,

    delta,

    time,

  );

}