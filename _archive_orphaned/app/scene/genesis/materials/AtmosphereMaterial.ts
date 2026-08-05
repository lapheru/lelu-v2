import {
  Color,
  ShaderMaterial,
} from "three";

export default class AtmosphereMaterial extends ShaderMaterial {

  constructor() {

    super({

      transparent: true,

      depthWrite: false,

      side: 2,

      uniforms: {

        uTime: {
          value: 0,
        },

        uIntensity: {
          value: 1,
        },

        uColor: {
          value: new Color("#6edbff"),
        },

      },

      vertexShader: `

varying vec3 vNormal;
varying vec3 vWorldNormal;

void main(){

    vNormal = normal;

    vWorldNormal =
        normalize(
            mat3(modelMatrix) *
            normal
        );

    gl_Position =
        projectionMatrix *
        modelViewMatrix *
        vec4(position,1.0);

}

`,

      fragmentShader: `

uniform float uTime;
uniform float uIntensity;
uniform vec3 uColor;

varying vec3 vNormal;
varying vec3 vWorldNormal;

void main(){

    vec3 viewDir =
        normalize(cameraPosition);

    float fresnel =
        pow(
            1.0 -
            abs(
                dot(
                    viewDir,
                    vWorldNormal
                )
            ),
            3.0
        );

    float shimmer =
        0.85 +

        sin(
            uTime * 0.8
        ) * 0.15;

    vec3 color =
        uColor *
        shimmer *
        uIntensity;

    gl_FragColor =
        vec4(

            color,

            fresnel * 0.45

        );

}

`

    });

  }

}