/**
 * ==========================================================
 * LÉLUVERSE
 * FRESNEL FRAGMENT
 * ==========================================================
 */

float applyFresnel(

    vec3 normal,

    vec3 viewDirection,

    float power

) {

    float fresnel =

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

    fresnel =

        pow(

            fresnel,

            power

        );

    return

        clamp(

            fresnel,

            0.0,

            1.0

        );

}

vec3 applyFresnelColor(

    vec3 color,

    vec3 edgeColor,

    vec3 normal,

    vec3 viewDirection,

    float power,

    float intensity

) {

    float fresnel =

        applyFresnel(

            normal,

            viewDirection,

            power

        );

    return

        mix(

            color,

            edgeColor,

            fresnel *

            intensity

        );

}