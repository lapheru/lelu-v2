/**
 * ==========================================================
 * LÉLUVERSE
 * SHADOW FRAGMENT
 * ==========================================================
 */

float applyShadowMask(

    vec3 normal,

    vec3 lightDirection,

    float softness

) {

    float shadow =

        max(

            dot(

                normalize(

                    normal

                ),

                normalize(

                    lightDirection

                )

            ),

            0.0

        );

    shadow =

        smoothstep(

            0.0,

            softness,

            shadow

        );

    return

        1.0 -

        shadow;

}

vec3 applyShadowColor(

    vec3 color,

    vec3 shadowColor,

    float shadow,

    float intensity

) {

    return

        mix(

            color,

            shadowColor,

            shadow *

            intensity

        );

}

float applyCloudShadow(

    vec2 uv,

    float time,

    float scale,

    float strength

) {

    float cloud =

        sin(

            uv.x *

            scale +

            time *

            0.05

        ) *

        cos(

            uv.y *

            scale -

            time *

            0.04

        );

    cloud =

        cloud *

        0.5 +

        0.5;

    return

        cloud *

        strength;

}

vec3 applySoftShadow(

    vec3 color,

    float shadow,

    float softness

) {

    float factor =

        mix(

            1.0,

            1.0 -

            softness,

            shadow

        );

    return

        color *

        factor;

}

vec3 applyOceanShadow(

    vec3 color,

    vec3 shadowColor,

    vec3 normal,

    vec3 lightDirection,

    vec2 uv,

    float time,

    float softness,

    float strength

) {

    float mask =

        applyShadowMask(

            normal,

            lightDirection,

            softness

        );

    mask +=

        applyCloudShadow(

            uv,

            time,

            4.0,

            0.2

        );

    mask =

        clamp(

            mask,

            0.0,

            1.0

        );

    color =

        applyShadowColor(

            color,

            shadowColor,

            mask,

            strength

        );

    return

        applySoftShadow(

            color,

            mask,

            0.25

        );

}