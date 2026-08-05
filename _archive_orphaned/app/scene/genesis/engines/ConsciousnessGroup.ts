/**
 * ==========================================================
 * LÉLUVERSE
 * CONSCIOUSNESS GROUP
 * ==========================================================
 */

import EngineGroup from "./EngineGroup";

import ConsciousnessEngine from "./ConsciousnessEngine";
import AwarenessEngine from "./AwarenessEngine";
import DreamEngine from "./DreamEngine";
import RealityEngine from "./RealityEngine";
import ExistenceEngine from "./ExistenceEngine";
import WisdomEngine from "./WisdomEngine";

export default function ConsciousnessGroup() {

  return new EngineGroup(

    "Consciousness",

    [

      new ConsciousnessEngine(),

      new AwarenessEngine(),

      new DreamEngine(),

      new RealityEngine(),

      new ExistenceEngine(),

      new WisdomEngine(),

    ],

  );

}