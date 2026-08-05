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

interface Cluster {

  direction: Vector3;

  radius: number;

  size: number;

  speed: number;

  drift: number;

  offset: number;

  opacity: number;

}

const SURFACE_RADIUS = 3.18;

export default function FoamClusters({
  oceanState = {},
}: Props) {

  const group =
    useRef<Group>(null);

  const time =
    useRef(0);

  const clusters =
    useMemo<Cluster[]>(() => {

      return Array.from({

        length: 90,

      }, (): Cluster => ({

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
          0.08 +
          Math.random() * 0.18,

        speed:
          0.08 +
          Math.random() * 0.18,

        drift:
          0.02 +
          Math.random() * 0.04,

        offset:
          Math.random() * 100,

        opacity:
          0.18 +
          Math.random() * 0.18,

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

      const cluster =
        clusters[i];

      const dir =
        cluster.direction.clone();

      const t =
        time.current *
        cluster.speed +
        cluster.offset;

      dir.x +=
        Math.sin(t) *
        cluster.drift *
        current;

      dir.y +=
        Math.cos(
          t * 0.7
        ) *
        cluster.drift *
        tide;

      dir.z +=
        Math.cos(
          t * 1.1
        ) *
        cluster.drift *
        current;

      dir.normalize();

      const radius =
        cluster.radius +
        Math.sin(
          t * 2
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
          t * 2.5 +
          cluster.offset
        ) *
        0.18;

      mesh.scale.setScalar(
        cluster.size *
        pulse
      );

    });

  });
    return (

    <group ref={group}>

      {clusters.map((

        cluster,

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
              cluster.opacity
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