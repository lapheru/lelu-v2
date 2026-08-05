/**
 * ==========================================================
 * LÉLUVERSE
 * COSMOS
 *
 * Master living universe environment.
 *
 * Contains:
 * - aurora systems
 * - cosmic atmosphere
 *
 * StarField is mounted by GenesisRenderer.
 * ==========================================================
 */


import {
  useFrame,
} from "@react-three/fiber";


import {
  useRef,
} from "react";


import {
  Group,
} from "three";


import AuroraCosmos
  from "./AuroraCosmos";





export default function Cosmos(){


  const universe =

    useRef<Group>(null);





  useFrame(({clock},delta)=>{


    if(!universe.current)

      return;



    const t =

      clock.elapsedTime;





    universe.current.position.x =


      Math.sin(

        t *

        0.02

      )

      *

      0.4;





    universe.current.position.y =


      Math.cos(

        t *

        0.015

      )

      *

      0.25;





    universe.current.rotation.z =


      Math.sin(

        t *

        0.01

      )

      *

      0.01;





    universe.current.rotation.y +=


      delta *

      0.002;


  });







  return (

    <group

      ref={universe}

      name="CosmicEnvironment"

    >


      <AuroraCosmos />


    </group>

  );

}