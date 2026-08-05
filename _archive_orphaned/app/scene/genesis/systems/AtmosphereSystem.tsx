/**
 * ==========================================================
 * LÉLUVERSE
 * ATMOSPHERE SYSTEM
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { useRef } from "react";

import { useGenesis } from "../GenesisCore";

export default function AtmosphereSystem() {

  const { state } = useGenesis();

  const atmosphere = useRef<Mesh>(null);

  useFrame((_, delta) => {

    if (!atmosphere.current) return;

    atmosphere.current.rotation.y +=
      delta * 0.01;

    const scale =
      1.08 +
      (state.thinking ? 0.02 : 0);

    atmosphere.current.scale.setScalar(scale);
    atmosphere.current.visible = true;

  });

  return (

    <mesh ref={atmosphere}>

      <sphereGeometry args={[1.05,64,64]} />

      <meshBasicMaterial

        color="#7fdfff"

        transparent

        opacity={0.12}

        depthWrite={false}

      />

    </mesh>

  );

}