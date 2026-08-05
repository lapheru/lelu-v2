/**
 * ==========================================================
 * LÉLUVERSE
 * BROWSER ACTION VISUALIZER
 *
 * Turns Lélu actions into
 * visible Genesis activity.
 *
 * Shows:
 * - browsing
 * - searching
 * - building
 * - learning
 * - creating
 * ==========================================================
 */


import {
  useFrame,
} from "@react-three/fiber";


import {
  useMemo,
  useRef,
} from "react";


import * as THREE
  from "three";


import {
  useGenesis,
} from "./GenesisCore";





interface ActionOrbProps {


  index:
    number;

  type?: string;

}





function ActionOrb({

  index,
  type,
}: ActionOrbProps) {


  const mesh =

    useRef<THREE.Mesh>(null);





  const position =

    useMemo<

      [

        number,

        number,

        number

      ]

    >(

      () =>

        [

          Math.sin(index * 1.8) * 3,


          1.5 + index * 0.3,


          Math.cos(index * 1.8) * 3,

        ],

      [

        index,

      ],

    );





  useFrame(

    (

      state,

    ) => {


      if (

        !mesh.current

      ) {


        return;

      }





      const time =

        state.clock.elapsedTime;





      void type;

      mesh.current.rotation.y =

        time * 0.5;





      mesh.current.position.y =

        position[1] +

        Math.sin(

          time + index,

        ) *

        0.15;


    },

  );





  return (

    <mesh

      ref={mesh}

      position={position}

    >


      <sphereGeometry

        args={[

          0.18,

          20,

          20,

        ]}

      />



      <meshStandardMaterial />


    </mesh>

  );

}





export default function BrowserActionVisualizer() {


  const {

    state,

  } = useGenesis();





  return (
    <>
      {state.actions.map((action, index) => (
        <ActionOrb
          key={action.id}
          index={index}
          type={action.type}
        />
      ))}
    </>
  );

}