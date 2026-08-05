/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS RESONANCE SYSTEM
 *
 * Synchronizes the living universe through resonance.
 * Responsible for:
 * • Schumann resonance
 * • Planetary heartbeat
 * • Cosmic harmony
 * • Magnetic synchronization
 * • Consciousness field
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

import { useGenesis } from "../GenesisCore";

export default function GenesisResonanceSystem() {

  const { state } = useGenesis();

  const elapsed = useRef(0);

  useFrame((_, delta) => {

    elapsed.current += delta;

    const genesis = state as any;

    if (!genesis.resonance) {

      genesis.resonance = {
        frequency: 7.83,
        amplitude: 1,
        coherence: 1,
        pulse: 0,
        heartbeat: 0,
      };

    }

    const resonance = genesis.resonance;

    /*
     * Planetary heartbeat
     */

    resonance.heartbeat += delta;

    /*
     * Living pulse
     */

    resonance.pulse =

      Math.sin(
        elapsed.current *
        resonance.frequency
      );

    /*
     * Gentle breathing amplitude
     */

    resonance.amplitude =

      1 +

      Math.sin(
        elapsed.current *
        0.5
      ) *

      0.15;

    /*
     * Universe coherence
     */

    resonance.coherence =

      0.8 +

      Math.sin(
        elapsed.current *
        0.25
      ) *

      0.2;

  });

  return null;

}