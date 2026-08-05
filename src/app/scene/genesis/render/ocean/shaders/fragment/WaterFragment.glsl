/**
 * ==========================================================
 * LÉLUVERSE
 * WATER FRAGMENT
 * ==========================================================
 */

uniform float uTime;

uniform vec3 uDeepColor;
uniform vec3 uSurfaceColor;
uniform vec3 uFoamColor;
uniform vec3 uGlowColor;
uniform vec3 uSkyColor;
uniform vec3 uLightColor;

uniform vec3 uShellTint;
uniform float uShellOpacity;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying float vHeight;

#include "DepthFragment.glsl"
#include "FoamFragment.glsl"
#include "CausticFragment.glsl"
#include "GlowFragment.glsl"
#include "WhirlpoolFragment.glsl"
#include "FresnelFragment.glsl"
#include "ReflectionFragment.glsl"
#include "SpecularFragment.glsl"
#include "LightingFragment.glsl"
#include "ShadowFragment.glsl"
#include "RefractionFragment.glsl"
#include "UnderwaterFragment.glsl"

void main() {

    float depth =

        clamp(

            (vPosition.y + 1.0) *

            0.5,

            0.0,

            1.0

        );

    vec3 color =

        applyDepthColor(

            uSurfaceColor,

            uDeepColor,

            depth,

            1.0

        );

    float foam =

        applyFoam(

            vHeight,

            1.0

        );

    color =

        mix(

            color,

            uFoamColor,

            foam

        );

    float caustics =

        applyCaustics(

            vUv,

            uTime,

            0.4

        );

    color +=

        vec3(

            caustics *

            0.12

        );

    color =

        applyGlow(

            color,

            uGlowColor,

            vUv,

            uTime,

            0.5

        );

    float whirlpool =

        applyWhirlpool(

            vUv,

            uTime,

            0.3

        );

    color +=

        vec3(

            whirlpool *

            0.10

        );

    color =

        applyReflection(

            color,

            uSkyColor,

            vNormal,

            -normalize(

                vPosition

            ),

            0.35

        );

    color =

        applySpecular(

            color,

            vNormal,

            vec3(

                0.4,

                1.0,

                0.2

            ),

            -normalize(

                vPosition

            ),

            uLightColor,

            64.0,

            1.0

        );

    color =

        applyLighting(

            color,

            vec3(

                0.08

            ),

            uLightColor,

            vec3(

                0.4,

                0.7,

                1.0

            ),

            vNormal,

            vec3(

                0.4,

                1.0,

                0.2

            ),

            -normalize(

                vPosition

            ),

            0.25,

            1.0,

            4.0,

            0.5,

            0.0

        );

    color =

        applyOceanShadow(

            color,

            vec3(

                0.0,

                0.05,

                0.10

            ),

            vNormal,

            vec3(

                0.4,

                1.0,

                0.2

            ),

            vUv,

            uTime,

            0.5,

            0.5

        );

    color =

        applyUnderwaterTint(

            color,

            uDeepColor,

            depth,

            0.25

        );

    color *=

        uShellTint;

    gl_FragColor =

        vec4(

            color,

            uShellOpacity

        );

}