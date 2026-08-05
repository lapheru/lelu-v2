/**
 * ==========================================================
 * LÉLUVERSE
 * UNIVERSE STATE
 *
 * Shared living state for the
 * entire universe.
 * ==========================================================
 */

import type {
  UniverseEvent,
} from "./UniverseEvents";

export type UniverseMode =

  | "idle"

  | "thinking"

  | "listening"

  | "speaking"

  | "dreaming"

  | "teaching";

export default class UniverseState {

  /*
   * TIME
   */

  time = 0;

  delta = 0;

  /*
   * CORE
   */

  energy = 1;

  awareness = 1;

  evolution = 0;

  pulse = 1;

  resonance = 0;

  /*
   * VISUALS
   */

  brightness = 1;

  bloom = 1;

  fog = 1;

  exposure = 1;

  /*
   * ENVIRONMENT
   */

  stormIntensity = 0;

  plasmaIntensity = 0;

  lightningIntensity = 0;

  gravityStrength = 1;

  darkMatterDensity = 1;

  nebulaDensity = 1;

  travelerDensity = 1;

  galaxyDensity = 1;

  /*
   * ASTRONOMY
   */

  siderealTime = 0;

  moonPhase = 0;

  eclipse = false;

  /*
   * AI
   */

  mode: UniverseMode =

    "idle";

  thinking = false;

  listening = false;

  speaking = false;

  loading = false;

  /*
   * CHAT
   */

  typing = false;

  streaming = false;

  responseProgress = 0;

  /*
   * MEMORY
   */

  memoryActivity = 0;

  memoryGrowth = 0;

  /*
   * EVENTS
   */

  activeEvent: UniverseEvent =

    "calm";

  /*
   * CAMERA
   */

  cameraZoom = 1;

  cameraDrift = 1;

  cameraFocus = 1;

  /*
   * UPDATE
   */

  update(

    delta: number,

  ) {

    this.delta =

      delta;

    this.time +=

      delta;

    this.pulse =

      1 +

      Math.sin(

        this.time *

        2,

      ) *

      0.08;

  }

  /*
   * MODES
   */

  setMode(

    mode: UniverseMode,

  ) {

    this.mode =

      mode;

    this.thinking =

      mode ===

      "thinking";

    this.listening =

      mode ===

      "listening";

    this.speaking =

      mode ===

      "speaking";

  }

  /*
   * EVENTS
   */

  setEvent(

    event: UniverseEvent,

  ) {

    this.activeEvent =

      event;

  }

  /*
   * RESET
   */

  reset() {

    Object.assign(

      this,

      new UniverseState(),

    );

  }

}