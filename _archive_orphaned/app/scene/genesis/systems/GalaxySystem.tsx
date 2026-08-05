/**
 * ==========================================================
 * LÉLUVERSE
 * GALAXY SYSTEM
 *
 * Living cosmic spectrum.
 *
 * Features:
 * - rotation
 * - shimmer
 * - color evolution
 * - cosmic light cycles
 * ==========================================================
 */


import {
  Group,
  MeshBasicMaterial,
  Color,
} from "three";


import {
  useFrame,
} from "@react-three/fiber";


import {
  useMemo,
  useRef,
} from "react";


import {
  useGenesis,
} from "../GenesisCore";





export default function GalaxySystem() {


  const {

    state,

  } = useGenesis();





  const galaxy =

    useRef<Group>(null);





  const material =

    useRef<MeshBasicMaterial>(null);





  const color =

    useMemo(

      () => new Color(),

      [],

    );





  const clock =

    useRef(0);





  useFrame((_, delta) => {


    if (

      !galaxy.current ||

      !material.current

    ) {

      return;

    }





    clock.current += delta;





    /*
     * Cosmic rotation
     */


    galaxy.current.rotation.y +=

      delta *

      (

        0.08 +

        state.actions.length *

        0.002

      );





    galaxy.current.rotation.x +=

      delta *

      0.015;





    /*
     * Living spectrum
     *
     * Simulates:
     * dawn → day → dusk → night
     */


    const cycle =

      (

        clock.current *

        0.015

      ) % 1;





    const activity =

      state.thinking

        ?

        0.15

        :

        0;





    color.setHSL(

      (

        cycle +

        activity

      ) % 1,


      0.75,


      0.45 +

      Math.sin(

        clock.current * 0.5

      ) *

      0.08,

    );





    material.current.color.copy(

      color,

    );





    /*
     * Cosmic breathing
     */


    material.current.opacity =

      0.10

      +

      Math.sin(

        clock.current * 2

      )

      *

      0.05

      +

      (

        state.thinking

          ?

          0.12

          :

          0

      );


  });





  return (

    <group

      ref={galaxy}

    >


      {/* Main Galaxy Ring */}


      <mesh>


        <torusGeometry

          args={[

            4,

            0.03,

            32,

            600,

          ]}

        />


        <meshBasicMaterial

          ref={material}

          toneMapped={false}

          transparent

          opacity={0.2}

        />


      </mesh>





      {/* Outer Cosmic Ring */}


      <mesh

        rotation={[

          0,

          0,

          1.57,

        ]}

      >


        <torusGeometry

          args={[

            4.3,

            0.015,

            16,

            400,

          ]}

        />


        <meshBasicMaterial

          color="#ffffff"

          transparent

          opacity={0.05}

        />


      </mesh>





      {/* Inner Light Ring */}


      <mesh

        rotation={[

          1.57,

          0,

          0,

        ]}

      >


        <torusGeometry

          args={[

            3.7,

            0.015,

            16,

            400,

          ]}

        />


        <meshBasicMaterial

          color="#88ccff"

          transparent

          opacity={0.04}

        />


      </mesh>


    </group>

  );

}