/**
 * ==========================================================
 * LÉLUVERSE
 * CORE MUTATION VISUALIZER
 *
 * Living plasma field tightly surrounding
 * the Genesis Core.
 *
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, ShaderMaterial } from "three";

import { useGenesis } from "../GenesisCore";

export default function CoreMutationVisualizer() {

  const { universe } = useGenesis();

  const field = useRef<Mesh>(null);

  const material = useRef<ShaderMaterial>(null);

  const time = useRef(0);

  useFrame((_, delta) => {

    if (!field.current || !material.current)
      return;

    time.current += delta;

    const evo =
      universe.evolutionSystem;

    const mutation =
      evo?.mutation ?? 0;

    const colorShift =
      evo?.colorShift ?? 0;

    const formChange =
      evo?.formChange ?? 0;

    const plasma =
      evo?.plasma ?? 0.2;

    const instability =
      evo?.instability ?? 0;

    const emergence =
      evo?.emergence ?? 0;

    const awareness =
      universe.awareness ?? 0;

    const activity =
      Math.max(
        mutation,
        awareness,
        0.15,
      );

    field.current.rotation.y +=
      delta *
      (
        0.05 +
        activity * 0.12 +
        instability * 0.04
      );

    field.current.rotation.x +=
      delta *
      (
        0.01 +
        activity * 0.02
      );

    const pulse =

      1 +

      Math.sin(
        time.current *
        (1.4 + plasma)
      )

      *

      (
        0.006 +

        activity * 0.012 +

        emergence * 0.010
      );

    field.current.scale.setScalar(

      pulse +

      formChange * 0.02

    );

    material.current.uniforms.uTime.value =
      time.current;

    material.current.uniforms.uActivity.value =
      activity;

    material.current.uniforms.uColorShift.value =
      colorShift;

    material.current.uniforms.uFormChange.value =
      formChange;

    material.current.uniforms.uPlasma.value =
      plasma;

    material.current.uniforms.uInstability.value =
      instability;

    material.current.uniforms.uEmergence.value =
      emergence;

  });

  return (

    <mesh
      ref={field}
      name="MutationPlasma"
      renderOrder={5}
    >

      <sphereGeometry
        args={[
          0.735,
          128,
          128,
        ]}
      />

      <shaderMaterial
        ref={material}
        transparent
        depthWrite={false}
        depthTest
        blending={2}
        uniforms={{
          uTime: {
            value: 0,
          },
          uActivity: {
            value: 0,
          },
          uColorShift: {
            value: 0,
          },
          uFormChange: {
            value: 0,
          },
          uPlasma: {
            value: 0.2,
          },
          uInstability: {
            value: 0,
          },
          uEmergence: {
            value: 0,
          },
        }}

        vertexShader={`
                    uniform float uTime;
          uniform float uActivity;
          uniform float uColorShift;
          uniform float uFormChange;
          uniform float uPlasma;
          uniform float uInstability;
          uniform float uEmergence;

          varying vec3 vNormal;
          varying vec3 vPosition;
          varying float vEnergy;

          void main(){

            vNormal = normal;

            vec3 p = position;

            float wave1 =

              sin(

                position.x * 8.0 +

                position.y * 8.0 +

                uTime *

                (2.0 + uPlasma)

              );

            float wave2 =

              cos(

                position.z * 10.0 +

                uTime *

                (1.2 + uInstability)

              );

            float turbulence =

              sin(

                position.x * 20.0 +

                position.y * 14.0 +

                position.z * 18.0 +

                uTime * 4.0

              );

            float displacement =

              (wave1 * 0.5 +

               wave2 * 0.3 +

               turbulence * 0.2)

              *

              (

                0.004 +

                uActivity * 0.010 +

                uFormChange * 0.012 +

                uEmergence * 0.020

              );

            p += normal * displacement;

            vEnergy =

              clamp(

                uActivity +

                uPlasma * 0.4 +

                uEmergence * 0.4,

                0.0,

                1.0

              );

            vPosition = p;

            gl_Position =

              projectionMatrix *

              modelViewMatrix *

              vec4(

                p,

                1.0

              );

          }

        `}

        fragmentShader={`
                 uniform float uTime;
          uniform float uActivity;
          uniform float uColorShift;
          uniform float uFormChange;
          uniform float uPlasma;
          uniform float uInstability;
          uniform float uEmergence;

          varying vec3 vNormal;
          varying vec3 vPosition;
          varying float vEnergy;

          void main(){

            float fresnel =

              pow(

                1.0 -

                abs(vNormal.z),

                2.5

              );

            float plasma =

              0.5 +

              0.5 *

              sin(

                vPosition.x * 10.0 +

                vPosition.y * 10.0 +

                vPosition.z * 6.0 +

                uTime *

                (2.5 + uPlasma)

              );

            vec3 cyan =

              vec3(

                0.08,

                0.85,

                1.0

              );

            vec3 violet =

              vec3(

                0.45,

                0.22,

                1.0

              );

            vec3 gold =

              vec3(

                1.0,

                0.82,

                0.18

              );

            vec3 white =

              vec3(

                1.0,

                1.0,

                1.0

              );

            vec3 color =

              mix(

                cyan,

                violet,

                plasma

              );

            color =

              mix(

                color,

                gold,

                uColorShift

              );

            color =

              mix(

                color,

                white,

                uEmergence * 0.35

              );

            color +=

              uInstability *

              0.15 *

              sin(

                uTime * 8.0 +

                vPosition.xyz

              );

            float alpha =

              (

                0.035 +

                uActivity * 0.04 +

                uPlasma * 0.03 +

                uEmergence * 0.04

              )

              *

              fresnel;

            gl_FragColor =

              vec4(

                color,

                alpha

              );

          }

        `}
      />

    </mesh>

  );

} 