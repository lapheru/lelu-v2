/**
 * ==========================================================
 * LÉLUVERSE
 * WHIRLPOOL FRAGMENT
 * ==========================================================
 */

float applyWhirlpool(

    vec2 uv,

    float time,

    float strength

) {

    vec2 center =

        vec2(

            0.5,

            0.5

        );

    vec2 offset =

        uv -

        center;

    float radius =

        length(

            offset

        );

    float angle =

        atan(

            offset.y,

            offset.x

        );

    angle +=

        time *

        2.0 *

        strength;

    float spiral =

        sin(

            angle *

            8.0 -

            radius *

            40.0

        );

    spiral =

        spiral *

        0.5 +

        0.5;

    return

        spiral *

        smoothstep(

            1.0,

            0.0,

            radius

        ) *

        strength;

}