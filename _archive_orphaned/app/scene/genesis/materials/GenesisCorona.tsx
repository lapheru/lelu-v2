import {
  useFrame,
} from "@react-three/fiber";

import {
  useRef,
} from "react";

import {
  Mesh,
} from "three";

interface Props {

  activity: number;

}

export default function GenesisCorona({

  activity,

}: Props) {

  const corona =

    useRef<Mesh>(null);

  useFrame((_, delta) => {

    if (!corona.current) {

      return;

    }

    const t = performance.now() * 0.001;

    corona.current.rotation.y += delta * 0.08;

    corona.current.rotation.z -= delta * 0.03;

    const scale =

      1.22 +

      Math.sin(t * 2.0) * 0.03 +

      activity * 0.025;

    corona.current.scale.setScalar(scale);

  });

  return (

    <mesh

      ref={corona}

      renderOrder={203}

    >

      <icosahedronGeometry

        args={[

          0.72,

          6,

        ]}

      />

      <meshBasicMaterial

        color="#6fdcff"

        transparent

        opacity={0.12}

        depthWrite={false}

        toneMapped={false}

        blending={2}

      />

    </mesh>

  );

}