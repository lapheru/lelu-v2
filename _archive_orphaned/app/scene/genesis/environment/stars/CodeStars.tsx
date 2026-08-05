/**
 * ==========================================================
 * LÉLUVERSE
 * CODE STARS
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";

export default function CodeStars(){

  const glyphs=

    "<>{}[]()+=/*λ∞01";

  const stars=

    useMemo(()=>{

      return Array.from({

        length:140,

      }).map((_,id)=>({

        id,

        x:(Math.random()-.5)*380,

        y:(Math.random()-.5)*380,

        z:-Math.random()*380,

        size:.18,

        glyph:

          glyphs[

            Math.floor(

              Math.random()*

              glyphs.length,

            )

          ],

        speed:

          .2+

          Math.random(),

      }));

    },[]);

  useFrame(({clock},delta)=>{

    const t=

      clock.elapsedTime;

    stars.forEach(star=>{

      star.y-=

        star.speed*

        delta*12;

      star.x+=

        Math.sin(

          t+

          star.id,

        )*

        delta*.8;

      if(

        star.y<-220

      ){

        star.y=220;

      }

    });

  });

  return(

    <group>

      {

        stars.map(star=>(

          <group

            key={star.id}

            position={[

              star.x,

              star.y,

              star.z,

            ]}

          >

            <mesh>

              <planeGeometry

                args={[

                  star.size,

                  star.size,

                ]}

              />

              <meshBasicMaterial

                color="#73F5FF"

                transparent

                opacity={.85}

              />

            </mesh>

          </group>

        ))

      }

    </group>

  );

}