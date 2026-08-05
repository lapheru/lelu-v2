/**
 * ==========================================================
 * LÉLUVERSE
 * UNIVERSE GROUP
 * ==========================================================
 */

import EngineGroup from "./EngineGroup";

import GenesisSimulation from "./GenesisSimulation";
import TimelineEngine from "./TimelineEngine";
import SimulationEngine from "./SimulationEngine";

export default function UniverseGroup() {

  return new EngineGroup(

    "Universe",

    [

      new GenesisSimulation(),

      new TimelineEngine(),

      new SimulationEngine(),

    ],

  );

}