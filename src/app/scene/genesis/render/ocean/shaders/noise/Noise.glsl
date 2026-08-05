/**
 * ==========================================================
 * LÉLUVERSE
 * GLSL NOISE
 * ==========================================================
 */

float random(vec2 st) {

    return fract(

        sin(

            dot(

                st,

                vec2(
                    12.9898,
                    78.233
                )

            )

        ) *

        43758.5453123

    );

}

float noise(vec2 st) {

    vec2 i = floor(st);

    vec2 f = fract(st);

    float a = random(i);

    float b = random(

        i +

        vec2(

            1.0,

            0.0

        )

    );

    float c = random(

        i +

        vec2(

            0.0,

            1.0

        )

    );

    float d = random(

        i +

        vec2(

            1.0,

            1.0

        )

    );

    vec2 u =

        f *

        f *

        (

            3.0 -

            2.0 *

            f

        );

    return

        mix(

            a,

            b,

            u.x

        ) +

        (

            c -

            a

        ) *

        u.y *

        (

            1.0 -

            u.x

        ) +

        (

            d -

            b

        ) *

        u.x *

        u.y;

}

float fbm(vec2 st) {

    float value = 0.0;

    float amplitude = 0.5;

    float frequency = 1.0;

    for (

        int i = 0;

        i < 6;

        i++

    ) {

        value +=

            amplitude *

            noise(

                st *

                frequency

            );

        frequency *= 2.0;

        amplitude *= 0.5;

    }

    return value;

}