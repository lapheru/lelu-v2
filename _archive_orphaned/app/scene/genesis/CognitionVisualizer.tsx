/**
 * ==========================================================
 * LÉLUVERSE
 * COGNITION VISUALIZER
 *
 * Converts cognition state into Genesis objects
 * ==========================================================
 */


import {
  useGenesis,
} from "./GenesisCore";





interface CognitionNodeProps {

  index:
    number;

}





function CognitionNode({

  index,

}: CognitionNodeProps) {


  return (

    <mesh

      position={[

        index * 0.7 - 1,

        1.2,

        -2,

      ]}

    >


      <sphereGeometry

        args={[

          0.08,

          16,

          16,

        ]}

      />


      <meshBasicMaterial

        color="#a855f7"

      />


    </mesh>

  );

}





export default function CognitionVisualizer() {


  const {

    state,

  } = useGenesis();





  if (!state.cognition) {

    return null;

  }





  const count =

    state.cognition.agents.length

    +

    state.cognition.workspaces.length;





  return (

    <>


      {

        Array.from({

          length: count,

        }).map(

          (_, index) => (

            <CognitionNode

              key={index}

              index={index}

            />

          ),

        )

      }


    </>

  );

}