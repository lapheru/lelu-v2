/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS CORE — THE ONE CORE BODY
 *
 * The single surface of the ONE Genesis Core — and its only transform
 * controller. This mesh owns no state and no derivation: every frame it
 * reads the ONE visual state computed by the EngineBus (CoreVisualState)
 * and writes it straight into the surface material's uniforms. The same
 * state drives the emission, the atmosphere light, the life motes and
 * the cosmic field, so the Core can never wear two states at once.
 *
 * Drives (from the shared state):
 * - engine-state morphing (ocean/plasma/electric/crystal/halo/bio)
 * - color + glow
 * - evolution / awareness / mutation / growth / formChange
 * - ocean surface feeds
 * - breathing + rotation (the ONE transform — the old CoreLayer
 *   "LivingCoreController" that rotated/breathed the same core from a
 *   second formula has been removed; this body is the only controller)
 *
 * Children (the internal life-mote layer) are nested inside this same
 * mesh so every internal layer shares the one origin and one transform.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type ReactNode } from "react";
import { Mesh } from "three";

import { useGenesis } from "../GenesisCore";
import GenesisCoreMaterial from "./GenesisCoreMaterial";

interface GenesisCoreProps {
  children?: ReactNode;
}

export default function GenesisCore({ children }: GenesisCoreProps) {
  const { engineRuntime, openPanel } = useGenesis();

  const mesh = useRef<Mesh>(null);

  const material = useMemo(() => new GenesisCoreMaterial(), []);

  useFrame((_, delta) => {
    if (!mesh.current) {
      return;
    }

    const visualState = engineRuntime?.getEngineBus().getVisualState();
    if (!visualState) {
      return;
    }

    const uniforms = material.uniforms;

    // ---- ONE authoritative state → surface uniforms ----
    uniforms.uTime.value = visualState.time;
    uniforms.uActivity.value = visualState.activity;
    uniforms.uEvolution.value = visualState.evolutionFeed;
    uniforms.uAwareness.value = visualState.awarenessFeed;
    uniforms.uMutation.value = visualState.mutationFeed;
    uniforms.uGrowth.value = visualState.growthFeed;
    uniforms.uFormChange.value = visualState.formChange;
    uniforms.uInstability.value = visualState.instability;
    uniforms.uPlasma.value = visualState.plasmaFeed;
    uniforms.uOceanBlend.value = visualState.oceanFeed.blend;
    uniforms.uOceanFlow.value = visualState.oceanFeed.flow;
    uniforms.uOceanDepth.value = visualState.oceanFeed.depth;
    uniforms.uOceanFoam.value = visualState.oceanFeed.foam;
    uniforms.uOceanCurrent.value = visualState.oceanFeed.current;
    uniforms.uColorShift.value = visualState.colorShift;
    uniforms.uStateOcean.value = visualState.stateWeights.ocean;
    uniforms.uStatePlasma.value = visualState.stateWeights.plasma;
    uniforms.uStateElectric.value = visualState.stateWeights.electric;
    uniforms.uStateCrystal.value = visualState.stateWeights.crystal;
    uniforms.uStateHalo.value = visualState.stateWeights.halo;
    uniforms.uStateBio.value = visualState.stateWeights.bio;
    uniforms.uCoreColor.value.copy(visualState.stateColor);
    uniforms.uGlowColor.value.copy(visualState.stateGlow);

    // ---- ONE transform on the ONE Core ----
    mesh.current.rotation.y += delta * (0.12 + visualState.activity * 0.25);
    mesh.current.rotation.x += delta * (0.03 + visualState.activity * 0.08);

    // Plasma breathing — the same pulse every other layer breathes with.
    const breathing =
      1 +
      Math.sin(visualState.time * 1.4) * 0.04 +
      visualState.activity * 0.12;
    mesh.current.scale.setScalar(breathing);
  });

  return (
    <mesh
      ref={mesh}
      name="GenesisCoreBody"
      renderOrder={201}
      material={material}
      onClick={() => openPanel("chat")}
      onPointerOver={(event) => {
        event.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
    >
      <icosahedronGeometry args={[0.9, 64]} />
      {children}
    </mesh>
  );
}
