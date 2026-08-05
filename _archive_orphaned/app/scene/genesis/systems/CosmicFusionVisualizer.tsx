/**
 * ==========================================================
 * LÉLUVERSE
 * COSMIC FUSION VISUALIZER
 *
 * Visible universe plasma field.
 *
 * Features:
 * - stellar glow
 * - cosmic rings
 * - radiation waves
 * - elemental shimmer
 *
 * Visual layer only.
 * ==========================================================
 */


import {
  useFrame,
} from "@react-three/fiber";


import {
  useRef,
} from "react";


import {
  Color,
  Group,
} from "three";


import {
  useGenesis,
} from "../GenesisCore";





export default function CosmicFusionVisualizer() {


  const {

    state,

  } = useGenesis();





  const cosmos =

    useRef<Group>(null);





  const rings =

    useRef<Group>(null);





  const time =

    useRef(0);





  const color =

    useRef(

      new Color("#55ddff")

    );





  useFrame((_,delta)=>{


    if (

      !cosmos.current ||

      !rings.current

    ) {

      return;

    }





    time.current += delta;





    const energy =

      (state as any).cosmicFusion?.radiation

      ??

      0.5;





    /*
     * Cosmic breathing
     */


    cosmos.current.scale.setScalar(

      1 +

      Math.sin(

        time.current *

        0.4

      )

      *

      0.05

      +

      energy *

      0.1

    );





    /*
     * Stellar rotation
     */


    rings.current.rotation.y +=

      delta *

      (

        0.15 +

        energy

      );





    /*
     * Element spectrum
     */


    color.current.setHSL(

      0.55 -

      energy *

      0.5,

      0.9,

      0.6

    );





    cosmos.current.traverse(

      object=>{


        const material =

          (object as any).material;


        if(material){


          material.color.copy(

            color.current

          );


        }


      }

    );


  });





  return (

    <group

      ref={cosmos}

    >


      {/* Cosmic plasma sphere */}


      <mesh>


        <sphereGeometry

          args={[

            1.8,

            64,

            64,

          ]}

        />


        <meshBasicMaterial

          transparent

          opacity={0.03}

        />


      </mesh>





      {/* Fusion orbit rings */}


      <group

        ref={rings}

      >


        <mesh>


          <torusGeometry

            args={[

              2,

              0.015,

              32,

              256,

            ]}

          />


          <meshBasicMaterial

            transparent

            opacity={0.25}

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

              2.4,

              0.01,

              32,

              256,

            ]}

          />


          <meshBasicMaterial

            transparent

            opacity={0.15}

          />


        </mesh>


      </group>





      <pointLight

        intensity={18}

        distance={60}

        color="#66ddff"

      />


    </group>

  );

}