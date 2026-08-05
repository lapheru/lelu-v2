import {
  AdditiveBlending,
  Color,
  Mesh,
} from "three";

import {
  useFrame,
} from "@react-three/fiber";

import {
  useMemo,
  useRef,
} from "react";

interface Props {

  activity: number;

}

export default function GenesisSeed({

  activity,

}: Props) {

  const seed =

    useRef<Mesh>(null);

  const glow =

    useMemo(

      () => new Color("#7be8ff"),

      [],

    );

  useFrame((_, delta) => {

    if (!seed.current) {

      return;

    }

    const pulse =

      1 +

      Math.sin(

        performance.now() * 0.003

      ) *

      (

        0.06 +

        activity * 0.02

      );

    seed.current.scale.setScalar(

      pulse

    );

    seed.current.rotation.y +=

      delta * 0.35;

    seed.current.rotation.x +=

      delta * 0.08;

  });

  return (

    <mesh

      ref={seed}

      renderOrder={202}

    >

      <sphereGeometry

        args={[

          0.09,

          64,

          64,

        ]}

      />

      <meshBasicMaterial

        color={glow}

        transparent

        opacity={0.95}

        blending={AdditiveBlending}

        depthWrite={false}

        toneMapped={false}

      />

      <pointLight

        color="#7be8ff"

        intensity={

          22 +

          activity * 14

        }

        distance={35}

      />

    </mesh>

  );

}