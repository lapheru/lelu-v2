/**
 * ==========================================================
 * LÉLUVERSE
 * OCEAN VISUALIZER
 *
 * Compact living ocean surrounding the Genesis Core.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Group } from "three";

import OceanShader from "./ocean/shaders/OceanShader";
import { useGenesis } from "../GenesisCore";

const OCEAN_RADIUS = 0.82;
const WAVE_RADIUS = 0.86;

export default function OceanVisualizer() {
  const { state } = useGenesis();

  const ocean = useRef<Group>(null);
  const waves = useRef<Group>(null);

  const time = useRef(0);

  const rings = useMemo(
    () =>
      Array.from({
        length: 6,
      }),
    [],
  );

  useFrame((_, delta) => {
    time.current += delta;

    if (OceanShader?.uniforms?.uTime?.value !== undefined) {
      OceanShader.uniforms.uTime.value = time.current;
    }

    if (!ocean.current || !waves.current) {
      return;
    }

    const water = (state as any).ocean ?? {};

    const tide = water.tide ?? 0.5;
    const tsunami = water.tsunami ?? 0;
    const current = water.current ?? 0.5;

    ocean.current.rotation.y += delta * current * 0.01;

    const pulse =
      1 +
      Math.sin(time.current * 0.8) *
        0.008 *
        tide;

    ocean.current.scale.setScalar(pulse);

    waves.current.rotation.y += delta * current * 0.15;

    const waveScale =
      1 +
      Math.min(tsunami, 1) *
        0.06;

    waves.current.scale.setScalar(waveScale);
  });

  return (
    <group ref={ocean}>
      <mesh>
        <sphereGeometry
          args={[
            OCEAN_RADIUS,
            128,
            128,
          ]}
        />
        <primitive
          object={OceanShader}
          attach="material"
        />
      </mesh>

      <group ref={waves}>
        {rings.map((_, i) => (
          <mesh
            key={i}
            rotation={[
              Math.PI / 2,
              0,
              0,
            ]}
          >
            <torusGeometry
              args={[
                WAVE_RADIUS +
                  i * 0.025,
                0.003,
                20,
                96,
              ]}
            />
            <meshBasicMaterial
              color="#33ccff"
              transparent
              opacity={
                0.03 - i * 0.003
              }
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      <pointLight
        color="#33aaff"
        intensity={0.8}
        distance={8}
      />
    </group>
  );
}