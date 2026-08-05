/**
 * ==========================================================
 * LÉLUVERSE
 * GLOW FRAGMENT
 *
 * Ocean glow utilities.
 * ==========================================================
 */

vec3 applyGlow(

    vec3 color,

    vec3 glowColor,

    vec2 uv,

    float time,

    float strength

){

    float pulse =

        0.5 +

        0.5 *

        sin(

            time * 0.8

        );

    float radial =

        1.0 -

        distance(

            uv,

            vec2(

                0.5,

                0.5

            )

        ) *

        2.0;

    radial =

        clamp(

            radial,

            0.0,

            1.0

        );

    radial =

        pow(

            radial,

            2.0

        );

    float glow =

        radial *

        pulse *

        strength;

    return

        color +

        glowColor *

        glow;

}

vec3 applyEdgeGlow(

    vec3 color,

    vec3 glowColor,

    float fresnel,

    float strength

){

    return

        color +

        glowColor *

        fresnel *

        strength;

}