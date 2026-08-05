/**
 * ==========================================================
 * LÉLUVERSE
 * PORTAL EFFECTS
 *
 * Visual evolution system.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";

import {

  useMemo,

} from "react";

import type {

  PortalParticle,

} from "./PortalTypes";

const EFFECT_COUNT = 180;

export default function PortalEffects() {

  const effects =

    useMemo<PortalParticle[]>(() => {

      return Array.from({

        length: EFFECT_COUNT,

      }).map((_, id) => ({

        id,

        portalId:

          Math.floor(

            Math.random() * 4,

          ),

        position:[

          (Math.random()-.5)*200,

          (Math.random()-.5)*180,

          -80-Math.random()*200,

        ],

        velocity:[0,0,0],
        direction:[0,0,1],
        axis:[0,0,1],
        rotation:0,
        angle:

          Math.random()*

          Math.PI*2,

        orbit:

          2+

          Math.random()*8,

        speed:

          .4+

          Math.random()*2,

        size:

          .03+

          Math.random()*.08,

        pulse:

          Math.random()*

          Math.PI*2,

        age:0,

        life:

          3+

          Math.random()*8,

        evolution:"birth",

        alive:true,

      }));

    },[]);

  useFrame(({clock},delta)=>{

    const t=

      clock.elapsedTime;

    effects.forEach(effect=>{

      effect.age+=delta;

      effect.angle+=

        delta*

        effect.speed;

      if(

        effect.age>

        effect.life

      ){

        effect.age=0;

        effect.life=

          3+

          Math.random()*8;

        const next=[

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

        effect.evolution=

          next[

            Math.floor(

              Math.random()*

              next.length,

            )

          ];

      }

      switch(effect.evolution){

        case"warp":

          effect.orbit+=

            delta*6;

          break;

        case"morph":

          effect.size=

            .02+

            Math.abs(

              Math.sin(

                t*5+

                effect.pulse,

              )

            )*.15;

          break;

        case"galaxy":

          effect.angle+=

            delta*4;

          break;

        case"bloom":

          effect.orbit+=

            Math.sin(

              t*2+

              effect.pulse,

            )*

            delta*5;

          break;

        case"crystal":

          effect.speed*=

            .999;

          break;

        case"death":

          effect.orbit-=

            delta*8;

          if(

            effect.orbit<.5

          ){

            effect.evolution=

              "rebirth";

          }

          break;

        case"rebirth":

          effect.orbit+=

            delta*7;

          break;

      }

      effect.position=[

        Math.cos(

          effect.angle,

        )*

        effect.orbit*10,

        Math.sin(

          effect.angle,

        )*

        effect.orbit*10,

        -150+

        Math.sin(

          t+

          effect.pulse,

        )*8,

      ];

    });

  });

  return(

    <group>

      {

        effects.map(effect=>(

          <mesh

            key={effect.id}

            position={effect.position}

            scale={effect.size}

          >

            <sphereGeometry

              args={[

                1,

                5,

                5,

              ]}

            />

            <meshBasicMaterial

              color={

                effect.evolution==="warp"

                ?"#7DE3FF"

                :effect.evolution==="portal"

                ?"#FFFFFF"

                :effect.evolution==="galaxy"

                ?"#9A7BFF"

                :effect.evolution==="crystal"

                ?"#7FFFD4"

                :"#FFDDAA"

              }

            />

          </mesh>

        ))

      }

    </group>

  );

}