/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS CAMERA CONTROLLER
 *
 * Connects:
 *
 * GenesisNavigator
 *        ↓
 * Three camera
 *
 * ==========================================================
 */


import {
  useEffect,
  useRef,
} from "react";

import {
  OrbitControls,
} from "@react-three/drei";

import {
  useThree,
} from "@react-three/fiber";

import {
  Vector3,
} from "three";

import type GenesisNavigator
  from "./GenesisNavigator";

interface GenesisCameraControllerProps {
  navigator: GenesisNavigator;
}

export default function GenesisCameraController({
  navigator,
}: GenesisCameraControllerProps) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const followTarget = useRef(new Vector3(0, 0, 0));

  useEffect(() => {
    const unsubscribe = navigator.subscribe((state) => {
      if (!state.target) {
        return;
      }

      followTarget.current.set(
        state.target.position.x,
        state.target.position.y,
        state.target.position.z,
      );

      if (controlsRef.current) {
        controlsRef.current.target.lerp(followTarget.current, 0.12);
        controlsRef.current.update();
      }
    });

    return unsubscribe;
  }, [navigator]);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, [camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      enablePan={false}
      minDistance={4}
      maxDistance={18}
      maxPolarAngle={Math.PI / 2.1}
      target={[0, 0, 0]}
    />
  );
}