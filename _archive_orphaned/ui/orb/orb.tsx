import { MeshDistortMaterial } from "@react-three/drei";

export default function Orb() {
  return (
    <mesh>

      <sphereGeometry args={[1, 128, 128]} />

      <MeshDistortMaterial
        color="#55ccff"
        emissive="#2288ff"
        emissiveIntensity={2}
        distort={0.35}
        speed={2}
        roughness={0.15}
      />

    </mesh>
  );
}