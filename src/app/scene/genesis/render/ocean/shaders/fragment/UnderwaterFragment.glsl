/**
 * ==========================================================
 * LÉLUVERSE
 * UNDERWATER FRAGMENT
 * ==========================================================
 */

vec3 applyUnderwaterTint(

    vec3 color,

    vec3 waterColor,

    float depth,

    float strength

) {

    float tint =

        clamp(

            depth *

            strength,

            0.0,

            1.0

        );

    return

        mix(

            color,

            waterColor,

            tint

        );

}

vec3 applyLightAttenuation(

    vec3 color,

    float depth,

    float density

) {

    float attenuation =

        exp(

            -depth *

            density

        );

    return

        color *

        attenuation;

}

vec3 applyUnderwaterFog(

    vec3 color,

    vec3 fogColor,

    float depth,

    float density

) {

    float fog =

        1.0 -

        exp(

            -depth *

            density

        );

    fog =

        clamp(

            fog,

            0.0,

            1.0

        );

    return

        mix(

            color,

            fogColor,

            fog

        );

}

float applyVisibility(

    float depth,

    float maxDistance

) {

    return

        clamp(

            1.0 -

            depth /

            maxDistance,

            0.0,

            1.0

        );

}

vec3 applyScattering(

    vec3 color,

    vec3 scatterColor,

    float depth,

    float strength

) {

    float scatter =

        1.0 -

        exp(

            -depth *

            strength

        );

    return

        mix(

            color,

            scatterColor,

            scatter

        );

}