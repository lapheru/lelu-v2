/**
 * ==========================================================
 * LÉLUVERSE
 * ENGINE MANAGER
 * ==========================================================
 */

import type { GenesisState } from "../state/GenesisState";

import EngineGroup from "./EngineGroup";

export default class EngineManager {

  private readonly groups: EngineGroup[] = [];

  register(

    group: EngineGroup,

  ): void {

    this.groups.push(

      group,

    );

  }

  update(

    state: GenesisState,

    delta: number,

  ): void {

    for (

      const group of

      this.groups

    ) {

      group.update(

        state,

        delta,

      );

    }

  }

}