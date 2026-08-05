/**
 * ==========================================================
 * LÉLUVERSE
 * CORE ATMOSPHERE SYSTEM
 *
 * Thin living atmospheric shell surrounding
 * the Genesis Core.
 *
 * Enhanced luminous atmosphere.
 *
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  AdditiveBlending,
  Group,
  Mesh,
  MeshBasicMaterial,
} from "three";

import { useGenesis } from "../GenesisCore";

export default function CoreAtmosphere() {

  const { getLiveUniverse } = useGenesis();

  const field = useRef<Group>(null);

  const aura = useRef<Mesh>(null);

  const aurora = useRef<Mesh>(null);

  const resonance = useRef<Mesh>(null);

  const time = useRef(0);

  useFrame((_, delta) => {

    if (
      !field.current ||
      !aura.current ||
      !aurora.current ||
      !resonance.current
    ) {
      return;
    }

    time.current += delta;

    field.current.rotation.y +=
      delta * 0.012;

    const liveUniverse = getLiveUniverse();
    const activity = Math.min(
      1,
      0.18 +
      liveUniverse.energy * 0.30 +
      liveUniverse.awareness * 0.22 +
      liveUniverse.evolutionSystem.emergence * 0.30,
    );

    const breathe =
      Math.sin(time.current * 0.55);

    const auraMaterial = aura.current.material as MeshBasicMaterial;
    const auroraMaterial = aurora.current.material as MeshBasicMaterial;
    const resonanceMaterial = resonance.current.material as MeshBasicMaterial;
    auraMaterial.opacity = 0.07 + activity * 0.08;
    auroraMaterial.opacity = 0.04 + activity * 0.07;
    resonanceMaterial.opacity = 0.025 + activity * 0.05;

    aura.current.scale.setScalar(
      1 +
      breathe * 0.008
    );

    aurora.current.scale.setScalar(
      1.018 +
      Math.sin(time.current * 0.42) * 0.006
    );

    resonance.current.scale.setScalar(
      1.034 +
      Math.sin(time.current * 0.70) * 0.004
    );

  });

  return (

    <group
      ref={field}
      name="CoreAtmosphere"
      renderOrder={6}
    >

      {/* Inner Aura */}

      <mesh
        ref={aura}
        renderOrder={6}
      >

        <sphereGeometry
          args={[
            0.94,
            96,
            96,
          ]}
        />

        <meshBasicMaterial
          color="#7cecff"
          transparent
          opacity={0.08}
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />

      </mesh>

      {/* Aurora */}

      <mesh
        ref={aurora}
        renderOrder={7}
      >

        <sphereGeometry
          args={[
            0.99,
            96,
            96,
          ]}
        />

        <meshBasicMaterial
          color="#9ef8ff"
          transparent
          opacity={0.05}
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />

      </mesh>

      {/* Resonance */}

      <mesh
        ref={resonance}
        renderOrder={8}
      >

        <sphereGeometry
          args={[
            1.04,
            96,
            96,
          ]}
        />

        <meshBasicMaterial
          color="#dffcff"
          transparent
          opacity={0.03}
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />

      </mesh>

      <pointLight
        color="#79e8ff"
        intensity={1.5}
        distance={4.5}
      />

    </group>

  );

}