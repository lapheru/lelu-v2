/**
 * ==========================================================
 * LÉLUVERSE
 * STAR FIELD
 *
 * Living celestial field.
 *
 * Connected to:
 * - Genesis universe state
 * - celestial energy
 * - cosmic evolution
 *
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
} from "../../GenesisCore";





interface StarData {

  position:
    [
      number,
      number,
      number
    ];

  size:number;

  color:string;

}





export default function StarField(){


  const {

    getLiveUniverse,

  } = useGenesis();





  const group =

    useRef<Group>(null);







  const stars =

    useMemo<StarData[]>(()=>{


      const palette = [


        "#ffffff",

        "#7dd3fc",

        "#c084fc",

        "#fef3c7",

      ];





      return Array.from(

        {

          length:350,

        },

        (_,index)=>({



          position:[


            (

              Math.random() -

              0.5

            )

            *

            35,



            (

              Math.random() -

              0.5

            )

            *

            25,



            -8 -

            Math.random()

            *

            20,



          ],




          size:


            0.03 +

            Math.random()

            *

            0.08,





          color:


            palette[

              index %

              palette.length

            ],



        }),


      );


    },[]);









  useFrame((_,delta)=>{


    if(!group.current)

      return;





    const liveUniverse = getLiveUniverse();
    const cosmicEnergy =

      liveUniverse.celestial?.cosmicEnergy

      ??

      0;





    group.current.rotation.y +=


      delta *

      (

        0.008 +

        cosmicEnergy *

        0.02

      );





    const scale =


      1 +

      cosmicEnergy *

      0.08 +

      liveUniverse.light *

      0.03;





    group.current.scale.setScalar(

      scale,

    );



  });








  return (



    <group

      ref={group}

      name="LivingStarField"

    >



      {

        stars.map((star,index)=>(



          <mesh

            key={index}

            position={star.position}

          >



            <sphereGeometry

              args={[

                star.size,

                12,

                12,

              ]}

            />



            <meshBasicMaterial

              color={star.color}

              transparent

              opacity={0.9}

              depthWrite={false}

            />



          </mesh>



        ))



      }



    </group>



  );

}