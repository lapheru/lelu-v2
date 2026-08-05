/**
 * ==========================================================
 * LÉLUVERSE
 * PARTICLE PODS
 *
 * Particles temporarily gather,
 * dance together, then separate.
 * ==========================================================
 */

import type {

  PortalParticle,

} from "./PortalTypes";

export function updatePods(

  particles: PortalParticle[],

  delta: number,

  time: number,

){

  particles.forEach(

    (particle,index)=>{

      if(

        particle.evolution!==

        "galaxy"

      ) return;

      const leader=

        particles[

          Math.floor(

            index/8,

          )*8

        ];

      if(

        !leader||

        leader===particle

      ) return;

      particle.position[0]+=

        (

          leader.position[0]-

          particle.position[0]

        )*

        delta*.6;

      particle.position[1]+=

        (

          leader.position[1]-

          particle.position[1]

        )*

        delta*.6;

      particle.position[2]+=

        Math.sin(

          time+

          particle.pulse,

        )*

        delta;

    },

  );

}