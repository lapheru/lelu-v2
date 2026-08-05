/**
 * ==========================================================
 * LÉLUVERSE
 * PHYSICS GROUP
 * ==========================================================
 */

import EngineGroup from "./EngineGroup";

import GravityEngine from "./GravityEngine";
import MatterEngine from "./MatterEngine";
import ParticleEngine from "./ParticleEngine";
import LightEngine from "./LightEngine";
import PulseEngine from "./PulseEngine";

export default function PhysicsGroup() {

  return new EngineGroup(

    "Physics",

    [

      new GravityEngine(),

      new MatterEngine(),

      new ParticleEngine(),

      new LightEngine(),

      new PulseEngine(),

    ],

  );

}