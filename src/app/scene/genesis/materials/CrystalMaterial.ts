import {
  Color,
  ShaderMaterial,
  AdditiveBlending,
  BackSide,
} from "three";

export default class CrystalMaterial extends ShaderMaterial {

  constructor() {

    super({

      transparent: true,

      depthWrite: false,

      side: BackSide,

      blending: AdditiveBlending,

      uniforms: {

        uTime: {
          value: 0,
        },

        uActivity: {
          value: 0,
        },

        uColorA: {
          value: new Color("#5ad8ff"),
        },

        uColorB: {
          value: new Color("#ffffff"),
        },

        uBrightness: {
          value: 1,
        },

      },

      vertexShader: `

varying vec3 vNormal;
varying vec3 vPosition;

uniform float uTime;
uniform float uActivity;

void main(){

    vNormal = normal;
    vPosition = position;

    float pulse =
        sin(
            uTime * 2.0 +
            position.y * 8.0
        ) * 0.01;

    pulse +=
        sin(
            uTime * 0.8 +
            position.x * 4.0
        ) * 0.006;

    pulse *=
        1.0 +
        uActivity * 0.35;

    vec3 displaced =
        position +
        normal * pulse;

    gl_Position =
        projectionMatrix *
        modelViewMatrix *
        vec4(
            displaced,
            1.0
        );

}

`,

      fragmentShader: `

uniform vec3 uColorA;
uniform vec3 uColorB;

uniform float uTime;
uniform float uActivity;
uniform float uBrightness;

varying vec3 vNormal;
varying vec3 vPosition;

void main(){

    vec3 viewDir =
        normalize(
            cameraPosition -
            vPosition
        );

    float fresnel =
        pow(

            1.0 -

            max(
                dot(
                    normalize(vNormal),
                    viewDir
                ),
                0.0
            ),

            4.0

        );

    float crystal =

        abs(
            sin(
                vPosition.y * 20.0 +
                uTime * 2.5
            )
        );

    crystal +=

        abs(
            sin(
                vPosition.x * 14.0 -
                uTime
            )
        ) * 0.5;

    crystal /= 1.5;

    vec3 color =

        mix(

            uColorA,

            uColorB,

            fresnel

        );

    color *=

        0.45 +

        crystal *

        0.9;

    color *=

        1.0 +

        uActivity * 0.4;

    color *=

        uBrightness;

    gl_FragColor =

        vec4(

            color,

            fresnel * 0.65

        );

}

`

    });

  }

}