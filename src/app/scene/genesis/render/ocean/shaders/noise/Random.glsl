/**
 * ==========================================================
 * LÉLUVERSE
 * RANDOM
 *
 * Deterministic, GPU-safe random helpers for the procedural
 * ocean and atmosphere shader family.
 * ==========================================================
 */

float random(float value) {
  return fract(sin(value * 12.9898) * 43758.5453123);
}

float random(vec2 value) {
  return fract(
    sin(dot(value, vec2(12.9898, 78.233))) * 43758.5453123
  );
}

float random(vec3 value) {
  return fract(
    sin(dot(value, vec3(12.9898, 78.233, 45.164))) * 43758.5453123
  );
}

vec2 random2(vec2 value) {
  return fract(
    sin(vec2(
      dot(value, vec2(127.1, 311.7)),
      dot(value, vec2(269.5, 183.3))
    )) * 43758.5453123
  );
}

vec3 random3(vec3 value) {
  return fract(
    sin(vec3(
      dot(value, vec3(127.1, 311.7, 74.7)),
      dot(value, vec3(269.5, 183.3, 246.1)),
      dot(value, vec3(113.5, 271.9, 124.6))
    )) * 43758.5453123
  );
}
