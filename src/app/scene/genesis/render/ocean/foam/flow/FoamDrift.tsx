import {
  useMemo,
  useRef,
} from "react";

import {
  Group,
  DoubleSide,
  Vector3,
} from "three";

import type { OceanState } from "../../Ocean";

interface Props {
  oceanState?: OceanState;
}

interface DriftParticle {

  direction: Vector3;

  radius: number;

  size: number;

  speed: number;

  offset: number;

  opacity: number;

}

const SURFACE_RADIUS = 3.18;

export default function FoamDrift({
  oceanState: _oceanState = {},
}: Props) {

  const group =
    useRef<Group>(null);

  const particles =
    useMemo<DriftParticle[]>(() => {

      return Array.from({

        length: 260,

      }, (): DriftParticle => ({

        direction:
          new Vector3(
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
          ).normalize(),

        radius:
          SURFACE_RADIUS +
          Math.random() * 0.025,

        size:
          0.03 +
          Math.random() * 0.10,

        speed:
          0.05 +
          Math.random() * 0.18,

        offset:
          Math.random() * 100,

        opacity:
          0.05 +
          Math.random() * 0.08,

      }));

    }, []);
      return (

    <group ref={group}>

      {particles.map((

        particle,

        i,

      ) => (

        <mesh
          key={i}
          frustumCulled={false}
          renderOrder={2}
        >

          <circleGeometry
            args={[
              1,
              10,
            ]}
          />

          <meshBasicMaterial

            color="#ffffff"

            transparent

            opacity={
              particle.opacity
            }

            side={
              DoubleSide
            }

            depthWrite={false}

            depthTest

            toneMapped={false}

          />

        </mesh>

      ))}

    </group>

  );

}