import {
  AdditiveBlending,
  BackSide,
  Color,
  ShaderMaterial,
} from "three";

export default class HaloMaterial extends ShaderMaterial {

  constructor() {

    super({

      transparent: true,

      depthWrite: false,

      depthTest: true,

      blending: AdditiveBlending,

      side: BackSide,

      uniforms: {

        uTime: {
          value: 0,
        },

        uIntensity: {
          value: 1,
        },

        uActivity: {
          value: 0,
        },

        uColor: {
          value: new Color("#7ce7ff"),
        },

      },

      vertexShader: `

varying vec3 vWorldPosition;
varying vec3 vWorldNormal;

void main(){

    vec4 worldPosition =
        modelMatrix *
        vec4(position,1.0);

    vWorldPosition =
        worldPosition.xyz;

    vWorldNormal =
        normalize(
            mat3(modelMatrix) *
            normal
        );

    gl_Position =
        projectionMatrix *
        viewMatrix *
        worldPosition;

}

`,

      fragmentShader: `

uniform float uTime;
uniform float uIntensity;
uniform float uActivity;
uniform vec3 uColor;

varying vec3 vWorldPosition;
varying vec3 vWorldNormal;

void main(){

    vec3 N =
        normalize(
            vWorldNormal
        );

    vec3 V =
        normalize(
            cameraPosition -
            vWorldPosition
        );

    float fresnel =
        pow(
            1.0 -
            max(
                dot(
                    N,
                    V
                ),
                0.0
            ),
            3.5
        );

    float pulse =
        0.96 +
        0.04 *
        sin(
            uTime *
            0.7
        );

    float shimmer =
        0.985 +
        0.015 *
        sin(
            uTime *
            4.0 +
            vWorldPosition.y *
            5.0
        );

    float glow =
        fresnel *
        pulse *
        shimmer *
        uIntensity *
        (0.8 + uActivity * 0.7);

    vec3 color =
        uColor *
        glow;

    gl_FragColor =
        vec4(
            color,
            glow *
            (0.42 + uActivity * 0.38)
        );

}

`

    });

  }

}