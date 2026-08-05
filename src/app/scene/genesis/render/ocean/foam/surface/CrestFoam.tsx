import { useFrame } from "@react-three/fiber";
import {
  useMemo,
  useRef,
} from "react";

import {
  Group,
  Mesh,
  DoubleSide,
  Vector3,
} from "three";

import type { OceanState } from "../../Ocean";

interface Props {
  oceanState?: OceanState;
}

interface Crest {

  direction: Vector3;

  radius: number;

  size: number;

  speed: number;

  drift: number;

  offset: number;

  opacity: number;

}

const SURFACE_RADIUS = 3.18;

export default function CrestFoam({
  oceanState = {},
}: Props) {

  const group =
    useRef<Group>(null);

  const time =
    useRef(0);

  const crests =
    useMemo<Crest[]>(() => {

      return Array.from({

        length: 120,

      }, (): Crest => ({

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
          0.04 +
          Math.random() * 0.10,

        speed:
          0.15 +
          Math.random() * 0.45,

        drift:
          0.02 +
          Math.random() * 0.04,

        offset:
          Math.random() * 100,

        opacity:
          0.08 +
          Math.random() * 0.12,

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

    const up =
      new Vector3(0, 0, 1);

    group.current.children.forEach((child, i) => {

      const mesh =
        child as Mesh;

      const crest =
        crests[i];

      const dir =
        crest.direction.clone();

      const t =
        time.current *
        crest.speed +
        crest.offset;

      dir.x +=
        Math.sin(t) *
        crest.drift *
        current;

      dir.y +=
        Math.cos(
          t * 0.75
        ) *
        crest.drift *
        tide;

      dir.z +=
        Math.cos(
          t * 1.25
        ) *
        crest.drift *
        current;

      dir.normalize();

      const radius =
        crest.radius +

        Math.sin(
          t * 3
        ) *
        0.02 *
        tide;

      mesh.position.copy(
        dir.multiplyScalar(
          radius
        )
      );

      mesh.quaternion.setFromUnitVectors(
        up,
        dir,
      );

      mesh.rotateZ(
        t
      );

      const pulse =
        1 +

        Math.sin(
          t * 3 +
          crest.offset
        ) *
        0.20;

      mesh.scale.setScalar(
        crest.size *
        pulse
      );

    });

  });
    return (

    <group ref={group}>

      {crests.map((

        crest,

        i,

      ) => (

        <mesh

          key={i}

          frustumCulled={false}

          renderOrder={3}

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
              crest.opacity
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