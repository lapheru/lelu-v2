import {
  Color,
  FrontSide,
  NormalBlending,
  ShaderMaterial,
} from "three";

/**
 * The core's single material surface. Keep all visual inputs here so the
 * renderer can feed one living surface instead of stacking opaque shells.
 */
export default class GenesisCoreMaterial extends ShaderMaterial {
  constructor() {
    super({
      transparent: true,
      depthTest: true,
      depthWrite: false,
      side: FrontSide,
      // Keep the core chromatic and legible; the surrounding shells and
      // atmosphere provide the additive glow without washing the surface out.
      blending: NormalBlending,
      uniforms: {
        uTime: { value: 0 },
        uActivity: { value: 0 },
        uEvolution: { value: 0 },
        uMutation: { value: 0 },
        uAwareness: { value: 0 },
        uGrowth: { value: 0 },
        uFormChange: { value: 0 },
        uInstability: { value: 0 },
        uPlasma: { value: 0.35 },
        uOceanBlend: { value: 0.25 },
        uOceanFlow: { value: 0.5 },
        uOceanDepth: { value: 0.5 },
        uOceanFoam: { value: 0.2 },
        uOceanCurrent: { value: 0.5 },
        uColorShift: { value: 0 },
        uCoreColor: { value: new Color("#009CFF") },
        uGlowColor: { value: new Color("#4BD9FF") },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uActivity;
        uniform float uEvolution;
        uniform float uMutation;
        uniform float uGrowth;
        uniform float uFormChange;
        uniform float uPlasma;
        uniform float uInstability;

        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        varying float vField;

        float hash(vec3 p) {
          p = fract(p * 0.3183099 + 0.1);
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }

        float noise(vec3 p) {
          vec3 cell = floor(p);
          vec3 local = fract(p);
          local = local * local * (3.0 - 2.0 * local);
          float a = mix(hash(cell), hash(cell + vec3(1.0, 0.0, 0.0)), local.x);
          float b = mix(hash(cell + vec3(0.0, 1.0, 0.0)), hash(cell + vec3(1.0, 1.0, 0.0)), local.x);
          float c = mix(hash(cell + vec3(0.0, 0.0, 1.0)), hash(cell + vec3(1.0, 0.0, 1.0)), local.x);
          float d = mix(hash(cell + vec3(0.0, 1.0, 1.0)), hash(cell + vec3(1.0, 1.0, 1.0)), local.x);
          return mix(mix(a, b, local.y), mix(c, d, local.y), local.z);
        }

        void main() {
          vec3 p = position;
          float flow = noise(position * 3.2 + vec3(uTime * 0.08, uTime * 0.12, -uTime * 0.06));
          float ribbon = 0.5 + 0.5 * sin(position.y * 18.0 + position.x * 7.0 + uTime * (2.4 + uPlasma * 1.8));
          float turbulence = 0.5 + 0.5 * sin(position.z * 28.0 - position.x * 13.0 + uTime * (3.2 + uInstability * 2.0));
          float field = mix(mix(flow, ribbon, 0.46), turbulence, 0.24 + uFormChange * 0.22);
          float response = 0.026 + uActivity * 0.052 + uEvolution * 0.042 + uMutation * 0.065 + uGrowth * 0.046 + uFormChange * 0.11 - uInstability * 0.008;
          p += normal * (field * response);
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          vWorldPosition = (modelMatrix * vec4(p, 1.0)).xyz;
          vField = field;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uActivity;
        uniform float uEvolution;
        uniform float uMutation;
        uniform float uAwareness;
        uniform float uGrowth;
        uniform float uFormChange;
        uniform float uInstability;
        uniform float uPlasma;
        uniform float uOceanBlend;
        uniform float uOceanFlow;
        uniform float uOceanDepth;
        uniform float uOceanFoam;
        uniform float uOceanCurrent;
        uniform float uColorShift;
        uniform vec3 uCoreColor;
        uniform vec3 uGlowColor;

        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        varying float vField;

        float cellField(vec3 p) {
          float a = sin(p.x * 13.0 + uTime * 2.0);
          float b = sin(p.y * 17.0 - uTime * 1.4);
          float c = sin(p.z * 11.0 + uTime * 2.4);
          return 0.5 + 0.5 * (a * b * c);
        }

        vec3 hue(float h) {
          vec3 k = vec3(1.0, 2.0 / 3.0, 1.0 / 3.0);
          vec3 p = abs(fract(vec3(h) + k) * 6.0 - 3.0);
          return clamp(p - 1.0, 0.0, 1.0);
        }

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
          float edge = pow(1.0 - max(dot(normal, viewDirection), 0.0), 2.6);
          float cells = cellField(vPosition * (2.0 + uPlasma));
          float activity = clamp(uActivity + uAwareness * 0.25 + uEvolution * 0.25 + uGrowth * 0.18 + uFormChange * 0.22, 0.0, 1.0);
          float ocean = clamp(uOceanDepth * 0.25 + uOceanCurrent * 0.25 + uOceanFlow * 0.2 + uOceanFoam * 0.3, 0.0, 1.0);
          vec3 spectral = hue(fract(uColorShift * 0.92 + uTime * 0.065 + cells * 0.22 + vField * 0.12));
          vec3 cyan = mix(uCoreColor, uGlowColor, 0.35 + cells * 0.35);
          vec3 violet = vec3(0.32, 0.16, 1.0);
          vec3 color = mix(cyan, violet, clamp(cells * 0.42 + uMutation * 0.28 + uFormChange * 0.2, 0.0, 1.0));
          color = mix(color, spectral, clamp(0.38 + uColorShift * 0.72 + uEvolution * 0.26, 0.0, 0.94));
          color += vec3(0.0, 0.16, 0.24) * ocean;
          color += uGlowColor * edge * (0.16 + activity * 0.24);
          color += spectral * pow(cells, 6.0) * (0.08 + uMutation * 0.2);
          color *= 0.84 + sin(uTime * 4.0) * (0.06 + activity * 0.07);
          float alpha = clamp(0.72 + edge * 0.18 + activity * 0.08 - uInstability * 0.08, 0.58, 0.92);
          gl_FragColor = vec4(color, alpha);
        }
      `,
    });
  }
}
