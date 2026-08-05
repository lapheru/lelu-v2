/**
 * ==========================================================
 * LÉLUVERSE
 * PULSE STARS
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";

export default function PulseStars() {

  const stars = useMemo(() => {

    return Array.from({

      length: 220,

    }).map((_, id) => ({

      id,

      x:(Math.random()-.5)*420,

      y:(Math.random()-.5)*420,

      z:-Math.random()*420,

      size:.02+Math.random()*.05,

      pulse:Math.random()*Math.PI*2,

      speed:.5+Math.random()*2,

    }));

  },[]);

  useFrame(({clock})=>{

    const t=clock.elapsedTime;

    stars.forEach(star=>{

      star.size=

        .02+

        Math.abs(

          Math.sin(

            t*star.speed+

            star.pulse,

          )

        )*.08;

    });

  });

  return(

    <group>

      {

        stars.map(star=>(

          <mesh

            key={star.id}

            position={[

              star.x,

              star.y,

              star.z,

            ]}

            scale={star.size}

          >

            <sphereGeometry

              args={[

                1,

                5,

                5,

              ]}

            />

            <meshBasicMaterial

              color="#A9EFFF"

            />

          </mesh>

        ))

      }

    </group>

  );

}