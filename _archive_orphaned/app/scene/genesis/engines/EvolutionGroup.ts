/**
 * ==========================================================
 * LÉLUVERSE
 * EVOLUTION GROUP
 * ==========================================================
 */

import EngineGroup from "./EngineGroup";

import EvolutionEngine from "./EvolutionEngine";
import GrowthEngine from "./GrowthEngine";
import LearningEngine from "./LearningEngine";
import AwarenessEngine from "./AwarenessEngine";
import ConsciousnessEngine from "./ConsciousnessEngine";

export default function EvolutionGroup() {

  return new EngineGroup(

    "Evolution",

    [

      new EvolutionEngine(),

      new GrowthEngine(),

      new LearningEngine(),

      new AwarenessEngine(),

      new ConsciousnessEngine(),

    ],

  );

}