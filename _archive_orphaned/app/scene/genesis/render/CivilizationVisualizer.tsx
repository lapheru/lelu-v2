/**
 * ==========================================================
 * LÉLUVERSE
 * CIVILIZATION VISUALIZER
 *
 * Intelligence evolution layer.
 *
 * Displays:
 * - civilization networks
 * - knowledge fields
 * - neural connections
 * - collective intelligence
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





export default function CivilizationVisualizer() {


  const {

    state,

  } = useGenesis();





  const civilization =

    useRef<Group>(null);


  const network =

    useRef<Group>(null);





  const time =

    useRef(0);





  const nodes = useMemo(

    () =>

      Array.from({

        length:60,

      }),

    [],

  );





  useFrame((_,delta)=>{


    if (

      !civilization.current ||

      !network.current

    ) {

      return;

    }





    time.current += delta;





    const intelligence =

      (state as any)

        .intelligence

        ??

        0;





    const civilizationLevel =

      (state as any)

        .civilizations

        ??

        0;





    /*
     * Civilization breathing
     */


    civilization.current.scale.setScalar(

      1 +

      civilizationLevel *

      0.1

    );





    /*
     * Knowledge network evolution
     */


    network.current.rotation.y +=

      delta *

      (

        0.05 +

        intelligence *

        0.5

      );


  });





  return (

    <group

      ref={civilization}

    >


      {/* ======================================
          INTELLIGENCE FIELD
      ====================================== */}


      <mesh>


        <sphereGeometry

          args={[

            3.2,

            48,

            48,

          ]}

        />


        <meshBasicMaterial

          color="#bb88ff"

          transparent

          opacity={0.02}

        />


      </mesh>





      {/* ======================================
          KNOWLEDGE NETWORK
      ====================================== */}


      <group

        ref={network}

      >


        {

          nodes.map((_,i)=>(


            <mesh

              key={i}

              position={[

                Math.sin(i*1.7)*2.5,

                Math.cos(i*2.1)*2,

                Math.sin(i*0.8)*2.5,

              ]}

            >


              <sphereGeometry

                args={[

                  0.025,

                  12,

                  12,

                ]}

              />


              <meshBasicMaterial

                color="#ffffff"

                transparent

                opacity={0.5}

              />


            </mesh>


          ))

        }


      </group>





      <pointLight

        intensity={8}

        distance={50}

        color="#bb88ff"

      />


    </group>

  );

}