/**
 * ==========================================================
 * LÉLUVERSE
 * HASH
 * ==========================================================
 */

float hash(

    float n

) {

    return

        fract(

            sin(

                n

            ) *

            43758.5453123

        );

}

float hash(

    vec2 p

) {

    return

        fract(

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

float hash(

    vec3 p

) {

    return

        fract(

            sin(

                dot(

                    p,

                    vec3(

                        127.1,

                        311.7,

                        74.7

                    )

                )

            ) *

            43758.5453123

        );

}

vec2 hash2(

    vec2 p

) {

    return

        fract(

            sin(

                vec2(

                    dot(

                        p,

                        vec2(

                            127.1,

                            311.7

                        )

                    ),

                    dot(

                        p,

                        vec2(

                            269.5,

                            183.3

                        )

                    )

                )

            ) *

            43758.5453123

        );

}

vec3 hash3(

    vec3 p

) {

    return

        fract(

            sin(

                vec3(

                    dot(

                        p,

                        vec3(

                            127.1,

                            311.7,

                            74.7

                        )

                    ),

                    dot(

                        p,

                        vec3(

                            269.5,

                            183.3,

                            246.1

                        )

                    ),

                    dot(

                        p,

                        vec3(

                            113.5,

                            271.9,

                            124.6

                        )

                    )

                )

            ) *

            43758.5453123

        );

}