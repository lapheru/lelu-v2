/**
 * ==========================================================
 * LÉLUVERSE
 * CONSTELLATION SYSTEM
 * ==========================================================
 */

import { Line } from "@react-three/drei";
import { Vector3 } from "three";
import { useMemo } from "react";

export default function ConstellationSystem() {

  const points = useMemo(
    () => [
      new Vector3(-4, 2, -2),
      new Vector3(-2, 3, 1),
      new Vector3(0, 1, 2),
      new Vector3(2, 2, -1),
      new Vector3(4, 0, 1),
    ],
    [],
  );

  return (
    <Line
      points={points}
      color="#88ccff"
      lineWidth={1}
    />
  );

}