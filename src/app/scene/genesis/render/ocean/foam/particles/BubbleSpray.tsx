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

interface Bubble {

  direction: Vector3;

  radius: number;

  size: number;

  speed: number;

  drift: number;

  offset: number;

  opacity: number;

}

const SURFACE_RADIUS = 3.18;

export default function BubbleSpray({
  oceanState = {},
}: Props) {

  const group =
    useRef<Group>(null);

  const time =
    useRef(0);

  const bubbles =
    useMemo<Bubble[]>(() => {

      return Array.from({

        length: 180,

      }, (): Bubble => ({

        direction:
          new Vector3(
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
          ).normalize(),

        radius:
          SURFACE_RADIUS +
          Math.random() * 0.03,

        size:
          0.02 +
          Math.random() * 0.05,

        speed:
          0.20 +
          Math.random() * 0.35,

        drift:
          0.02 +
          Math.random() * 0.05,

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

    const current =
      oceanState.current ?? 0.5;

    const tide =
      oceanState.tide ?? 0.5;

    group.current.children.forEach((child, i) => {

      const mesh =
        child as Mesh;

      const bubble =
        bubbles[i];

      const dir =
        bubble.direction.clone();

      const t =
        time.current *
        bubble.speed +
        bubble.offset;

      dir.x +=
        Math.sin(t) *
        bubble.drift *
        current;

      dir.y +=
        Math.cos(
          t * 0.8
        ) *
        bubble.drift *
        0.6 *
        tide;

      dir.z +=
        Math.cos(
          t * 1.15
        ) *
        bubble.drift *
        current;

      dir.normalize();

      const radius =
        bubble.radius +

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
        new Vector3(
          0,
          0,
          1,
        ),
        dir,
      );

      mesh.rotateZ(
        t
      );

      const pulse =
        1 +

        Math.sin(
          t * 4 +
          bubble.offset
        ) *
        0.25;

      mesh.scale.setScalar(
        bubble.size *
        pulse
      );

    });

  });
    return (

    <group ref={group}>

      {bubbles.map((

        bubble,

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
              bubble.opacity
            }

            side={
              DoubleSide
            }

            depthWrite={false}

            depthTest={true}

            toneMapped={false}

          />

        </mesh>

      ))}

    </group>

  );

}