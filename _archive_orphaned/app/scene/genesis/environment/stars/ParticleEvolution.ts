/**
 * ==========================================================
 * LÉLUVERSE
 * PARTICLE EVOLUTION
 *
 * Controls how a particle changes
 * from one living form to another.
 * ==========================================================
 */

import type {

  PortalParticle,

} from "./PortalTypes";

const STATES = [

  "birth",

  "warp",

  "morph",

  "portal",

  "galaxy",

  "bloom",

  "crystal",

  "death",

  "rebirth",

] as const;

export function evolveParticle(

  particle: PortalParticle,

){

  particle.age++;

  if(

    particle.age <

    particle.life

  ) return;

  particle.age = 0;

  particle.life =

    240 +

    Math.random()*360;

  particle.evolution =

    STATES[

      Math.floor(

        Math.random()*

        STATES.length,

      )

    ];

}