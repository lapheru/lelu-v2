import {
  Color,
  DoubleSide,
  ShaderMaterial,
} from "three";


export default class OceanMaterial extends ShaderMaterial {


  constructor(){


    super({


      transparent:true,

      depthWrite:false,

      depthTest:true,

      side:DoubleSide,

      dithering:true,





      uniforms:{


        uTime:{
          value:0,
        },


        uActivity:{
          value:0,
        },



        uDeepColor:{
          value:new Color("#001428"),
        },


        uMidColor:{
          value:new Color("#004f87"),
        },


        uSurfaceColor:{
          value:new Color("#3bd5ff"),
        },


        uFoamColor:{
          value:new Color("#ffffff"),
        },



        uSunDirection:{
          value:{
            x:0.35,
            y:0.85,
            z:0.22,
          },
        },


        uSunColor:{
          value:new Color("#fff5cf"),
        },



        uPrimaryAmplitude:{
          value:0.040,
        },


        uSecondaryAmplitude:{
          value:0.018,
        },


        uRippleAmplitude:{
          value:0.006,
        },


        uPrimaryFrequency:{
          value:6.0,
        },


        uSecondaryFrequency:{
          value:13.0,
        },


        uRippleFrequency:{
          value:48.0,
        },



        uFoamStrength:{
          value:1.0,
        },


        /*
         * Transparent living shell.
         */
        uTransparency:{
          value:0.35,
        },


        uSpecularStrength:{
          value:2.5,
        },


        uFresnelPower:{
          value:5.0,
        },


        uScatterStrength:{
          value:0.45,
        },

      },





vertexShader:`

uniform float uTime;
uniform float uActivity;

uniform float uPrimaryAmplitude;
uniform float uSecondaryAmplitude;
uniform float uRippleAmplitude;

uniform float uPrimaryFrequency;
uniform float uSecondaryFrequency;
uniform float uRippleFrequency;


varying vec3 vWorldPosition;
varying vec3 vNormal;
varying float vWaveHeight;
varying float vFoamMask;



float hash(vec3 p){

    p = fract(
        p * 0.3183099 + 0.1
    );

    p *= 17.0;

    return fract(
        p.x *
        p.y *
        p.z *
        (p.x+p.y+p.z)
    );

}



float noise(vec3 p){

    vec3 i = floor(p);

    vec3 f = fract(p);

    f = f*f*(3.0-2.0*f);


    float n000 = hash(i);

    float n100 = hash(i+vec3(1,0,0));

    float n010 = hash(i+vec3(0,1,0));

    float n110 = hash(i+vec3(1,1,0));

    float n001 = hash(i+vec3(0,0,1));

    float n101 = hash(i+vec3(1,0,1));

    float n011 = hash(i+vec3(0,1,1));

    float n111 = hash(i+vec3(1,1,1));


    float nx00 = mix(n000,n100,f.x);

    float nx10 = mix(n010,n110,f.x);

    float nx01 = mix(n001,n101,f.x);

    float nx11 = mix(n011,n111,f.x);


    float nxy0 = mix(nx00,nx10,f.y);

    float nxy1 = mix(nx01,nx11,f.y);


    return mix(nxy0,nxy1,f.z);

}



float fbm(vec3 p){

    float value = 0.0;

    float amp = 0.5;


    for(int i=0;i<5;i++){

        value += noise(p)*amp;

        p*=2.02;

        amp*=0.5;

    }


    return value;

}



void main(){


    vec3 dir = normalize(position);


    float wave =


        sin(
            dir.x*uPrimaryFrequency+
            uTime*0.45
        )*

        uPrimaryAmplitude;



    wave +=

        cos(
            dir.z*uPrimaryFrequency-
            uTime*0.38
        )

        *

        uPrimaryAmplitude;



    wave +=

        fbm(

            dir*30.0 +

            uTime*0.2

        )

        *

        uRippleAmplitude;



    wave +=

        uActivity *

        0.025;



    float radius =

        length(position)+wave;



    vec3 displaced =

        dir*radius;



    vec4 world =

        modelMatrix *

        vec4(

            displaced,

            1.0

        );



    vWorldPosition = world.xyz;


    vWaveHeight = wave;


    vFoamMask = smoothstep(

        0.02,

        0.06,

        wave

    );


    vNormal = normalize(

        mat3(modelMatrix)

        *

        normalize(displaced)

    );


    gl_Position =

        projectionMatrix *

        viewMatrix *

        world;

}

`,





fragmentShader:`

uniform vec3 uDeepColor;
uniform vec3 uMidColor;
uniform vec3 uSurfaceColor;
uniform vec3 uFoamColor;

uniform vec3 uSunColor;
uniform vec3 uSunDirection;

uniform float uTransparency;
uniform float uSpecularStrength;
uniform float uScatterStrength;
uniform float uActivity;


varying vec3 vWorldPosition;
varying vec3 vNormal;
varying float vWaveHeight;
varying float vFoamMask;




void main(){


    vec3 N = normalize(vNormal);


    vec3 V = normalize(

        cameraPosition -

        vWorldPosition

    );


    float NoV = max(

        dot(N,V),

        0.0

    );



    float fresnel = pow(

        1.0-NoV,

        3.0

    );



    vec3 water = mix(

        uDeepColor,

        uSurfaceColor,

        fresnel

    );



    float foam =

        vFoamMask *

        (1.0+uActivity);



    water = mix(

        water,

        uFoamColor,

        clamp(

            foam,

            0.0,

            1.0

        )

    );



    water +=

        uSunColor *

        pow(

            max(

                dot(

                    N,

                    normalize(uSunDirection)

                ),

                0.0

            ),

            80.0

        )

        *

        uSpecularStrength;



    float alpha =


        uTransparency +

        fresnel *

        0.35;



    gl_FragColor =


        vec4(

            water,

            clamp(

                alpha,

                0.0,

                0.75

            )

        );


}

`

    });


  }


}