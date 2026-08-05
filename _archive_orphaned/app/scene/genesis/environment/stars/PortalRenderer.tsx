/**
 * ==========================================================
 * LÉLUVERSE
 * PORTAL RENDERER
 *
 * Shared renderer.
 * Uses the global PortalEngine.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";

import {

  getPortals,

  updatePortals,

} from "./PortalEngine";

export default function PortalRenderer(){

  useFrame((_,delta)=>{

    updatePortals(

      delta,

    );

  });

  return(

    <group>

      {

        getPortals().map(

          portal=>(

            <group

              key={portal.id}

              position={

                portal.position

              }

              rotation={[

                0,

                0,

                portal.rotation,

              ]}

            >

              {/* Outer Ring */}

              <mesh>

                <torusGeometry

                  args={[

                    portal.radius,

                    .18,

                    24,

                    96,

                  ]}

                />

                <meshBasicMaterial

                  transparent

                  opacity={

                    .18+

                    portal.energy*

                    .4

                  }

                  color={

                    portal.event==="warp"

                    ?"#7DDFFF"

                    :portal.event==="code"

                    ?"#00F8FF"

                    :portal.event==="memory"

                    ?"#FFD966"

                    :portal.event==="galaxy"

                    ?"#9C7BFF"

                    :portal.event==="crystal"

                    ?"#8FFFF1"

                    :"#66CCFF"

                  }

                />

              </mesh>

              {/* Inner Ring */}

              <mesh

                rotation={[

                  Math.PI/2,

                  0,

                  0,

                ]}

              >

                <torusGeometry

                  args={[

                    portal.radius*.72,

                    .08,

                    18,

                    72,

                  ]}

                />

                <meshBasicMaterial

                  transparent

                  opacity={

                    .25+

                    portal.energy*

                    .35

                  }

                  color="#FFFFFF"

                />

              </mesh>

              {/* Core */}

              <mesh>

                <sphereGeometry

                  args={[

                    .22+

                    portal.energy*

                    .4,

                    18,

                    18,

                  ]}

                />

                <meshBasicMaterial

                  color="#FFFFFF"

                />

              </mesh>

            </group>

          ),

        )

      }

    </group>

  );

}