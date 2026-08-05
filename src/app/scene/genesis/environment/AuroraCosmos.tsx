/**
 * ==========================================================
 * LÉLUVERSE
 * AURORA COSMOS
 *
 * Living cosmic ribbons.
 *
 * Visible atmospheric layer.
 * Surrounds Genesis space without blocking core.
 *
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Group, MeshBasicMaterial } from "three";

import { useGenesis } from "../GenesisCore";

interface Ribbon {
  x: number;
  y: number;
  z: number;
  rotation: number;
  scale: number;
  speed: number;
  pulse: number;
  color: string;
}

const COUNT = 24;

export default function AuroraCosmos() {
  const { getLiveUniverse } = useGenesis();
  const root = useRef<Group>(null);

  const ribbons = useMemo<Ribbon[]>(() => {
    const colors = [
      "#00FFE0",
      "#00D8FF",
      "#5D8CFF",
      "#7E5FFF",
      "#A56DFF",
    ];

    return Array.from({ length: COUNT }, () => ({
      x: (Math.random() - 0.5) * 14,
      y: (Math.random() - 0.5) * 10,
      z: -3 - Math.random() * 8,
      rotation: Math.random() * Math.PI * 2,
      scale: 2 + Math.random() * 5,
      speed: 0.01 + Math.random() * 0.02,
      pulse: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, []);

  useFrame(({ clock }, delta) => {
    if (!root.current) {
      return;
    }

    const t = clock.elapsedTime;
    const liveUniverse = getLiveUniverse();
    const cosmicEnergy = liveUniverse.celestial.cosmicEnergy;
    const celestialActivity =
      (liveUniverse.celestial.stars +
        liveUniverse.celestial.constellations +
        liveUniverse.celestial.planets +
        liveUniverse.astrology.transit +
        liveUniverse.ocean.stormSurge) / 5;
    const environmentActivity = Math.min(
      1,
      0.12 + cosmicEnergy * 0.34 + celestialActivity * 0.54,
    );

    root.current.children.forEach((child, index) => {
      const ribbon = ribbons[index];
      if (!ribbon) {
        return;
      }

      child.rotation.z += delta * ribbon.speed * (1 + environmentActivity * 1.8);
      child.rotation.y += delta * ribbon.speed * 0.5;
      child.position.x = ribbon.x + Math.sin(t * 0.08 + index) * 0.4;
      child.position.y = ribbon.y + Math.cos(t * 0.06 + index) * 0.3;

      const glow = 0.8 + Math.sin(t * 1.4 + ribbon.pulse) * 0.2;
      child.scale.set(ribbon.scale, glow * 2, 1);

      const material = (child as unknown as { material?: MeshBasicMaterial }).material;
      if (material) {
        material.opacity = 0.06 + environmentActivity * 0.14;
      }
    });
  });

  return (
    <group ref={root} name="AuroraCosmos" renderOrder={5}>
      {ribbons.map((ribbon, index) => (
        <mesh
          key={index}
          position={[ribbon.x, ribbon.y, ribbon.z]}
          rotation={[0, 0, ribbon.rotation]}
        >
          <planeGeometry args={[3, 0.15]} />
          <meshBasicMaterial
            color={ribbon.color}
            transparent
            opacity={0.12}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
