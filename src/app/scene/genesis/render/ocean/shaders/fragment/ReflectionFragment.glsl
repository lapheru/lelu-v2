/**
 * ==========================================================
 * LÉLUVERSE
 * REFLECTION FRAGMENT
 * ==========================================================
 */

vec3 applyReflection(

    vec3 color,

    vec3 skyColor,

    vec3 normal,

    vec3 viewDirection,

    float strength

) {

    vec3 reflected =

        reflect(

            -normalize(

                viewDirection

            ),

            normalize(

                normal

            )

        );

    float horizon =

        clamp(

            reflected.y *

            0.5 +

            0.5,

            0.0,

            1.0

        );

    vec3 reflection =

        mix(

            skyColor *

            0.35,

            skyColor,

            horizon

        );

    return

        mix(

            color,

            reflection,

            strength

        );

}

vec3 applyReflectionTint(

    vec3 color,

    vec3 tint,

    float amount

) {

    return

        mix(

            color,

            tint,

            clamp(

                amount,

                0.0,

                1.0

            )

        );

}