/**
 * ==========================================================
 * LÉLUVERSE
 * ENGINE MANIFEST
 * ==========================================================
 */

import type {

  EngineProfile,

} from "./EngineProfile";

export default class EngineManifest {

  private readonly engines:

    EngineProfile[] = [];

  register(

    profile: EngineProfile,

  ): void {

    this.engines.push(

      profile,

    );

  }

  getAll(): EngineProfile[] {

    return this.engines;

  }

}