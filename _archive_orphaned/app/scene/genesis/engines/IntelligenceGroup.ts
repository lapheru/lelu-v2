/**
 * ==========================================================
 * LÉLUVERSE
 * INTELLIGENCE GROUP
 * ==========================================================
 */

import EngineGroup from "./EngineGroup";

import CuriosityEngine from "./CuriosityEngine";
import LearningEngine from "./LearningEngine";
import LogicEngine from "./LogicEngine";
import KnowledgeEngine from "./KnowledgeEngine";
import MemoryEngine from "./MemoryEngine";
import MemoryEvolutionEngine from "./MemoryEvolutionEngine";

export default function IntelligenceGroup() {

  return new EngineGroup(

    "Intelligence",

    [

      new CuriosityEngine(),

      new LearningEngine(),

      new LogicEngine(),

      new KnowledgeEngine(),

      new MemoryEngine(),

      new MemoryEvolutionEngine(),

    ],

  );

}