/**
 * ==========================================================
 * LÉLUVERSE
 * PORTAL EVENTS
 *
 * Shared portal event system.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";

import {

  useMemo,

} from "react";

import {

  getPortals,

} from "./PortalEngine";

import type {

  PortalEvent,

} from "./PortalTypes";

interface EventMarker{

  id:number;

  portalId:number;

  rotation:number;

  pulse:number;

}

export default function PortalEvents(){

  const markers=

    useMemo<EventMarker[]>(()=>{

      return Array.from({

        length:24,

      }).map((_,id)=>({

        id,

        portalId:

          id%4,

        rotation:

          Math.random()*

          Math.PI*2,

        pulse:

          Math.random()*

          Math.PI*2,

      }));

    },[]);

  useFrame(({clock},delta)=>{


      clock.elapsedTime;

    const portals=

      getPortals();

    markers.forEach(marker=>{

      marker.rotation+=

        delta*.4;

      marker.pulse+=

        delta;

      marker.portalId=

        marker.portalId%

        portals.length;

    });

  });

  return(

    <group>

      {

        markers.map(marker=>{

          const portal=

            getPortals()[

              marker.portalId

            ];

          if(

            !portal

          ) return null;

          const event=

            portal.event as PortalEvent;

          const r=

            portal.radius+

            .8+

            Math.sin(

              marker.pulse,

            )*.4;

          return(

            <mesh

              key={marker.id}

              position={[

                portal.position[0]+

                Math.cos(

                  marker.rotation,

                )*r,

                portal.position[1]+

                Math.sin(

                  marker.rotation,

                )*r,

                portal.position[2],

              ]}

            >

              <sphereGeometry

                args={[

                  .06,

                  4,

                  4,

                ]}

              />

              <meshBasicMaterial

                color={

                  event==="code"

                  ?"#00F5FF"

                  :event==="warp"

                  ?"#7EDCFF"

                  :event==="bloom"

                  ?"#FF9AE6"

                  :event==="memory"

                  ?"#FFD966"

                  :event==="galaxy"

                  ?"#8E7BFF"

                  :event==="crystal"

                  ?"#A6FFF5"

                  :"#FFFFFF"

                }

              />

            </mesh>

          );

        })

      }

    </group>

  );

}