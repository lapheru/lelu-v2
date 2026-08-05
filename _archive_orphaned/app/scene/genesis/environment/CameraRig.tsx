/**
 * ==========================================================
 * LÉLUVERSE
 * CAMERA RIG
 *
 * Living camera that constantly
 * drifts through space.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";

import { useRef } from "react";

import { Group } from "three";

export default function CameraRig() {

  const rig =
    useRef<Group>(null);

  useFrame(({ camera, clock }) => {

    const t =
      clock.elapsedTime;

    camera.position.x =

      Math.sin(
        t * 0.08,
      ) * 0.8;

    camera.position.y =

      Math.cos(
        t * 0.06,
      ) * 0.5;

    camera.position.z =

      8 +

      Math.sin(
        t * 0.04,
      ) * 0.6;

    camera.rotation.x =

      Math.sin(
        t * 0.025,
      ) * 0.015;

    camera.rotation.y =

      Math.cos(
        t * 0.03,
      ) * 0.02;

    camera.lookAt(

      0,

      0,

      0,

    );

  });

  return <group ref={rig} />;

}