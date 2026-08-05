/**
 * ==========================================================
 * LÉLUVERSE
 * LIGHTING FRAGMENT
 * ==========================================================
 */

vec3 applyAmbientLighting(

    vec3 color,

    vec3 ambientColor,

    float intensity

) {

    return

        color +

        ambientColor *

        intensity;

}

vec3 applyDiffuseLighting(

    vec3 color,

    vec3 normal,

    vec3 lightDirection,

    vec3 lightColor,

    float intensity

) {

    float diffuse =

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

    return

        color +

        lightColor *

        diffuse *

        intensity;

}

vec3 applyRimLighting(

    vec3 color,

    vec3 rimColor,

    vec3 normal,

    vec3 viewDirection,

    float power,

    float intensity

) {

    float rim =

        1.0 -

        max(

            dot(

                normalize(

                    normal

                ),

                normalize(

                    viewDirection

                )

            ),

            0.0

        );

    rim =

        pow(

            rim,

            power

        );

    return

        color +

        rimColor *

        rim *

        intensity;

}

vec3 applyShadow(

    vec3 color,

    float shadow,

    float strength

) {

    return

        mix(

            color,

            color *

            (1.0 - strength),

            shadow

        );

}

vec3 applyLighting(

    vec3 baseColor,

    vec3 ambientColor,

    vec3 lightColor,

    vec3 rimColor,

    vec3 normal,

    vec3 lightDirection,

    vec3 viewDirection,

    float ambientIntensity,

    float diffuseIntensity,

    float rimPower,

    float rimIntensity,

    float shadow

) {

    vec3 result =

        baseColor;

    result =

        applyAmbientLighting(

            result,

            ambientColor,

            ambientIntensity

        );

    result =

        applyDiffuseLighting(

            result,

            normal,

            lightDirection,

            lightColor,

            diffuseIntensity

        );

    result =

        applyRimLighting(

            result,

            rimColor,

            normal,

            viewDirection,

            rimPower,

            rimIntensity

        );

    result =

        applyShadow(

            result,

            shadow,

            0.5

        );

    return

        result;

}