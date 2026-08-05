/**
 * ==========================================================
 * LÉLUVERSE
 * CODE SYSTEM
 * ==========================================================
 */

export interface RuntimeModule {

  id: string;

  enabled: boolean;

  version: string;

}

export default class CodeSystem {

  private modules =

    new Map<string, RuntimeModule>();

  register(

    module: RuntimeModule,

  ) {

    this.modules.set(

      module.id,

      module,

    );

  }

  enable(

    id: string,

  ) {

    const module =

      this.modules.get(id);

    if (!module) return;

    module.enabled = true;

  }

  disable(

    id: string,

  ) {

    const module =

      this.modules.get(id);

    if (!module) return;

    module.enabled = false;

  }

  getModules() {

    return Array.from(

      this.modules.values(),

    );

  }

}