import {
  AdditiveBlending,
  Color,
  FrontSide,
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
      blending: AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uActivity: { value: 0 },
        uEvolution: { value: 0 },
        uMutation: { value: 0 },
        uAwareness: { value: 0 },
        uGrowth: { value: 0 },
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
          float ribbon = 0.5 + 0.5 * sin(position.y * 18.0 + position.x * 7.0 + uTime * (1.8 + uPlasma));
          float field = mix(flow, ribbon, 0.42);
          float response = 0.008 + uActivity * 0.018 + uEvolution * 0.012 + uMutation * 0.018 + uGrowth * 0.01 - uInstability * 0.006;
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

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
          float edge = pow(1.0 - max(dot(normal, viewDirection), 0.0), 2.6);
          float cells = cellField(vPosition * (2.0 + uPlasma));
          float activity = clamp(uActivity + uAwareness * 0.25 + uEvolution * 0.25 + uGrowth * 0.18, 0.0, 1.0);
          float ocean = clamp(uOceanDepth * 0.25 + uOceanCurrent * 0.25 + uOceanFlow * 0.2 + uOceanFoam * 0.3, 0.0, 1.0);
          vec3 cyan = mix(uCoreColor, uGlowColor, 0.55 + cells * 0.35);
          vec3 violet = vec3(0.32, 0.16, 1.0);
          vec3 gold = vec3(1.0, 0.72, 0.18);
          vec3 color = mix(cyan, violet, clamp(cells * 0.55 + uMutation * 0.35, 0.0, 1.0));
          color = mix(color, gold, clamp(uColorShift * 0.4, 0.0, 1.0));
          color += vec3(0.0, 0.22, 0.3) * ocean;
          color += uGlowColor * edge * (0.45 + activity * 0.65);
          color += gold * pow(cells, 5.0) * (0.12 + uMutation * 0.35);
          color *= 1.0 + sin(uTime * 4.0) * (0.035 + activity * 0.04);
          float alpha = clamp(0.32 + edge * 0.3 + activity * 0.14 - uInstability * 0.06, 0.2, 0.82);
          gl_FragColor = vec4(color, alpha);
        }
      `,
    });
  }
}
