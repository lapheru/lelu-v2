/**
 * ==========================================================
 * LÉLUVERSE
 * LIGHTING MATH
 *
 * Shared math helpers for every ocean lighting system.
 *
 * Used by:
 * • AmbientOceanLight
 * • HemisphereGlow
 * • HorizonLight
 * • SunReflection
 * • SurfaceHighlights
 * • GodRays
 * • UnderwaterLight
 * • DepthFade
 * • WaterVolume
 * • Bioluminescence
 * • EnergyBloom
 * • OceanPulse
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
  a: number,
  b: number,
  t: number,
): number {

  return a + (b - a) * t;

}

export function pulse(
  time: number,
  speed = 1,
  amplitude = 1,
): number {

  return (

    Math.sin(
      time * speed,
    ) *

    amplitude

  );

}

export function oscillate(
  time: number,
  min: number,
  max: number,
  speed = 1,
): number {

  return lerp(

    min,

    max,

    (

      Math.sin(
        time * speed,
      ) + 1

    ) / 2,

  );

}

export function driftX(
  time: number,
  speed: number,
  offset: number,
  strength: number,
): number {

  return (

    Math.sin(

      time *
      speed +

      offset,

    ) *

    strength

  );

}

export function driftY(
  time: number,
  speed: number,
  offset: number,
  strength: number,
): number {

  return (

    Math.sin(

      time *
      speed +

      offset,

    ) *

    strength

  );

}

export function driftZ(
  time: number,
  speed: number,
  offset: number,
  strength: number,
): number {

  return (

    Math.cos(

      time *
      speed +

      offset,

    ) *

    strength

  );

}

export function orbitX(
  angle: number,
  radius: number,
): number {

  return Math.cos(
    angle,
  ) * radius;

}

export function orbitZ(
  angle: number,
  radius: number,
): number {

  return Math.sin(
    angle,
  ) * radius;

}

export function glow(
  time: number,
  speed: number,
  offset: number,
  intensity: number,
): number {

  return (

    1 +

    Math.sin(

      time *
      speed +

      offset,

    ) *

    intensity

  );

}

export function flicker(
  time: number,
  offset: number,
): number {

  return (

    Math.sin(
      time * 7 +
      offset,
    ) *

    0.45 +

    Math.cos(
      time * 13 +
      offset,
    ) *

    0.25 +

    Math.sin(
      time * 19 +
      offset,
    ) *

    0.15

  );

}

export function wrapAngle(
  angle: number,
): number {

  let value =
    angle;

  while (
    value < 0
  ) {

    value += TAU;

  }

  while (
    value >= TAU
  ) {

    value -= TAU;

  }

  return value;

}