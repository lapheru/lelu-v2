/**
 * ==========================================================
 * LÉLUVERSE
 * ENGINE STATE
 * ==========================================================
 */

import {

  EngineStatus,

} from "./EngineLifecycle";

export default class EngineState {

  status =
    EngineStatus.CREATED;

  set(

    status: EngineStatus,

  ): void {

    this.status = status;

  }

  is(

    status: EngineStatus,

  ): boolean {

    return this.status === status;

  }

}