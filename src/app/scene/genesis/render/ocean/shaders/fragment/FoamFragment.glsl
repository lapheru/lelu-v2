/**
 * ==========================================================
 * LÉLUVERSE
 * FOAM FRAGMENT
 *
 * Ocean foam utilities.
 * ==========================================================
 */

float applyFoam(

    float height,

    float intensity

){

    float foam = smoothstep(

        0.25,

        0.95,

        height

    );

    return clamp(

        foam * intensity,

        0.0,

        1.0

    );

}

float applyFoamEdge(

    float value,

    float width

){

    return smoothstep(

        1.0 - width,

        1.0,

        value

    );

}

vec3 applyFoamColor(

    vec3 water,

    vec3 foamColor,

    float foam

){

    return mix(

        water,

        foamColor,

        clamp(

            foam,

            0.0,

            1.0

        )

    );

}