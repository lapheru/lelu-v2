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

interface Whitecap {

  direction: Vector3;

  radius: number;

  size: number;

  speed: number;

  drift: number;

  offset: number;

  opacity: number;

}

const SURFACE_RADIUS = 3.18;

export default function Whitecaps({
  oceanState = {},
}: Props) {

  const group =
    useRef<Group>(null);

  const time =
    useRef(0);

  const caps =
    useMemo<Whitecap[]>(() => {

      return Array.from({

        length: 180,

      }, (): Whitecap => ({

        direction:
          new Vector3(
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
          ).normalize(),

        radius:
          SURFACE_RADIUS +
          Math.random() * 0.02,

        size:
          0.02 +
          Math.random() * 0.08,

        speed:
          0.20 +
          Math.random() * 0.40,

        drift:
          0.015 +
          Math.random() * 0.030,

        offset:
          Math.random() * 100,

        opacity:
          0.08 +
          Math.random() * 0.14,

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

      const cap =
        caps[i];

      const dir =
        cap.direction.clone();

      const t =
        time.current *
        cap.speed +
        cap.offset;

      dir.x +=
        Math.sin(t) *
        cap.drift *
        current;

      dir.y +=
        Math.cos(
          t * 0.85
        ) *
        cap.drift *
        tide;

      dir.z +=
        Math.cos(
          t * 1.20
        ) *
        cap.drift *
        current;

      dir.normalize();

      const radius =
        cap.radius +
        Math.sin(
          t * 3
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
          t * 3 +
          cap.offset
        ) *
        0.25;

      mesh.scale.setScalar(
        cap.size *
        pulse
      );

    });

  });
    return (

    <group ref={group}>

      {caps.map((

        cap,

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
              cap.opacity
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