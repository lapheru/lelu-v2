/**
 * ==========================================================
 * LÉLUVERSE
 * WATER VERTEX SHADER
 * ==========================================================
 */

uniform float uTime;
uniform float uWaveHeight;
uniform float uTide;
uniform float uCurrent;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying float vHeight;

void main() {

    vUv = uv;

    // Copy the built-in vertex position into a mutable variable.
    vec3 pos = position;

    float waveA =
        sin(
            pos.x * 0.18 +
            uTime * uCurrent
        );

    float waveB =
        cos(
            pos.z * 0.15 +
            uTime * 0.8
        );

    float waveC =
        sin(
            (pos.x + pos.z) *
            0.08 +
            uTime * 0.5
        );

    float tide =
        sin(
            uTime * 0.12
        ) * uTide;

    float height =

        waveA * 0.7 +

        waveB * 0.5 +

        waveC * 0.8 +

        tide;

    pos.y +=
        height *
        uWaveHeight;

    vHeight = height;

    vPosition = pos;

    vNormal = normalize(normalMatrix * normal);

    gl_Position =

        projectionMatrix *

        modelViewMatrix *

        vec4(

            pos,

            1.0

        );

}