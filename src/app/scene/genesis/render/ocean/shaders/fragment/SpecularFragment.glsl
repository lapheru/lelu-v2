/**
 * ==========================================================
 * LÉLUVERSE
 * SPECULAR FRAGMENT
 * ==========================================================
 */

vec3 applySpecular(

    vec3 color,

    vec3 normal,

    vec3 lightDirection,

    vec3 viewDirection,

    vec3 specularColor,

    float shininess,

    float intensity

) {

    vec3 N =

        normalize(

            normal

        );

    vec3 L =

        normalize(

            lightDirection

        );

    vec3 V =

        normalize(

            viewDirection

        );

    vec3 H =

        normalize(

            L +

            V

        );

    float specular =

        pow(

            max(

                dot(

                    N,

                    H

                ),

                0.0

            ),

            shininess

        );

    return

        color +

        specularColor *

        specular *

        intensity;

}

float specularMask(

    vec3 normal,

    vec3 lightDirection

) {

    return

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

}

vec3 applySparkle(

    vec3 color,

    vec2 uv,

    float time,

    vec3 sparkleColor,

    float intensity

) {

    float sparkle =

        sin(

            uv.x *

            180.0 +

            time *

            8.0

        ) *

        cos(

            uv.y *

            180.0 -

            time *

            7.0

        );

    sparkle =

        pow(

            sparkle *

            0.5 +

            0.5,

            18.0

        );

    return

        color +

        sparkleColor *

        sparkle *

        intensity;

}