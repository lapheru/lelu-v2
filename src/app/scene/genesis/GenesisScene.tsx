/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS SCENE
 *
 * The birthplace of Lélu.
 *
 * Includes:
 * - Three canvas
 * - Genesis controller
 * - Crash protection
 * ==========================================================
 */


import {
  Canvas,
} from "@react-three/fiber";

import {
  useContextBridge,
} from "@react-three/drei";


import GenesisController
  from "./GenesisController";

import GenesisCore, {
  GenesisContext,
} from "./GenesisCore";

import GenesisErrorBoundary
  from "./GenesisErrorBoundary";

import GenesisInterface
  from "./GenesisInterface";





function GenesisCanvas() {
  const ContextBridge = useContextBridge(GenesisContext);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Canvas
        style={{
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
          }}
        camera={{
          position: [0, 0, 6.2],
          fov: 46,
        }}
        shadows
        gl={{
          antialias: true,
        }}
      >
        <color attach="background" args={["#000000"]} />

        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 6, 4]} intensity={1.5} />
        <pointLight position={[-4, 2, 3]} intensity={1.2} color="#38bdf8" />

        <ContextBridge>
          <GenesisErrorBoundary>
            <GenesisController />
          </GenesisErrorBoundary>
        </ContextBridge>
      </Canvas>

      <GenesisInterface />
    </div>
  );
}

export default function GenesisScene() {
  return (
    <GenesisCore>
      <GenesisCanvas />
    </GenesisCore>
  );

}