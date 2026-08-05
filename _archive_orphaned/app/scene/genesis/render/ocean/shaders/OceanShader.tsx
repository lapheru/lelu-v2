/**
 * ==========================================================
 * LÉLUVERSE
 * OCEAN SHADER
 * ==========================================================
 */

import {
  ShaderMaterial,
  Color,
  DoubleSide,
} from "three";

import WaterVertex from "./vertex/WaterVertex.glsl";
import WaterFragment from "./fragment/WaterFragment.glsl";

export function createOceanShader() {

  return new ShaderMaterial({

    vertexShader: WaterVertex,

    fragmentShader: WaterFragment,

    transparent: true,

    side: DoubleSide,

    depthWrite: false,

    depthTest: true,

    uniforms: {

      uTime: {

        value: 0,

      },

      uWaveHeight: {

        value: 1.0,

      },

      uTide: {

        value: 0.5,

      },

      uCurrent: {

        value: 1.0,

      },

      uDeepColor: {

        value: new Color("#021B33"),

      },

      uSurfaceColor: {

        value: new Color("#1F7CFF"),

      },

      uFoamColor: {

        value: new Color("#FFFFFF"),

      },

      uGlowColor: {

        value: new Color("#66CCFF"),

      },

      uSkyColor: {

        value: new Color("#87CEEB"),

      },

      uLightColor: {

        value: new Color("#FFFFFF"),

      },

      uShellTint: {

        value: new Color("#021B33"),

      },

      uShellOpacity: {

        value: 1.0,

      },

    },

  });

}

const OceanShader = createOceanShader();

export {

  OceanShader,

};

export default OceanShader;