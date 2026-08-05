/**
 * ==========================================================
 * LÉLUVERSE
 * REALITY GROUP
 * ==========================================================
 */

import EngineGroup from "./EngineGroup";

import RealityEngine from "./RealityEngine";
import ExistenceEngine from "./ExistenceEngine";
import CreationEngine from "./CreationEngine";
import DreamEngine from "./DreamEngine";

export default function RealityGroup() {

  return new EngineGroup(

    "Reality",

    [

      new RealityEngine(),

      new ExistenceEngine(),

      new CreationEngine(),

      new DreamEngine(),

    ],

  );

}