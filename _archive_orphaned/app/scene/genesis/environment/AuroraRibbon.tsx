/**
 * ==========================================================
 * LÉLUVERSE
 * AURORA RIBBON
 *
 * One living aurora strand.
 * Multiple ribbons combine to
 * create a volumetric aurora.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

interface AuroraRibbonProps {

  position?: [number, number, number];

  rotation?: [number, number, number];

  color?: string;

  speed?: number;

  width?: number;

  height?: number;

  opacity?: number;

}

export default function AuroraRibbon({

  position = [0, 0, -25],

  rotation = [0, 0, 0],

  color = "#52FFE6",

  speed = 0.1,

  width = 80,

  height = 18,

  opacity = 0.08,

}: AuroraRibbonProps) {

  const ribbon =
    useRef<Mesh>(null);

  useFrame(({ clock }) => {

    if (!ribbon.current)
      return;

    const t =
      clock.elapsedTime;

    ribbon.current.position.y =

      position[1] +

      Math.sin(
        t * speed,
      ) * 2;

    ribbon.current.rotation.z =

      rotation[2] +

      Math.sin(
        t * speed * 0.6,
      ) * 0.18;

  });

  return (

    <mesh

      ref={ribbon}

      position={position}

      rotation={rotation}

    >

      <planeGeometry

        args={[

          width,

          height,

          64,

          16,

        ]}

      />

      <meshBasicMaterial

        color={color}

        transparent

        opacity={opacity}

        depthWrite={false}

      />

    </mesh>

  );

}