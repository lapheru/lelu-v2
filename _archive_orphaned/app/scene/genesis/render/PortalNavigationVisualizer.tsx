/**
 * ==========================================================
 * LÉLUVERSE
 * PORTAL NAVIGATION VISUALIZER
 *
 * Living navigation layer.
 *
 * Displays:
 * - cosmic portals
 * - travel nodes
 * - dimensional gates
 * - navigation paths
 *
 * Visual layer only.
 * ==========================================================
 */


import {
  useFrame,
} from "@react-three/fiber";


import {
  useMemo,
  useRef,
} from "react";


import {
  Group,
} from "three";


import {
  useGenesis,
} from "../GenesisCore";





export default function PortalNavigationVisualizer() {


  const {

    state,

  } = useGenesis();





  const portals =

    useRef<Group>(null);


  const gates =

    useRef<Group>(null);





  const time =

    useRef(0);





  const nodes = useMemo(

    () =>

      Array.from({

        length:8,

      }),

    [],

  );





  useFrame((_,delta)=>{


    if (

      !portals.current ||

      !gates.current

    ) {

      return;

    }





    time.current += delta;





    const activity =

      state.actions.length;





    const intelligence =

      (state as any)

        .intelligence

        ??

        0.3;





    /*
     * Portal breathing
     */


    portals.current.scale.setScalar(

      1 +

      Math.sin(

        time.current *

        0.8

      )

      *

      0.05

    );





    /*
     * Gate rotation
     */


    gates.current.rotation.y +=

      delta *

      (

        0.2 +

        intelligence *

        0.5 +

        activity *

        0.001

      );


  });





  return (

    <group

      ref={portals}

    >


      {/* ======================================
          PORTAL FIELD
      ====================================== */}


      <group

        ref={gates}

      >


        {

          nodes.map((_,i)=>(


            <mesh

              key={i}

              position={[

                Math.cos(i) *

                3,

                Math.sin(i*2) *

                1.5,

                Math.sin(i) *

                3,

              ]}

            >


              <torusGeometry

                args={[

                  0.35 +

                  i *

                  0.03,

                  0.015,

                  24,

                  96,

                ]}

              />


              <meshBasicMaterial

                color="#55ccff"

                transparent

                opacity={0.35}

              />


            </mesh>


          ))

        }


      </group>





      <pointLight

        intensity={8}

        distance={80}

        color="#55ccff"

      />


    </group>

  );

}