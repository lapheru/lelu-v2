/**
 * ==========================================================
 * LÉLUVERSE
 * CORE MUTATION SYSTEM
 *
 * Living transformation layer.
 *
 * Converts:
 * - evolution
 * - behavior
 * - activity
 *
 * into adaptive mutation states.
 *
 * Publishes mutation values into the
 * Genesis universe so visual systems
 * can consume them.
 * ==========================================================
 */

import {
  useFrame,
} from "@react-three/fiber";

import {
  useRef,
} from "react";

import {
  useGenesis,
} from "../GenesisCore";

export interface CoreMutationState {

  colorShift: number;

  formChange: number;

  plasma: number;

  instability: number;

  emergence: number;

}

export default function CoreMutationSystem() {

  const {

    state,

    updateUniverse,

  } = useGenesis();

  const mutation =

    useRef<CoreMutationState>({

      colorShift: 0,

      formChange: 0,

      plasma: 0.2,

      instability: 0,

      emergence: 0,

    });

  const time =

    useRef(0);

  useFrame((_, delta) => {

    time.current += delta;

    const m = mutation.current;

    const activity =

      (state.thinking ? 1 : 0)

      +

      (state.speaking ? 0.5 : 0)

      +

      (state.actions.length > 0 ? 0.5 : 0);

    m.colorShift =

      (

        Math.sin(

          time.current * 0.08,

        ) + 1

      ) / 2;

    m.formChange +=

      delta *

      0.001 *

      (

        1 +

        activity

      );

    m.formChange =

      Math.min(

        1,

        m.formChange,

      );

    m.plasma =

      0.3 +

      Math.sin(

        time.current * 0.5,

      ) *

      0.2 +

      activity * 0.1;

    m.instability =

      Math.abs(

        Math.sin(

          time.current * 0.03,

        ),

      );

    m.emergence =

      Math.min(

        1,

        m.emergence +

        delta *

        0.0005,

      );
          updateUniverse((universe) => {

      universe.evolutionSystem.stage =
        universe.evolution;

      universe.evolutionSystem.mutation =
        activity;

      universe.evolutionSystem.growth =
        m.formChange;

      universe.evolutionSystem.adaptation =
        1 - m.instability;

      universe.evolutionSystem.colorShift =
        m.colorShift;

      universe.evolutionSystem.formChange =
        m.formChange;

      universe.evolutionSystem.plasma =
        m.plasma;

      universe.evolutionSystem.instability =
        m.instability;

      universe.evolutionSystem.emergence =
        m.emergence;

    });

  });

  return null;

}