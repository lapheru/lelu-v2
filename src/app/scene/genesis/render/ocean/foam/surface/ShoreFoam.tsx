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

interface FoamPatch {

  direction: Vector3;

  radius: number;

  size: number;

  speed: number;

  drift: number;

  offset: number;

  opacity: number;

}

const SURFACE_RADIUS = 3.20;

export default function ShoreFoam({
  oceanState = {},
}: Props) {

  const group =
    useRef<Group>(null);

  const time =
    useRef(0);

  const foam =
    useMemo<FoamPatch[]>(() => {

      return Array.from({

        length: 220,

      }, (): FoamPatch => ({

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
          Math.random() * 0.08,

        speed:
          0.08 +
          Math.random() * 0.25,

        drift:
          0.015 +
          Math.random() * 0.035,

        offset:
          Math.random() * 100,

        opacity:
          0.06 +
          Math.random() * 0.10,

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

      const patch =
        foam[i];

      const dir =
        patch.direction.clone();

      const t =
        time.current *
        patch.speed +
        patch.offset;

      dir.x +=
        Math.sin(t) *
        patch.drift *
        current;

      dir.y +=
        Math.cos(
          t * 0.75
        ) *
        patch.drift *
        tide;

      dir.z +=
        Math.cos(
          t * 1.15
        ) *
        patch.drift *
        current;

      dir.normalize();

      const radius =
        patch.radius +

        Math.sin(
          t * 2.5
        ) *
        0.015 *
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
          t * 2.5 +
          patch.offset
        ) *
        0.18;

      mesh.scale.setScalar(
        patch.size *
        pulse
      );

    });

  });
    return (

    <group ref={group}>

      {foam.map((

        patch,

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
              patch.opacity
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