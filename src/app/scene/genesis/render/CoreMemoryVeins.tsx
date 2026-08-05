/**
 * ==========================================================
 * LÉLUVERSE
 * CORE MEMORY VEINS
 *
 * Living neural memory lattice.
 *
 * Thin orbital structures surrounding
 * the Genesis Core.
 *
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Group } from "three";

import { useGenesis } from "../GenesisCore";

export default function CoreMemoryVeins() {

  const { universe, getLiveUniverse } = useGenesis();

  const group = useRef<Group>(null);

  const veins = useMemo(
    () =>
      Array.from({
        length: 8,
      }),
    [],
  );

  useFrame((_, delta) => {

    if (!group.current)
      return;

    const liveUniverse = getLiveUniverse();

    const memoryEnergy = (

      liveUniverse.memory.shortTerm +

      liveUniverse.memory.longTerm +

      liveUniverse.memory.archived

    ) * 0.33;

    const emergence =
      liveUniverse.evolutionSystem.emergence;

    group.current.rotation.y +=
      delta *
      (
        0.012 +
        memoryEnergy * 0.02 +
        emergence * 0.01
      );

    group.current.rotation.x =
      Math.sin(performance.now() * 0.00008) *
      0.015;

    group.current.scale.setScalar(
      1 +
      memoryEnergy * 0.02
    );

  });

  const opacity =

    0.015 +

    universe.memory.importance * 0.08 +

    universe.pulse.intensity * 0.02;

  return (

    <group
      ref={group}
      name="CoreMemoryVeins"
      renderOrder={9}
    >

      {

        veins.map((_, index) => (

          <mesh
            key={index}
            rotation={[

              Math.PI * 0.35 +

              index * 0.45,

              index * 0.78,

              index * 0.22,

            ]}
          >

            <torusGeometry
              args={[

                0.815 +

                index * 0.006,

                0.0012,

                12,

                192,

              ]}
            />

            <meshBasicMaterial
              color="#8fefff"
              transparent
              opacity={opacity}
              depthWrite={false}
              toneMapped={false}
            />

          </mesh>

        ))

      }

    </group>

  );

}