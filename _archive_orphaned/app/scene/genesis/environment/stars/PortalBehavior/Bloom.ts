import type {

  LivingPortal,

  PortalParticle,

} from "../PortalTypes";

import {

  updateOrbit,

} from "./Orbit";

export function updateBloom(

  particle: PortalParticle,

  portals: LivingPortal[],

  delta: number,

  time: number,

){

  particle.orbit+=

    Math.sin(

      time*4+

      particle.pulse,

    )*

    delta*3;

  updateOrbit(

    particle,

    portals,

    delta,

    time,

  );

}