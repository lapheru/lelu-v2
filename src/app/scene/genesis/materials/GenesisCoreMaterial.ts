/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS CORE MATERIAL
 *
 * Living Genesis Plasma
 *
 * Complete Rewrite
 *
 * Features
 * • Living plasma
 * • Convection currents
 * • Magnetic ribbons
 * • Cellular evolution
 * • Stable HDR color
 * • Reality distortion
 * • Energy breathing
 * • Future-proof mutation hooks
 * *
 * Part 1
 * ==========================================================
 */

import {
  Color,
  FrontSide,
  NormalBlending,
  ShaderMaterial,
} from "three";

export default class GenesisCoreMaterial extends ShaderMaterial {

  constructor() {

    super({

      transparent: true,

      depthWrite: false,

      depthTest: true,

      blending: NormalBlending,

      side: FrontSide,

      uniforms: {

        uTime: {
          value: 0,
        },

        uActivity: {
          value: 0,
        },

        uEvolution: {
          value: 0,
        },

        uMutation: {
          value: 0,
        },

        uAwareness: {
          value: 0,
        },

        uGrowth: {
          value: 0,
        },

        uInstability: {
          value: 0,
        },

        uPlasma: {
          value: 1.0,
        },

        uOceanBlend: {
  value: 1.0,
},

uOceanFlow: {
  value: 0.5,
},

uOceanDepth: {
  value: 0.5,
},

uOceanFoam: {
  value: 0.5,
},

uOceanCurrent: {
  value: 0.5,
},

        uColorShift: {
          value: 0,
        },

        uCoreColor: {
          value: new Color("#009CFF"),
        },

        uGlowColor: {
          value: new Color("#4BD9FF"),
        },

      },

      vertexShader: `

varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vPosition;

uniform float uTime;
uniform float uActivity;
uniform float uEvolution;
uniform float uMutation;
uniform float uGrowth;
uniform float uPlasma;
uniform float uOceanBlend;
uniform float uOceanFlow;
uniform float uOceanDepth;
uniform float uOceanFoam;
uniform float uOceanCurrent;
uniform float uInstability;

//
// Hash
//

float hash(vec3 p){

    p = fract(p * 0.3183099 + .1);

    p *= 17.0;

    return fract(
        p.x *
        p.y *
        p.z *
        (p.x + p.y + p.z)
    );

}

//
// Value Noise
//

float noise(vec3 p){

    vec3 i = floor(p);

    vec3 f = fract(p);

    f = f * f * (3.0 - 2.0 * f);

    float n000 = hash(i);

    float n100 = hash(i + vec3(1,0,0));

    float n010 = hash(i + vec3(0,1,0));

    float n110 = hash(i + vec3(1,1,0));

    float n001 = hash(i + vec3(0,0,1));

    float n101 = hash(i + vec3(1,0,1));

    float n011 = hash(i + vec3(0,1,1));

    float n111 = hash(i + vec3(1,1,1));

    float nx00 = mix(n000,n100,f.x);

    float nx10 = mix(n010,n110,f.x);

    float nx01 = mix(n001,n101,f.x);

    float nx11 = mix(n011,n111,f.x);

    float nxy0 = mix(nx00,nx10,f.y);

    float nxy1 = mix(nx01,nx11,f.y);

    return mix(
        nxy0,
        nxy1,
        f.z
    );

}

//
// Fractal Brownian Motion
//

float fbm(vec3 p){

    float value = 0.0;

    float amplitude = 0.5;

    for(int i=0;i<6;i++){

        value += noise(p) * amplitude;

        p *= 2.02;

        amplitude *= 0.5;

    }

    return value;

}
    //
// Living Convection
//

float convection(vec3 p){

    float c = 0.0;

    c += fbm(
        p * 1.2 +
        vec3(
            uTime * 0.05,
            uTime * 0.09,
            uTime * 0.03
        )
    );

    c += fbm(
        p * 2.6 -
        vec3(
            uTime * 0.08,
            uTime * 0.04,
            uTime * 0.06
        )
    ) * 0.55;

    c += fbm(
        p * 5.2 +
        vec3(
            uTime * 0.18,
            uTime * 0.11,
            uTime * 0.13
        )
    ) * 0.25;

    return c;

}

//
// Magnetic Ribbon Field
//

float ribbons(vec3 p){

    float field =

        sin(
            p.y * 24.0 +

            sin(
                p.x * 8.0
            ) *

            2.5 +

            uTime * 2.5
        );

    field +=

        sin(
            p.z * 18.0 -

            uTime * 1.8
        ) * 0.35;

    field *= 0.5;

    field += 0.5;

    return field;

}

void main(){

    vNormal =

        normalize(

            normalMatrix *

            normal

        );

    vPosition =

        position;

    float convectionField =

        convection(

            position *

            1.75

        );

    float ribbonField =

        ribbons(

            position

        );

    float plasmaField =

        mix(

            convectionField,

            ribbonField,

            0.30

        );

    float breathing =

        0.010 +

        sin(

            uTime *

            1.8

        ) *

        0.008;

    float distortion =

        breathing +

        plasmaField * 0.055 +

        uActivity * 0.030 +

        uMutation * 0.025 +

        uEvolution * 0.018 +

        uGrowth * 0.014 +

        uPlasma * 0.018 -

        uInstability * 0.010;

    vec3 displaced =

        position +

        normal *

        distortion;

    vec4 world =

        modelMatrix *

        vec4(

            displaced,

            1.0

        );

    vWorldPosition =

        world.xyz;

    gl_Position =

        projectionMatrix *

        viewMatrix *

        world;

}

`,
fragmentShader: `

uniform float uTime;
uniform float uActivity;
uniform float uEvolution;
uniform float uMutation;
uniform float uAwareness;
uniform float uGrowth;
uniform float uPlasma;
uniform float uColorShift;

uniform vec3 uCoreColor;
uniform vec3 uGlowColor;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vWorldPosition;

//
// Plasma Cell Noise
//

float plasmaNoise(vec3 p){

    return

        sin(
            p.x * 14.0 +
            uTime * 2.2
        )

        *

        sin(
            p.y * 18.0 -
            uTime * 1.6
        )

        *

        sin(
            p.z * 12.0 +
            uTime * 2.8
        );

}

//
// Magnetic Flow
//

float magnetic(vec3 p){

    float bands =

        sin(

            p.y * 24.0 +

            sin(

                p.x * 6.0

            ) * 2.0 +

            uTime * 3.0

        );

    bands =

        bands * 0.5 +

        0.5;

    return bands;

}

float plasmaNoise(...)

float magnetic(...)

float oceanCurrent(...)

float oceanDepthField(...)

float oceanCaustics(...)

float oceanFoamField(...)

float bioluminescence(...)

vec3 oceanVolume(...)

void main(){

    ...
}


    vec3 N =

        normalize(
            vNormal
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

            3.0

        );

    float ribbons =

        magnetic(

            vPosition

        );

    float cells =

    float current =
    oceanCurrent(vPosition);

float depth =
    oceanDepthField(vPosition);

float caustics =
    oceanCaustics(vPosition);

float bio =
    bioluminescence(vPosition);

vec3 ocean =
    oceanVolume(
        depth,
        current
    );

        plasmaNoise(

            vPosition *

            3.2

        ) *

        0.5 +

        0.5;

        float current =
    oceanCurrent(
        vPosition
    );

float depth =
    oceanDepthField(
        vPosition
    );

float caustics =
    oceanCaustics(
        vPosition
    );

float foam =
    oceanFoamField(
        current,
        heat
    );

float bio =
    bioluminescence(
        vPosition
    );

vec3 ocean =
    oceanVolume(
        depth,
        current
    );

    float heat =

        ribbons * 0.45 +

        cells * 0.35 +

        uActivity * 0.20 +

        uMutation * 0.18 +

        uEvolution * 0.15 +

        uGrowth * 0.10 +

        uAwareness * 0.08 +

        uPlasma * 0.10;

    heat =

        clamp(

            heat,

            0.0,

            1.0

        );

         float current =
    oceanCurrent(vPosition);

float depth =
    oceanDepthField(vPosition);

float caustics =
    oceanCaustics(vPosition);

float bio =
    bioluminescence(vPosition);

float foam =
    oceanFoamField(
        current,
        heat
    );

    vec3 ocean =
    oceanVolume(
        depth,
        current
    );

    //
    // Living plasma palette
    //

    vec3 deepBlue =

        vec3(
            0.02,
            0.10,
            0.35
        );

    vec3 cyan =

        vec3(
            0.00,
            0.72,
            1.00
        );

    vec3 violet =

        vec3(
            0.42,
            0.20,
            1.00
        );

    vec3 magenta =

        vec3(
            0.92,
            0.20,
            0.92
        );

    vec3 gold =

        vec3(
            1.00,
            0.78,
            0.18
        );

    vec3 plasma;

    if(heat < 0.25){

        plasma =

            mix(

                deepBlue,

                cyan,

                heat / 0.25

            );

    }

    else if(heat < 0.50){

        plasma =

            mix(

                cyan,

                violet,

                (heat - 0.25) / 0.25

            );

    }

    else if(heat < 0.75){

        plasma =

            mix(

                violet,

                magenta,

                (heat - 0.50) / 0.25

            );

    }

    else{

        plasma =

            mix(

                magenta,

                gold,

                (heat - 0.75) / 0.25

            );

    }
    //
// Dynamic color evolution
//

float oceanNoise =
    plasmaNoise(
        vPosition * 1.4 +
        vec3(
            uTime * 0.15 * uOceanFlow,
            uTime * 0.08,
            uTime * 0.12
        )
    ) * 0.5 + 0.5;

vec3 deepOcean =
    vec3(
        0.00,
        0.08,
        0.30
    );

vec3 shallowOcean =
    vec3(
        0.00,
        0.75,
        1.00
    );

vec3 oceanColor =
    mix(
        deepOcean,
        shallowOcean,
        oceanNoise
    );

oceanColor +=
    vec3(1.0) *
    pow(oceanNoise, 8.0) *
    0.15 *
    uOceanFoam;

vec3 shifted =

    mix(

        ocean,

        plasma,

        uOceanBlend

    );

shifted +=

    ocean *

    depth *

    0.35;

shifted +=

    vec3(

        0.25,

        0.75,

        1.0

    ) *

    caustics *

    0.25;

shifted +=

    vec3(1.0) *

    foam *

    0.20;

shifted +=

    vec3(

        0.15,

        0.90,

        1.0

    ) *

    bio *

    0.18;

shifted =
    mix(
        shifted,
        gold,
        uColorShift * 0.35
    );

    mix(

        plasma,

        gold,

        uColorShift * 0.35

    );

float pulse =

    1.10 +

    sin(

        uTime *

        4.5

    ) *

    0.10;

shifted *=
  pulse; *1.55;

//
// Hot plasma cores
//

float hotspots =

    pow(

        cells,

        4.0

    ) *

    0.85;

shifted +=

    gold *

    hotspots *

    2.2;

shifted +=

    cyan *

    hotspots *

    0.8;
    

//
// Magnetic edge glow
//

float edgeGlow =

    fresnel *

    (

        0.35 +

        uActivity * 0.18 +

        uMutation * 0.10 +

        uEvolution * 0.08

    );

shifted +=

    cyan *

    edgeGlow *

    1.6;

shifted +=

    cyan *

    edgeGlow;

//
// Internal plasma bloom
//

float innerGlow =

    smoothstep(

        0.20,

        1.0,

        heat

    );

shifted +=

    violet *

    innerGlow *

    0.40;

shifted +=

    cyan *

    innerGlow *

    0.25;


//
// Evolution sparkle
//

float sparkle =

    pow(

        abs(

            sin(

                uTime * 6.0 +

                cells * 30.0

            )

        ),

        16.0

    );

shifted +=

    gold *

    sparkle *

    0.08;

//
// Stable alpha
//

float alpha =

    0.35 +

    fresnel * 0.12 +

    heat * 0.10;

alpha =

    clamp(

        alpha,

        0.25,

        0.5

    );

gl_FragColor =

    vec4(

        shifted,

        alpha

    );

}

`

    });

  }

}        