/**
 * ==========================================================
 * LÉLUVERSE
 * CAUSTIC FRAGMENT
 *
 * Animated underwater light caustics.
 * ==========================================================
 */

float hash(vec2 p){

    return fract(

        sin(

            dot(

                p,

                vec2(

                    127.1,

                    311.7

                )

            )

        ) *

        43758.5453123

    );

}

float noise(vec2 p){

    vec2 i = floor(p);

    vec2 f = fract(p);

    vec2 u =

        f * f *

        (

            3.0 -

            2.0 * f

        );

    return mix(

        mix(

            hash(i),

            hash(i + vec2(1.0,0.0)),

            u.x

        ),

        mix(

            hash(i + vec2(0.0,1.0)),

            hash(i + vec2(1.0,1.0)),

            u.x

        ),

        u.y

    );

}

float applyCaustics(

    vec2 uv,

    float time,

    float strength

){

    vec2 p =

        uv * 8.0;

    p.x +=

        time * 0.15;

    p.y -=

        time * 0.12;

    float c1 =

        noise(p);

    float c2 =

        noise(

            p * 1.8 +

            vec2(

                time * 0.4,

                -time * 0.3

            )

        );

    float c3 =

        noise(

            p * 3.2 -

            vec2(

                time * 0.2,

                time * 0.25

            )

        );

    float caustic =

        c1 * 0.5 +

        c2 * 0.35 +

        c3 * 0.15;

    caustic =

        smoothstep(

            0.55,

            0.82,

            caustic

        );

    return

        caustic *

        strength;

}

vec3 applyCausticColor(

    vec3 color,

    float caustics,

    vec3 lightColor

){

    return

        color +

        lightColor *

        caustics;

}