/**
 * ==========================================================
 * LÉLUVERSE
 * PORTAL CONTROLLER
 *
 * Master intelligence for every
 * living portal.
 * ==========================================================
 */

import type {

  LivingPortal,

  PortalEvent,

  PortalState,

} from "./PortalTypes";

const EVENTS: PortalEvent[] = [

  "none",

  "portal",

  "warp",

  "bloom",

  "code",

  "dance",

  "pods",

  "parade",

  "rollercoaster",

  "memory",

  "galaxy",

  "crystal",

];

export function createPortalController(

  count = 4,

): LivingPortal[] {

  return Array.from({

    length: count,

  }).map((_, id) => ({

    id,

    position: [

      (Math.random() - .5) * 220,

      (Math.random() - .5) * 180,

      -120 - Math.random() * 220,

    ],

    baseRadius:

      8 +

      Math.random() * 8,

    radius:

      8 +

      Math.random() * 8,

    energy: 0,

    age: 0,

    phase:

      Math.random() *

      Math.PI * 2,

    frequency:

      .35 +

      Math.random(),

    growth:

      .6 +

      Math.random() * .8,

    rotation:

      Math.random() *

      Math.PI * 2,

    spin:

      .15 +

      Math.random() * .3,

    timer:

      4 +

      Math.random() * 5,

    state:

      "forming" as PortalState,

    event:

      "none",

  }));

}

export function updatePortalController(

  portals: LivingPortal[],

  delta: number,

  time: number,

){

  portals.forEach(portal=>{

    portal.age+=delta;

    portal.timer-=delta;

    portal.rotation+=

      portal.spin*

      delta;

    portal.energy=

      .55+

      Math.sin(

        time*

        portal.frequency+

        portal.phase,

      )*.45;

    portal.radius=

      portal.baseRadius+

      Math.sin(

        time+

        portal.phase,

      )*

      portal.growth;

    switch(portal.state){

      case"forming":

        if(

          portal.energy>

          .95

        ){

          portal.state=

            "opening";

        }

        break;

      case"opening":

        portal.radius+=

          delta*2;

        if(

          portal.radius>

          portal.baseRadius*

          1.8

        ){

          portal.state=

            "stable";

          portal.timer=

            5;

        }

        break;

      case"stable":

        if(

          portal.timer<=0

        ){

          portal.state=

            "event";

          portal.event=

            EVENTS[

              Math.floor(

                Math.random()*

                EVENTS.length,

              )

            ];

          portal.timer=

            3;

        }

        break;

      case"event":

        if(

          portal.timer<=0

        ){

          portal.state=

            "collapse";

        }

        break;

      case"collapse":

        portal.radius-=

          delta*5;

        portal.energy-=

          delta;

        if(

          portal.radius<.5

        ){

          portal.state=

            "rebirth";

        }

        break;

      case"rebirth":

        portal.position=[

          (Math.random()-.5)*220,

          (Math.random()-.5)*180,

          -120-

          Math.random()*220,

        ];

        portal.radius=

          portal.baseRadius;

        portal.energy=0;

        portal.timer=

          5;

        portal.event="none";

        portal.state="forming";

        break;

    }

  });

}