/**
 * ==========================================================
 * LÉLUVERSE
 * PORTAL TYPES
 *
 * Shared portal and particle definitions.
 * True 3D orbital particle model.
 * ==========================================================
 */

export type PortalState =
  | "forming"
  | "opening"
  | "stable"
  | "event"
  | "collapse"
  | "rebirth";

export type PortalEvent =
  | "none"
  | "portal"
  | "warp"
  | "bloom"
  | "code"
  | "dance"
  | "pods"
  | "parade"
  | "rollercoaster"
  | "memory"
  | "galaxy"
  | "crystal";

export interface LivingPortal {

  id: number;

  position: [
    number,
    number,
    number,
  ];

  baseRadius: number;

  radius: number;

  energy: number;

  age: number;

  phase: number;

  frequency: number;

  growth: number;

  rotation: number;

  spin: number;

  timer: number;

  state: PortalState;

  event: PortalEvent;

}

export type ParticleEvolution =
  | "birth"
  | "warp"
  | "morph"
  | "portal"
  | "galaxy"
  | "bloom"
  | "crystal"
  | "death"
  | "rebirth";

export interface PortalParticle {

  id: number;

  portalId: number;

  /**
   * Current world position.
   */
  position: [
    number,
    number,
    number,
  ];

  /**
   * Velocity for secondary motion.
   */
  velocity: [
    number,
    number,
    number,
  ];

  /**
   * Normalized direction from the
   * center of the portal.
   */
  direction: [
    number,
    number,
    number,
  ];

  /**
   * Normalized rotation axis.
   */
  axis: [
    number,
    number,
    number,
  ];

  /**
   * Current angular rotation.
   */
  angle: number;

  rotation: number;

  /**
   * Distance from portal center.
   */
  orbit: number;

  /**
   * Angular velocity.
   */
  speed: number;

  /**
   * Visual radius multiplier.
   */
  size: number;

  /**
   * Animation offset.
   */
  pulse: number;

  age: number;

  life: number;

  evolution: ParticleEvolution;

  alive: boolean;

}