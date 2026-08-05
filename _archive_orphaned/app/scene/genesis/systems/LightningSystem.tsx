/**
 * ==========================================================
 * LÉLUVERSE
 * LIGHTNING SYSTEM
 *
 * Visualizes Genesis activity as
 * rotating energy rings.
 *
 * Uses current Genesis state.
 * ==========================================================
 */


import {
  useRef,
} from "react";


import {
  Group,
} from "three";


import {
  useFrame,
} from "@react-three/fiber";


import {
  useGenesis,
} from "../GenesisCore";





export default function LightningSystem() {


  const {

    state,

  } = useGenesis();





  const group =

    useRef<Group>(null);





  useFrame((_, delta) => {


    if (!group.current) {

      return;

    }





    const activity =

      state.thinking

        ?

        0.8

        :

        state.actions.length > 0

          ?

          0.5

          :

          0.2;





    group.current.rotation.x +=

      delta *

      0.15;





    group.current.rotation.y +=

      delta *

      (

        0.25 +

        activity

      );





    group.current.rotation.z +=

      delta *

      0.08;





    group.current.visible =

      state.online;


  });





  return (

    <group

      ref={group}

    >


      <mesh>


        <torusGeometry

          args={[

            1.1,

            0.01,

            16,

            256,

          ]}

        />


        <meshBasicMaterial

          color="#88e5ff"

          transparent

          opacity={0.45}

        />


      </mesh>





      <mesh

        rotation={[

          Math.PI / 2,

          0,

          0,

        ]}

      >


        <torusGeometry

          args={[

            1.3,

            0.01,

            16,

            256,

          ]}

        />


        <meshBasicMaterial

          color="#66ccff"

          transparent

          opacity={0.25}

        />


      </mesh>


    </group>

  );

}