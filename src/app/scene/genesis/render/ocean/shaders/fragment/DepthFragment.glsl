/**
 * ==========================================================
 * LÉLUVERSE
 * DEPTH FRAGMENT
 * ==========================================================
 */

vec3 applyDepthColor(

    vec3 surfaceColor,

    vec3 deepColor,

    float depth,

    float strength

){

    float t = clamp(
        depth * strength,
        0.0,
        1.0
    );

    t = smoothstep(
        0.0,
        1.0,
        t
    );

    return mix(
        surfaceColor,
        deepColor,
        t
    );

}

float depthFade(

    float depth,

    float nearDepth,

    float farDepth

){

    return smoothstep(
        nearDepth,
        farDepth,
        depth
    );

}

vec3 applyDepthFog(

    vec3 color,

    vec3 fogColor,

    float depth,

    float density

){

    float fog =
        1.0 -
        exp(
            -max(depth, 0.0) *
            density
        );

    fog = clamp(
        fog,
        0.0,
        1.0
    );

    return mix(
        color,
        fogColor,
        fog
    );

}

float applyWaterAbsorption(

    float depth,

    float absorption

){

    return exp(
        -max(depth, 0.0) *
        absorption
    );

}