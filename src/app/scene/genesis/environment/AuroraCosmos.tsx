/**
 * ==========================================================
 * LÉLUVERSE
 * AURORA COSMOS
 *
 * Procedural polar-light curtains. The field is made from curved,
 * translucent strips with a shared animated shader rather than flat
 * flat strips, so the aurora has depth, turbulence, and edge fade.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useGenesis } from "../GenesisCore";
import { useMemo, useRef } from "react";
import {
  AdditiveBlending,
  BufferGeometry,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  ShaderMaterial,
} from "three";

interface RibbonSeed {
  width: number;
  height: number;
  z: number;
  phase: number;
  speed: number;
  hue: number;
  tilt: number;
}

interface AuroraRibbon {
  geometry: BufferGeometry;
  material: ShaderMaterial;
  seed: RibbonSeed;
}

const RIBBON_COUNT = 9;
const RIBBON_SEGMENTS = 36;
const RIBBON_ROWS = 12;

const vertexShader = `
  uniform float uTime;
  uniform float uActivity;
  uniform float uPhase;

  varying vec2 vUv;
  varying float vCurtain;

  void main() {
    vUv = uv;
    vec3 p = position;
    float wave = sin(p.x * 0.72 + uTime * 0.48 + uPhase) * 0.24;
    wave += sin(p.x * 1.85 - uTime * 0.22 + uPhase * 1.7) * 0.09;
    p.z += wave * (0.8 + uActivity * 1.4);
    p.y += sin(p.x * 0.48 + uTime * 0.3 + uPhase) * 0.12 * (1.0 + uActivity);
    vCurtain = 0.5 + 0.5 * sin(p.x * 2.4 - p.y * 0.7 + uTime * 0.9 + uPhase);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uActivity;
  uniform float uHue;

  varying vec2 vUv;
  varying float vCurtain;

  vec3 hue(float h) {
    vec3 k = vec3(1.0, 2.0 / 3.0, 1.0 / 3.0);
    vec3 p = abs(fract(vec3(h) + k) * 6.0 - 3.0);
    return clamp(p - 1.0, 0.0, 1.0);
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    float edge = smoothstep(0.0, 0.16, vUv.y) * smoothstep(1.0, 0.68, vUv.y);
    float curtain = smoothstep(0.18, 0.82, vCurtain);
    float turbulence = noise(vec2(vUv.x * 7.0, vUv.y * 4.0 + uTime * 0.18));
    float filament = pow(max(0.0, sin(vUv.x * 22.0 + turbulence * 5.0 - uTime * 1.4)), 5.0);
    float alpha = edge * (0.12 + curtain * 0.28 + filament * 0.26) * (0.65 + uActivity * 0.8);
    vec3 color = hue(fract(uHue + uTime * 0.012 + vUv.x * 0.18));
    color = mix(color, vec3(0.35, 0.95, 1.0), 0.28);
    gl_FragColor = vec4(color * (0.55 + curtain * 0.7), alpha);
  }
`;

function createRibbonGeometry(seed: RibbonSeed): BufferGeometry {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let row = 0; row <= RIBBON_ROWS; row += 1) {
    const v = row / RIBBON_ROWS;
    const y = (v - 0.5) * seed.height;

    for (let segment = 0; segment <= RIBBON_SEGMENTS; segment += 1) {
      const u = segment / RIBBON_SEGMENTS;
      const x = (u - 0.5) * seed.width;
      const z = seed.z + Math.sin(u * Math.PI * 2.0 + seed.phase) * 0.34;
      positions.push(x, y, z);
      uvs.push(u, v);
    }
  }

  const columns = RIBBON_SEGMENTS + 1;
  for (let row = 0; row < RIBBON_ROWS; row += 1) {
    for (let segment = 0; segment < RIBBON_SEGMENTS; segment += 1) {
      const a = row * columns + segment;
      const b = a + 1;
      const c = a + columns;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function createRibbon(seed: RibbonSeed): AuroraRibbon {
  const material = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: true,
    side: DoubleSide,
    blending: AdditiveBlending,
    toneMapped: false,
    uniforms: {
      uTime: { value: 0 },
      uActivity: { value: 0.45 },
      uPhase: { value: seed.phase },
      uHue: { value: seed.hue },
    },
    vertexShader,
    fragmentShader,
  });

  return {
    geometry: createRibbonGeometry(seed),
    material,
    seed,
  };
}

export default function AuroraCosmos() {
  const { getLiveUniverse } = useGenesis();
  const root = useRef<Group>(null);

  const ribbons = useMemo<AuroraRibbon[]>(() => {
    return Array.from({ length: RIBBON_COUNT }, (_, index) => {
      const seed: RibbonSeed = {
        width: 8.5 + (index % 3) * 1.3,
        height: 3.8 + (index % 4) * 0.45,
        z: -3.4 - index * 0.42,
        phase: index * 1.47,
        speed: 0.18 + (index % 4) * 0.035,
        hue: 0.42 + index * 0.055,
        tilt: (index - 4) * 0.035,
      };
      return createRibbon(seed);
    });
  }, []);

  useFrame(({ clock }, delta) => {
    if (!root.current) {
      return;
    }

    const liveUniverse = getLiveUniverse();
    const cosmicEnergy = liveUniverse.celestial.cosmicEnergy;
    const celestialActivity =
      (liveUniverse.celestial.stars +
        liveUniverse.celestial.constellations +
        liveUniverse.celestial.planets +
        liveUniverse.astrology.transit +
        liveUniverse.ocean.stormSurge) / 5;
    const activity = Math.min(
      1,
      0.2 + cosmicEnergy * 0.35 + celestialActivity * 0.5,
    );

    root.current.rotation.y += delta * (0.004 + activity * 0.012);
    root.current.rotation.x = Math.sin(clock.elapsedTime * 0.08) * 0.025;

    ribbons.forEach(({ material, seed }, index) => {
      material.uniforms.uTime.value = clock.elapsedTime * seed.speed;
      material.uniforms.uActivity.value = activity;
      material.uniforms.uHue.value =
        seed.hue + liveUniverse.evolutionSystem.colorShift * 0.22;

      const child = root.current?.children[index];
      if (child) {
        child.rotation.z = seed.tilt + Math.sin(clock.elapsedTime * 0.12 + seed.phase) * 0.025;
        child.position.x = Math.sin(clock.elapsedTime * 0.06 + seed.phase) * 0.35;
        child.position.y = Math.cos(clock.elapsedTime * 0.05 + seed.phase) * 0.2;
        child.scale.set(1 + activity * 0.08, 1 + activity * 0.06, 1);
      }
    });
  });

  return (
    <group ref={root} name="AuroraCosmos" renderOrder={5}>
      {ribbons.map(({ geometry, material }, index) => (
        <mesh
          key={index}
          geometry={geometry}
          material={material}
          renderOrder={5}
        />
      ))}
    </group>
  );
}
