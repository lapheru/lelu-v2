/**
 * ==========================================================
 * LÉLUVERSE
 * PORTAL PARTICLES
 *
 * Renderer only.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";

import {

  useMemo,

} from "react";

import {

  getPortals,

  updatePortals,

} from "./PortalEngine";

import {

  createParticles,

} from "./ParticleSpawner";

import {

  updateParticle,

} from "./PortalBehavior";

import {

  updatePods,

} from "./ParticlePods";

export default function PortalParticles(){

  const particles=

    useMemo(

      ()=>createParticles(),

      [],

    );

  useFrame(({clock},delta)=>{

    const time=

      clock.elapsedTime;

    updatePortals(

      delta,

    );

    const portals=

      getPortals();

    for(

      const particle

      of particles

    ){

      updateParticle(

        particle,

        portals,

        delta,

        time,

      );

    }

    updatePods(

      particles,

      delta,

      time,

    );

  });

  return(

    <group>

      {

        particles.map(

          particle=>(

            <mesh

              key={

                particle.id

              }

              position={

                particle.position

              }

              scale={

                particle.size

              }

            >

              <sphereGeometry

                args={[

                  1,

                  4,

                  4,

                ]}

              />

              <meshBasicMaterial

                transparent

                opacity={

                  .4+

                  Math.sin(

                    particle.pulse,

                  )*.2

                }

                color={

                  particle.evolution==="warp"

                  ?"#5FE9FF"

                  :particle.evolution==="portal"

                  ?"#FFFFFF"

                  :particle.evolution==="galaxy"

                  ?"#8C7BFF"

                  :particle.evolution==="bloom"

                  ?"#FF9CE8"

                  :particle.evolution==="crystal"

                  ?"#8FFFF5"

                  :"#A8EFFF"

                }

              />

            </mesh>

          ),

        )

      }

    </group>

  );

}