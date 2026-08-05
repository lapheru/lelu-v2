/**
 * ==========================================================
 * LÉLUVERSE
 * ORBIT
 *
 * Free living movement.
 * Default behavior is no longer
 * a circle.
 * ==========================================================
 */

import type {

  LivingPortal,

  PortalParticle,

} from "../PortalTypes";

export function updateOrbit(

  particle: PortalParticle,

  portals: LivingPortal[],

  delta:number,

  time:number,

){

  const portal=

    portals[

      particle.portalId%

      portals.length

    ];

  if(!portal) return;

  particle.velocity[0]+=

    (Math.random()-.5)*

    delta*.25;

  particle.velocity[1]+=

    (Math.random()-.5)*

    delta*.25;

  particle.velocity[2]+=

    (Math.random()-.5)*

    delta*.15;

  particle.velocity[0]*=.995;

  particle.velocity[1]*=.995;

  particle.velocity[2]*=.995;

  particle.position[0]+=

    particle.velocity[0];

  particle.position[1]+=

    particle.velocity[1];

  particle.position[2]+=

    particle.velocity[2];

  const dx=

    portal.position[0]-

    particle.position[0];

  const dy=

    portal.position[1]-

    particle.position[1];

  const dz=

    portal.position[2]-

    particle.position[2];

  const distance=

    Math.sqrt(

      dx*dx+

      dy*dy+

      dz*dz,

    );

  if(

    distance<

    portal.radius*4

  ){

    particle.position[0]+=

      dx*

      delta*.4;

    particle.position[1]+=

      dy*

      delta*.4;

    particle.position[2]+=

      dz*

      delta*.4;

  }

  particle.position[0]+=

    Math.sin(

      time+

      particle.pulse,

    )*

    delta*.4;

  particle.position[1]+=

    Math.cos(

      time*.7+

      particle.pulse,

    )*

    delta*.4;

  particle.position[2]+=

    Math.sin(

      time*.3+

      particle.pulse,

    )*

    delta*.25;

}