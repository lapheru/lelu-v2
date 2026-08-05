/**
 * ==========================================================
 * LÉLUVERSE
 * CORE LAYER
 *
 * Living Genesis Core controller.
 *
 * Controls only:
 * - breathing
 * - rotation
 * - subtle motion
 *
 * Never changes the physical size of the Genesis.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";

import { useGenesis } from "../GenesisCore";

interface Props {
  children?: React.ReactNode;
}

export default function CoreLayer({
  children,
}: Props) {

  const { getLiveUniverse } = useGenesis();

  const root = useRef<Group>(null);

  const time = useRef(0);

  useFrame((_, delta) => {

    if (!root.current)
      return;

    time.current += delta;

    const liveUniverse = getLiveUniverse();

    const energy =
      liveUniverse.energy ?? 0;

    const awareness =
      liveUniverse.awareness ?? 0;

    const activity =
      Math.max(
        energy,
        awareness,
        0.2,
      );

    /*
     * Keep the Genesis size stable.
     * Only a microscopic living pulse.
     */

    const pulse =

      1 +

      Math.sin(
        time.current * (0.9 + liveUniverse.evolutionSystem.formChange * 1.8),
      ) *

      (
        0.018 +
        activity * 0.032
      );

    root.current.scale.setScalar(
      pulse,
    );

    root.current.rotation.y +=
      delta *
      (
        0.048 +
        activity * 0.085 +
        liveUniverse.evolutionSystem.mutation * 0.05
      );

    root.current.rotation.x =
      Math.sin(
        time.current * 0.18,
      ) *
      0.022;

    root.current.rotation.z =
      Math.cos(
        time.current * 0.14,
      ) *
      0.006;

  });

  return (

    <group
      ref={root}
      name="LivingCoreController"
    >

      {children}

    </group>

  );

}