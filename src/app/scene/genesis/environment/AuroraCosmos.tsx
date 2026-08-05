/**
 * ==========================================================
 * LÉLUVERSE
 * AURORA COSMOS
 *
 * Living cosmic ribbons.
 *
 * Visible atmospheric layer.
 * Surrounds Genesis space without blocking core.
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





interface Ribbon {

  x:number;

  y:number;

  z:number;

  rotation:number;

  scale:number;

  speed:number;

  pulse:number;

  color:string;

}





const COUNT = 24;





export default function AuroraCosmos(){


  const root =

    useRef<Group>(null);





  const ribbons =

    useMemo<Ribbon[]>(()=>{


      const colors = [

        "#00FFE0",

        "#00D8FF",

        "#5D8CFF",

        "#7E5FFF",

        "#A56DFF",

      ];





      return Array.from({

        length:COUNT,

      }).map(()=>({



        x:

          (Math.random() - 0.5)

          *

          14,



        y:

          (Math.random() - 0.5)

          *

          10,



        z:

          -3 -

          Math.random()

          *

          8,



        rotation:

          Math.random()

          *

          Math.PI

          *

          2,



        scale:

          2 +

          Math.random()

          *

          5,



        speed:

          0.01 +

          Math.random()

          *

          0.02,



        pulse:

          Math.random()

          *

          Math.PI

          *

          2,



        color:

          colors[

            Math.floor(

              Math.random()

              *

              colors.length

            )

          ],


      }));


    },[]);







  useFrame(({clock},delta)=>{


    if(!root.current)

      return;





    const t =

      clock.elapsedTime;





    root.current.children.forEach(

      (mesh,index)=>{


        const r =

          ribbons[index];





        mesh.rotation.z +=


          delta *

          r.speed;





        mesh.rotation.y +=


          delta *

          r.speed *

          0.5;







        mesh.position.x =


          r.x +

          Math.sin(

            t *

            0.08 +

            index

          )

          *

          0.4;







        mesh.position.y =


          r.y +

          Math.cos(

            t *

            0.06 +

            index

          )

          *

          0.3;







        const glow =


          0.8 +

          Math.sin(

            t *

            1.4 +

            r.pulse

          )

          *

          0.2;







        mesh.scale.set(

          r.scale,

          glow *

          2,

          1,

        );


      },

    );


  });







  return (



    <group

      ref={root}

      name="AuroraCosmos"

      renderOrder={5}

    >



      {

        ribbons.map((r,i)=>(



          <mesh

            key={i}

            position={[

              r.x,

              r.y,

              r.z,

            ]}

            rotation={[

              0,

              0,

              r.rotation,

            ]}

          >



            <planeGeometry

              args={[

                3,

                0.15,

              ]}

            />



            <meshBasicMaterial

              color={r.color}

              transparent

              opacity={0.12}

              depthWrite={false}

            />



          </mesh>



        ))

      }



    </group>


  );


}