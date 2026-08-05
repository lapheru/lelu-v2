/**
 * ==========================================================
 * LÉLUVERSE
 * STAR TYPES
 * ==========================================================
 */

import { StarBehavior } from "./StarBehavior";

export interface LivingStar {

  id: number;

  position: [

    number,

    number,

    number,

  ];

  velocity: [

    number,

    number,

    number,

  ];

  acceleration: [

    number,

    number,

    number,

  ];

  size: number;

  brightness: number;

  opacity: number;

  energy: number;

  age: number;

  lifetime: number;

  pulse: number;

  rotation: number;

  group: number;

  target: number | null;

  behavior: StarBehavior;

}