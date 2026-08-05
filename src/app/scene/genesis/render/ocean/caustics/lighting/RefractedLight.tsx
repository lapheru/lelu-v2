/**
 * ==========================================================
 * LÉLUVERSE
 * REFRACTED LIGHT
 *
 * Dynamic shafts of refracted light passing through
 * the Genesis Ocean.
 *
 * Responsibilities
 * ----------------
 * • Light shafts
 * • Surface refraction
 * • Slow drifting beams
 * • Tide response
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import {
  Group,
  Mesh,
  DoubleSide,
} from "three";
import {
  useMemo,
  useRef,
} from "react";

import type { OceanState } from "../../Ocean";

interface Props {
  oceanState?: OceanState;
}

interface Beam {

  radius: number;

  angle: number;

  y: number;

  width: number;

  height: number;

  speed: number;

  offset: number;

  opacity: number;

}

export default function RefractedLight({
  oceanState = {},
}: Props) {

  const group =
    useRef<Group>(null);

  const time =
    useRef(0);

  const beams = useMemo<Beam[]>(() => {

    return Array.from({

      length: 48,

    }, (): Beam => ({

      radius:
        1.4 +
        Math.random() * 0.9,

      angle:
        Math.random() *
        Math.PI * 2,

      y:
        1.4 +
        Math.random() * 1.0,

      width:
        0.05 +
        Math.random() * 0.08,

      height:
        0.8 +
        Math.random() * 1.6,

      speed:
        0.15 +
        Math.random() * 0.4,

      offset:
        Math.random() * 100,

      opacity:
        0.02 +
        Math.random() * 0.04,

    }));

  }, []);

  useFrame((_, delta) => {

    if (!group.current)
      return;

    time.current += delta;

    const tide =
      oceanState.tide ?? 0.5;

    const current =
      oceanState.current ?? 0.5;

    group.current.children.forEach(
      (child, i) => {

        const mesh =
          child as Mesh;

        const beam =
          beams[i];

        const angle =

          beam.angle +

          time.current *

          beam.speed *

          0.12 *

          current;

        mesh.position.x =

          Math.cos(angle) *

          beam.radius;

        mesh.position.z =

          Math.sin(angle) *

          beam.radius;

        mesh.position.y =

          beam.y +

          Math.sin(

            time.current +

            beam.offset,

          ) *

          0.08 *

          tide;

        mesh.lookAt(

          0,

          0,

          0,

        );

        mesh.rotateX(

          Math.PI / 2,

        );

        mesh.rotation.z +=

          delta *

          beam.speed *

          0.3;

      },

    );

  });

  return (

    <group ref={group}>

      {beams.map((

        beam,

        i,

      ) => (

        <mesh

          key={i}

        >

          <planeGeometry

            args={[

              beam.width,

              beam.height,

            ]}

          />

          <meshBasicMaterial

            color="#dffcff"

            transparent

            opacity={

              beam.opacity

            }

            side={

              DoubleSide

            }

            depthWrite={false}

          />

        </mesh>

      ))}

    </group>

  );

}