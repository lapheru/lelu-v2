/**
 * ==========================================================
 * LÉLUVERSE
 * CIVILIZATION GROUP
 * ==========================================================
 */

import EngineGroup from "./EngineGroup";

import CivilizationEngine from "./CivilizationEngine";
import TechnologyEngine from "./TechnologyEngine";
import CreationEngine from "./CreationEngine";
import TimelineEngine from "./TimelineEngine";
import SimulationEngine from "./SimulationEngine";

export default function CivilizationGroup() {

  return new EngineGroup(

    "Civilization",

    [

      new CivilizationEngine(),

      new TechnologyEngine(),

      new CreationEngine(),

      new TimelineEngine(),

      new SimulationEngine(),

    ],

  );

}