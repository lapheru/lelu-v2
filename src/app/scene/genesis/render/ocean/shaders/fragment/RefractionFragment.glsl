/**
 * ==========================================================
 * LÉLUVERSE
 * REFRACTION FRAGMENT
 * ==========================================================
 */

vec2 applyRefraction(

    vec2 uv,

    vec3 normal,

    float strength

) {

    vec2 offset =

        normal.xz *

        strength;

    return

        uv +

        offset;

}

vec3 applyRefractionColor(

    vec3 surfaceColor,

    vec3 underwaterColor,

    vec3 normal,

    vec3 viewDirection,

    float strength

) {

    float refraction =

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

    refraction =

        pow(

            refraction,

            2.0

        );

    return

        mix(

            surfaceColor,

            underwaterColor,

            refraction *

            strength

        );

}

vec2 applyHeatDistortion(

    vec2 uv,

    float time,

    float strength

) {

    uv.x +=

        sin(

            uv.y *

            30.0 +

            time *

            2.0

        ) *

        strength;

    uv.y +=

        cos(

            uv.x *

            30.0 -

            time *

            2.0

        ) *

        strength;

    return

        uv;

}

vec2 applyWaveDistortion(

    vec2 uv,

    float time,

    float scale,

    float strength

) {

    uv.x +=

        sin(

            uv.y *

            scale +

            time

        ) *

        strength;

    uv.y +=

        cos(

            uv.x *

            scale +

            time

        ) *

        strength;

    return

        uv;

}