/**
 * ==========================================================
 * LÉLUVERSE
 * SPACE FOG
 *
 * Living atmospheric depth.
 * ==========================================================
 */

import {

  Fog,

} from "three";

import {

  useFrame,

  useThree,

} from "@react-three/fiber";

export default function SpaceFog() {

  const {

    scene,

  } = useThree();

  useFrame(({ clock }) => {

    const fog = scene.fog;

    if (!(fog instanceof Fog))
      return;

    const t =
      clock.elapsedTime;

    fog.near =

      35 +

      Math.sin(
        t * 0.08,
      ) * 4;

    fog.far =

      220 +

      Math.cos(
        t * 0.05,
      ) * 20;

  });

  return (

    <fog

      attach="fog"

      args={[

        "#030611",

        35,

        220,

      ]}

    />

  );

}