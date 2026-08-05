/**
 * ==========================================================
 * LÉLUVERSE
 * CAUSTIC MATH
 *
 * Shared math utilities for the Genesis Ocean
 * caustics system.
 *
 * Responsibilities
 * ----------------
 * • Oscillation
 * • Pulse
 * • Drift
 * • Wave motion
 * • Rotation
 * • Clamp
 * • Lerp
 * ==========================================================
 */

export const TAU =
  Math.PI * 2;

export function clamp(
  value: number,
  min: number,
  max: number,
): number {

  return Math.min(
    Math.max(value, min),
    max,
  );

}

export function lerp(
  start: number,
  end: number,
  alpha: number,
): number {

  return start +
    (end - start) * alpha;

}

export function pulse(
  time: number,
  speed: number,
  amplitude: number,
  offset = 0,
): number {

  return (
    1 +
    Math.sin(
      time * speed +
      offset,
    ) *
      amplitude
  );

}

export function oscillate(
  time: number,
  speed: number,
  amplitude: number,
  offset = 0,
): number {

  return (
    Math.sin(
      time * speed +
      offset,
    ) *
    amplitude
  );

}

export function driftX(
  base: number,
  time: number,
  speed: number,
  distance: number,
  offset = 0,
): number {

  return (
    base +
    Math.sin(
      time * speed +
      offset,
    ) *
      distance
  );

}

export function driftY(
  base: number,
  time: number,
  speed: number,
  distance: number,
  offset = 0,
): number {

  return (
    base +
    Math.cos(
      time * speed +
      offset,
    ) *
      distance
  );

}

export function driftZ(
  base: number,
  time: number,
  speed: number,
  distance: number,
  offset = 0,
): number {

  return (
    base +
    Math.sin(
      time * speed +
      offset +
      Math.PI / 2,
    ) *
      distance
  );

}

export function orbitX(
  radius: number,
  angle: number,
): number {

  return (
    Math.cos(angle) *
    radius
  );

}

export function orbitZ(
  radius: number,
  angle: number,
): number {

  return (
    Math.sin(angle) *
    radius
  );

}

export function wrapAngle(
  angle: number,
): number {

  return (
    angle % TAU
  );

}