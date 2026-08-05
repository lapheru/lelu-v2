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

  const { universe } = useGenesis();

  const root = useRef<Group>(null);

  const time = useRef(0);

  useFrame((_, delta) => {

    if (!root.current)
      return;

    time.current += delta;

    const energy =
      universe.energy ?? 0;

    const awareness =
      universe.awareness ?? 0;

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
        time.current * 0.60,
      ) *

      (
        0.0025 +
        activity * 0.0035
      );

    root.current.scale.setScalar(
      pulse,
    );

    root.current.rotation.y +=
      delta *
      (
        0.010 +
        activity * 0.010
      );

    root.current.rotation.x =
      Math.sin(
        time.current * 0.18,
      ) *
      0.008;

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