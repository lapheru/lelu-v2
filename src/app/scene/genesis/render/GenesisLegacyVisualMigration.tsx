/**
 * ==========================================================
 * LÉLUVERSE
 * MIGRATED COSMIC VISUAL FIELD
 *
 * Rendering-only migration of the archived constellation,
 * electromagnetic, particle, galaxy, nebula, storm, aura,
 * glyph and stream techniques.
 *
 * This is intentionally one active renderer. It does not
 * recreate archived engines or introduce a second state store.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  Vector3,
} from "three";

import { useGenesis } from "../GenesisCore";

interface ParticleSeed {
  radius: number;
  angle: number;
  height: number;
  speed: number;
  phase: number;
  size: number;
}

interface RingSeed {
  radius: number;
  tilt: number;
  speed: number;
  phase: number;
}

interface LightningSeed {
  line: Line;
  phase: number;
  speed: number;
}

const PARTICLE_COUNT = 96;
const RING_COUNT = 12;
const LIGHTNING_COUNT = 8;

function createLightning(): LightningSeed[] {
  return Array.from({ length: LIGHTNING_COUNT }, (_, index) => {
    const points: number[] = [];
    const start = new Vector3(0, 0, 0);
    const end = new Vector3(
      Math.cos(index * 2.7) * 2.1,
      Math.sin(index * 1.9) * 1.7,
      -0.2 + Math.sin(index) * 0.5,
    );

    for (let segment = 0; segment <= 7; segment += 1) {
      const t = segment / 7;
      const point = new Vector3().lerpVectors(start, end, t);
      point.x += Math.sin(segment * 4.1 + index) * 0.08 * (1 - t);
      point.y += Math.cos(segment * 3.2 + index) * 0.08 * (1 - t);
      point.z += Math.sin(segment * 2.8 + index) * 0.05;
      points.push(point.x, point.y, point.z);
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute(
      "position",
      new Float32BufferAttribute(points, 3),
    );

    return {
      line: new Line(
        geometry,
        new LineBasicMaterial({
          color: new Color(index % 2 === 0 ? "#78f6ff" : "#a78bfa"),
          transparent: true,
          opacity: 0.2,
          blending: AdditiveBlending,
          depthWrite: false,
        }),
      ),
      phase: index * 0.8,
      speed: 1.4 + (index % 3) * 0.45,
    };
  });
}

export default function GenesisLegacyVisualMigration() {
  const { universe, getLiveUniverse } = useGenesis();
  const field = useRef<Group>(null);
  const constellation = useRef<Group>(null);
  const electromagnetic = useRef<Group>(null);
  const biofield = useRef<Group>(null);
  const galaxy = useRef<Group>(null);
  const nebula = useRef<Group>(null);
  const storms = useRef<Group>(null);
  const particles = useRef<Group>(null);
  const lightning = useRef<Group>(null);
  const time = useRef(0);

  const ringSeeds = useMemo<RingSeed[]>(
    () =>
      Array.from({ length: RING_COUNT }, (_, index) => ({
        radius: 1.42 + index * 0.075,
        tilt: (index % 4) * 0.28,
        speed: 0.04 + (index % 3) * 0.025,
        phase: index * 0.6,
      })),
    [],
  );

  const particleSeeds = useMemo<ParticleSeed[]>(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
        radius: 1.45 + (index % 12) * 0.055,
        angle: index * 2.39996,
        height: ((index % 9) - 4) * 0.07,
        speed: 0.15 + (index % 7) * 0.035,
        phase: index * 0.47,
        size: 0.012 + (index % 4) * 0.004,
      })),
    [],
  );

  const lightningSeeds = useMemo(createLightning, []);

  useFrame((_, delta) => {
    if (!field.current) return;

    time.current += delta;
    const live = getLiveUniverse();
    const evolution = live.evolutionSystem;
    const astrology = live.astrology;
    const celestial = live.celestial;
    const ocean = live.ocean;

    const energy = Math.min(1, Math.max(0, live.energy ?? 0));
    const emergence = Math.min(1, Math.max(0, evolution.emergence));
    const cosmicActivity = Math.min(
      1,
      Math.max(
        0,
        (celestial.cosmicEnergy +
          celestial.stars +
          celestial.constellations +
          astrology.transit +
          astrology.alignment) / 5,
      ),
    );
    const stormActivity = Math.min(
      1,
      Math.max(0, ocean.stormSurge + ocean.tsunami * 0.7),
    );
    const fieldActivity = Math.min(
      1,
      0.12 +
        energy * 0.22 +
        emergence * 0.28 +
        cosmicActivity * 0.3 +
        stormActivity * 0.18,
    );

    field.current.rotation.y += delta * (0.012 + fieldActivity * 0.04);
    field.current.rotation.x = Math.sin(time.current * 0.12) * 0.025;

    if (constellation.current) {
      constellation.current.rotation.y -= delta * (0.025 + astrology.zodiac * 0.08);
      constellation.current.rotation.z =
        Math.sin(time.current * 0.18) * (0.02 + astrology.alignment * 0.05);
    }

    if (electromagnetic.current) {
      electromagnetic.current.rotation.y +=
        delta * (0.08 + astrology.planetaryEnergy * 0.2);
      electromagnetic.current.rotation.x =
        Math.sin(time.current * 0.4) * (0.04 + ocean.current * 0.08);
    }

    if (biofield.current) {
      const breath = 1 + Math.sin(time.current * (0.7 + emergence)) * 0.025;
      biofield.current.scale.setScalar(breath + fieldActivity * 0.045);
      biofield.current.rotation.z = Math.cos(time.current * 0.16) * 0.04;
    }

    if (galaxy.current) {
      galaxy.current.rotation.y += delta * (0.035 + cosmicActivity * 0.12);
      galaxy.current.rotation.z -= delta * 0.018;
      galaxy.current.scale.setScalar(1 + cosmicActivity * 0.16);
    }

    if (nebula.current) {
      nebula.current.rotation.z += delta * (0.006 + cosmicActivity * 0.018);
      nebula.current.position.x = Math.sin(time.current * 0.07) * 0.18;
      nebula.current.position.y = Math.cos(time.current * 0.05) * 0.14;
    }

    if (storms.current) {
      storms.current.rotation.y -= delta * (0.12 + stormActivity * 0.55);
      storms.current.rotation.z = Math.sin(time.current * 0.6) * stormActivity * 0.12;
      storms.current.scale.setScalar(1 + stormActivity * 0.22);
    }

    if (particles.current) {
      particles.current.children.forEach((child, index) => {
        const seed = particleSeeds[index];
        if (!seed) return;
        const angle = seed.angle + time.current * seed.speed * (1 + fieldActivity);
        const radius = seed.radius + Math.sin(time.current * 0.7 + seed.phase) * 0.035;
        child.position.set(
          Math.cos(angle) * radius,
          seed.height + Math.sin(angle * 2 + seed.phase) * 0.08,
          Math.sin(angle) * radius,
        );
      });
    }

    if (lightning.current) {
      lightning.current.children.forEach((child, index) => {
        const seed = lightningSeeds[index];
        if (!seed) return;
        const material = (child as Line).material as LineBasicMaterial;
        const flash = Math.pow(
          Math.max(0, Math.sin(time.current * seed.speed + seed.phase)),
          8,
        );
        material.opacity = 0.08 + flash * (0.22 + stormActivity * 0.62);
        child.rotation.y += delta * 0.02;
      });
    }

    field.current.traverse((object) => {
      if (!(object as Mesh).isMesh) return;
      const mesh = object as Mesh;
      const material = mesh.material as MeshBasicMaterial;
      if (!material || typeof material.opacity !== "number") return;
      const baseOpacity = mesh.userData.baseOpacity as number | undefined;
      if (baseOpacity === undefined) return;
      material.opacity = baseOpacity * (0.72 + fieldActivity * 0.9);
    });
  });

  const initialCosmic = universe.celestial.cosmicEnergy;
  const nebulaSeeds: Array<{
    color: string;
    position: [number, number, number];
    rotation: number;
  }> = [
    { color: "#5e63ff", position: [-1.8, 0.9, 0], rotation: 1 },
    { color: "#35c7ff", position: [1.6, -0.7, -0.2], rotation: -0.35 },
    { color: "#d778ff", position: [0.7, 1.3, -0.4], rotation: 0.55 },
  ];

  return (
    <group ref={field} name="MigratedCosmicVisualField" renderOrder={4}>
      {/* Archived constellation / astrology technique, remapped to active celestial state. */}
      <group ref={constellation} name="MigratedAstrologyConstellations">
        {ringSeeds.slice(0, 6).map((seed, index) => (
          <mesh
            key={`zodiac-${index}`}
            rotation={[seed.tilt, index * 0.31, index * 0.52]}
            userData={{ baseOpacity: 0.1 }}
          >
            <torusGeometry args={[seed.radius + 0.28, 0.003, 8, 96]} />
            <meshBasicMaterial
              color={index % 2 === 0 ? "#f8d477" : "#8bdcff"}
              transparent
              opacity={0.1}
              blending={AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        ))}
        {Array.from({ length: 12 }, (_, index) => {
          const angle = index * Math.PI / 6;
          return (
            <mesh
              key={`zodiac-node-${index}`}
              position={[Math.cos(angle) * 1.78, Math.sin(index * 1.7) * 0.13, Math.sin(angle) * 1.78]}
              userData={{ baseOpacity: 0.5 }}
            >
              <sphereGeometry args={[0.026 + initialCosmic * 0.018, 8, 8]} />
              <meshBasicMaterial
                color="#ffe8a3"
                transparent
                opacity={0.5}
                blending={AdditiveBlending}
                depthWrite={false}
                toneMapped={false}
              />
            </mesh>
          );
        })}
      </group>

      {/* Archived electromagnetic field technique, driven by planetary/cosmic state. */}
      <group ref={electromagnetic} name="MigratedElectromagneticField">
        {ringSeeds.map((seed, index) => (
          <mesh
            key={`emf-${index}`}
            rotation={[Math.PI / 2 + seed.tilt, 0, index * 0.2]}
            userData={{ baseOpacity: 0.065 }}
          >
            <torusGeometry args={[seed.radius, 0.006, 12, 128]} />
            <meshBasicMaterial
              color={index % 3 === 0 ? "#55ddff" : "#86a8ff"}
              transparent
              opacity={0.065}
              blending={AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>

      {/* Archived biofield / aura technique, kept as thin nested resonance bands. */}
      <group ref={biofield} name="MigratedBiofieldAura">
        {[0, 1, 2].map((index) => (
          <mesh
            key={`aura-${index}`}
            rotation={[index * 0.55, index * 0.35, index * 0.8]}
            userData={{ baseOpacity: 0.055 - index * 0.01 }}
          >
            <torusGeometry args={[1.9 + index * 0.13, 0.012, 16, 128]} />
            <meshBasicMaterial
              color={index === 0 ? "#9effdb" : "#8fd4ff"}
              transparent
              opacity={0.055 - index * 0.01}
              blending={AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>

      {/* Archived galaxy / fractal ring technique, bounded to the active world. */}
      <group ref={galaxy} name="MigratedGalaxyFractal">
        {[0, 1, 2].map((index) => (
          <mesh
            key={`galaxy-ring-${index}`}
            rotation={[index * 0.62, index * 0.33, index * 0.8]}
            userData={{ baseOpacity: 0.055 - index * 0.012 }}
          >
            <torusGeometry args={[2.05 + index * 0.12, 0.018 - index * 0.003, 16, 160]} />
            <meshBasicMaterial
              color={index === 1 ? "#d9a7ff" : "#7dbbff"}
              transparent
              opacity={0.055 - index * 0.012}
              blending={AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>

      {/* Archived nebula / procedural space technique, placed behind the core. */}
      <group ref={nebula} name="MigratedNebulaField" position={[0, 0, -2.8]}>
        {nebulaSeeds.map(({ color, position, rotation }, index) => (
          <mesh
            key={`nebula-${index}`}
            position={position}
            rotation={[0, 0, rotation]}
            scale={1 + initialCosmic * 0.18}
            userData={{ baseOpacity: 0.035 }}
          >
            <planeGeometry args={[3.6, 1.8]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.035}
              blending={AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>

      {/* Archived storm / cosmic lightning technique, driven by ocean storm channels. */}
      <group ref={storms} name="MigratedCosmicStorms" userData={{ baseOpacity: 0.1 }}>
        {[0, 1, 2].map((index) => (
          <mesh
            key={`storm-${index}`}
            rotation={[Math.PI / 2, index * 0.7, index * 0.4]}
            userData={{ baseOpacity: 0.08 }}
          >
            <torusGeometry args={[2.18 + index * 0.16, 0.016, 16, 128]} />
            <meshBasicMaterial
              color={index === 1 ? "#ff9fdf" : "#76e6ff"}
              transparent
              opacity={0.08}
              blending={AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>

      <group ref={lightning} name="MigratedCosmicLightning">
        {lightningSeeds.map((seed, index) => (
          <primitive key={`bolt-${index}`} object={seed.line} />
        ))}
      </group>

      {/* Archived particle / energy-stream technique, using the active particle and energy outputs. */}
      <group ref={particles} name="MigratedEnergyParticles">
        {particleSeeds.map((seed, index) => (
          <mesh
            key={`particle-${index}`}
            position={[Math.cos(seed.angle) * seed.radius, seed.height, Math.sin(seed.angle) * seed.radius]}
            userData={{ baseOpacity: 0.22 }}
          >
            <sphereGeometry args={[seed.size, 6, 6]} />
            <meshBasicMaterial
              color={index % 5 === 0 ? "#ffe6a0" : "#9eeaff"}
              transparent
              opacity={0.22}
              blending={AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>

      {/* Glyph migration: the archived glyph field becomes readable orbital marker geometry, not a second text system. */}
      <group name="MigratedGlyphOrbit" rotation={[0.8, 0.2, 0.4]}>
        {Array.from({ length: 16 }, (_, index) => {
          const angle = index * Math.PI / 8;
          return (
            <mesh
              key={`glyph-${index}`}
              position={[Math.cos(angle) * 2.38, Math.sin(index * 2.1) * 0.11, Math.sin(angle) * 2.38]}
              rotation={[0, -angle, Math.PI / 4]}
              userData={{ baseOpacity: 0.16 }}
            >
              <planeGeometry args={[0.07, 0.07]} />
              <meshBasicMaterial
                color="#c5f7ff"
                transparent
                opacity={0.16}
                blending={AdditiveBlending}
                depthWrite={false}
                toneMapped={false}
              />
            </mesh>
          );
        })}
      </group>

    </group>
  );
}
