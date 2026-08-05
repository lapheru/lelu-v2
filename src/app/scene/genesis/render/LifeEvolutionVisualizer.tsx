/**
 * ==========================================================
 * LÉLUVERSE
 * LIFE EVOLUTION VISUALIZER
 *
 * Living biosphere surrounding the Genesis.
 *
 * Thin life field that hugs the planet instead
 * of becoming another giant sphere.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Group } from "three";

import { useGenesis } from "../GenesisCore";

export default function LifeEvolutionVisualizer() {

  const { universe, getLiveUniverse } = useGenesis();

  const lifeGroup = useRef<Group>(null);

  const growthGroup = useRef<Group>(null);

  const time = useRef(0);

  const organisms = useMemo(
    () =>
      Array.from({
        length: 24,
      }),
    [],
  );

  useFrame((_, delta) => {

    if (
      !lifeGroup.current ||
      !growthGroup.current
    ) {
      return;
    }

    time.current += delta;

    const liveUniverse = getLiveUniverse();

    const life =
      liveUniverse.life ?? 0;

    const energy =
      liveUniverse.energy ?? 0;

    const awareness =
      liveUniverse.awareness ?? 0;

    const intelligence =
      liveUniverse.intelligence ?? 0;

    const growth =
      liveUniverse.evolutionSystem?.growth ?? 0;

    const mutation =
      liveUniverse.evolutionSystem?.mutation ?? 0;

    const adaptation =
      liveUniverse.evolutionSystem?.adaptation ?? 0;

    const activity =

      (
        life +
        energy +
        awareness +
        intelligence +
        growth +
        mutation +
        adaptation
      ) / 7;

    lifeGroup.current.scale.setScalar(

      1 +

      Math.sin(
        time.current * 0.40,
      ) *

      (
        0.003 +
        activity * 0.006
      ),

    );

    growthGroup.current.rotation.y +=

      delta *

      (
        0.02 +
        activity * 0.05
      );

    growthGroup.current.rotation.x =

      Math.sin(
        time.current * 0.15,
      ) *

      0.02 *

      activity;

  });

  const energySafe =
    universe.energy ?? 0;

  const awarenessSafe =
    universe.awareness ?? 0;

  return (

    <group
      ref={lifeGroup}
      name="LifeEvolution"
      renderOrder={10}
    >

      <mesh renderOrder={10}>

        <sphereGeometry
          args={[
            0.845,
            64,
            64,
          ]}
        />

        <meshBasicMaterial
          color="#55ff99"
          transparent
          opacity={
            0.02 +
            energySafe * 0.05
          }
          depthWrite={false}
          toneMapped={false}
        />

      </mesh>

      <group
        ref={growthGroup}
        name="EvolutionNodes"
      >

        {

          organisms.map((_, i) => (

            <mesh
              key={i}
              position={[

                Math.sin(i * 0.9) * 0.82,

                Math.cos(i * 1.3) * 0.82,

                Math.sin(i * 2.1) * 0.82,

              ]}
            >

              <sphereGeometry
                args={[
                  0.010 +
                  (i % 3) * 0.003,
                  10,
                  10,
                ]}
              />

              <meshBasicMaterial
                color="#8cffb8"
                transparent
                opacity={
                  0.12 +
                  awarenessSafe * 0.22
                }
                depthWrite={false}
                toneMapped={false}
              />

            </mesh>

          ))

        }

      </group>

      <pointLight
        color="#66ff99"
        intensity={
          0.5 +
          energySafe * 1.0
        }
        distance={2.8}
      />

    </group>

  );

}