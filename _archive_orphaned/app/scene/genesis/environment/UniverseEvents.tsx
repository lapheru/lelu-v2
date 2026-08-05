/**
 * ==========================================================
 * LÉLUVERSE
 * UNIVERSE EVENTS
 *
 * Dynamic cosmic events.
 * ==========================================================
 */

export type UniverseEvent =

  | "calm"

  | "meteor-shower"

  | "plasma-storm"

  | "space-lightning"

  | "gravity-wave"

  | "traveler-migration"

  | "wormhole"

  | "supernova";

export default class UniverseEvents {

  current:

    UniverseEvent =

    "calm";

  duration =

    0;

  timer =

    0;

  listeners =
    new Set<

      (

        event:

          UniverseEvent,

      ) => void

    >();

  update(

    delta: number,

  ) {

    this.timer +=

      delta;

    if (

      this.timer <

      this.duration

    )

      return;

    this.timer =
      0;

    this.duration =

      15 +

      Math.random() * 45;

    const events:

      UniverseEvent[] = [

      "calm",

      "meteor-shower",

      "plasma-storm",

      "space-lightning",

      "gravity-wave",

      "traveler-migration",

      "wormhole",

      "supernova",

    ];

    this.current =

      events[

        Math.floor(

          Math.random() *

          events.length,

        )

      ];

    this.listeners.forEach(

      listener =>

        listener(

          this.current,

        ),

    );

  }

  subscribe(

    listener:

      (

        event:

          UniverseEvent,

      ) => void,

  ) {

    this.listeners.add(

      listener,

    );

  }

  unsubscribe(

    listener:

      (

        event:

          UniverseEvent,

      ) => void,

  ) {

    this.listeners.delete(

      listener,

    );

  }

}