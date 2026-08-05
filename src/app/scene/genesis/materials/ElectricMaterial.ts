import {
  AdditiveBlending,
  Color,
  DoubleSide,
  ShaderMaterial,
} from "three";

export default class ElectricMaterial extends ShaderMaterial {

  constructor() {

    super({

      transparent: true,

      depthWrite: false,

      side: DoubleSide,

      blending: AdditiveBlending,

      uniforms: {

        uTime: {
          value: 0,
        },

        uActivity: {
          value: 0,
        },

        uColor: {
          value: new Color("#66ddff"),
        },

        uIntensity: {
          value: 1,
        },

      },

      vertexShader: `

varying vec3 vPosition;
varying vec3 vNormal;

uniform float uTime;
uniform float uActivity;

void main(){

    vPosition = position;
    vNormal = normal;

    float crackle =
        sin(position.x*25.0+uTime*8.0) *
        sin(position.y*18.0-uTime*6.0);

    crackle +=
        sin(position.z*30.0+uTime*12.0)*0.5;

    crackle *=
        0.012 *
        (1.0 + uActivity);

    vec3 displaced =
        position +
        normal * crackle;

    gl_Position =
        projectionMatrix *
        modelViewMatrix *
        vec4(displaced,1.0);

}

`,

      fragmentShader: `

uniform float uTime;
uniform float uActivity;
uniform float uIntensity;

uniform vec3 uColor;

varying vec3 vPosition;
varying vec3 vNormal;

float hash(vec3 p){

    return fract(
        sin(
            dot(
                p,
                vec3(
                    127.1,
                    311.7,
                    74.7
                )
            )
        )*43758.5453
    );

}

void main(){

    float arcs =
        abs(
            sin(
                vPosition.x*40.0 +
                uTime*10.0
            )
        );

    arcs *=
        abs(
            cos(
                vPosition.y*32.0 -
                uTime*8.0
            )
        );

    arcs +=
        hash(
            floor(
                vPosition*18.0
            )
        )*0.25;

    arcs =
        smoothstep(
            0.72,
            1.0,
            arcs
        );

    float fresnel =
        pow(
            1.0 -
            abs(
                dot(
                    normalize(vNormal),
                    vec3(0.0,0.0,1.0)
                )
            ),
            3.0
        );

    vec3 color =
        uColor *
        (
            arcs * 2.0 +
            fresnel
        );

    color *=
        (
            1.0 +
            uActivity*0.5
        );

    color *=
        uIntensity;

    float alpha =
        max(
            arcs,
            fresnel*0.4
        );

    gl_FragColor =
        vec4(
            color,
            alpha
        );

}

`

    });

  }

}