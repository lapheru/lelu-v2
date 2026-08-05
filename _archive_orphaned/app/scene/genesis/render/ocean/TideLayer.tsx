/**
 * ==========================================================
 * LÉLUVERSE
 * TIDE LAYER
 *
 * Planetary tidal circulation.
 *
 * Responsibilities
 * ----------------
 * • Tidal belts
 * • Planetary pulse
 * • Ocean expansion
 * • Lunar-style circulation
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Group } from "three";

import type { OceanState } from "./Ocean";

interface Props {
  oceanState?: OceanState;
}

export default function TideLayer({
  oceanState = {},
}: Props) {

  const tides = useRef<Group>(null);

  const belts = useMemo(
    () => Array.from({ length: 12 }),
    [],
  );

  const time = useRef(0);

  useFrame((_, delta) => {

    if (!tides.current) return;

    time.current += delta;

    const tide =
      oceanState.tide ?? 0.5;

    const tsunami =
      oceanState.tsunami ?? 0;

    tides.current.rotation.y +=
      delta *
      (0.08 + tide * 0.08);

    tides.current.rotation.x =
      Math.sin(time.current * 0.15) *
      0.04 *
      tide;

    tides.current.rotation.z =
      Math.cos(time.current * 0.18) *
      0.03 *
      tide;

    const pulse =
      1 +
      Math.sin(time.current * 1.1) *
      0.015 *
      tide +
      tsunami *
      0.04;

    tides.current.scale.set(
      pulse,
      pulse,
      pulse,
    );

    tides.current.children.forEach(
      (child, i) => {

        child.rotation.y +=
          delta *
          (0.03 + i * 0.005);

        child.rotation.x =
          Math.sin(
            time.current * 0.7 + i,
          ) *
          0.05;

      },
    );

  });

  return (

    <group ref={tides}>

      {belts.map((_, i) => {

        const radius =
          2.28 + i * 0.02;

        const tube =
          0.003 + i * 0.0003;

        const opacity =
          0.03 + i * 0.004;

        return (

          <mesh
            key={i}
            rotation={[
              Math.PI / 2,
              0,
              (Math.PI / belts.length) * i,
            ]}
          >

            <torusGeometry
              args={[
                radius,
                tube,
                32,
                256,
              ]}
            />

            <meshBasicMaterial

              color={
                i % 3 === 0
                  ? "#7fe7ff"
                  : i % 3 === 1
                  ? "#45d8ff"
                  : "#00b7ff"
              }

              transparent

              opacity={opacity}

            />

          </mesh>

        );

      })}

      {/* Polar tidal glow */}

      <pointLight
        position={[0, 3, 0]}
        color="#4fd8ff"
        intensity={1.5}
        distance={15}
      />

      <pointLight
        position={[0, -3, 0]}
        color="#4fd8ff"
        intensity={1.5}
        distance={15}
      />

    </group>

  );

}