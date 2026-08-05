/**
 * ==========================================================
 * LÉLUVERSE
 * PORTAL ENGINE
 *
 * Shared portal engine.
 * ==========================================================
 */

import type {

  LivingPortal,

} from "./PortalTypes";

import {

  createPortalController,

  updatePortalController,

} from "./PortalController";

let portals:

  LivingPortal[] |

  null = null;

let elapsed = 0;

export function getPortals(){

  if(

    !portals

  ){

    portals=

      createPortalController();

  }

  return portals;

}

export function updatePortals(

  delta:number,

){

  if(

    !portals

  ){

    portals=

      createPortalController();

  }

  elapsed+=delta;

  updatePortalController(

    portals,

    delta,

    elapsed,

  );

}

export function resetPortals(){

  portals=

    createPortalController();

  elapsed=0;

}

export function portalById(

  id:number,

){

  return getPortals().find(

    portal=>

      portal.id===id,

  );

}

export function randomPortal(){

  const list=

    getPortals();

  return list[

    Math.floor(

      Math.random()*

      list.length,

    )

  ];

}

export function activePortals(){

  return getPortals().filter(

    portal=>

      portal.state!==

      "collapse",

  );

}