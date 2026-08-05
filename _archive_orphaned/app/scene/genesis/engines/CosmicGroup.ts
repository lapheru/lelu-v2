/**
 * ==========================================================
 * LÉLUVERSE
 * COSMIC GROUP
 * ==========================================================
 */

import EngineGroup from "./EngineGroup";

import GenesisSimulation from "./GenesisSimulation";
import GravityEngine from "./GravityEngine";
import MatterEngine from "./MatterEngine";
import LightEngine from "./LightEngine";
import StarEngine from "./StarEngine";
import GalaxyEngine from "./GalaxyEngine";
import NebulaEngine from "./NebulaEngine";

export default function CosmicGroup() {

  return new EngineGroup(

    "Cosmic",

    [

      new GenesisSimulation(),

      new GravityEngine(),

      new MatterEngine(),

      new LightEngine(),

      new StarEngine(),

      new GalaxyEngine(),

      new NebulaEngine(),

    ],

  );

}