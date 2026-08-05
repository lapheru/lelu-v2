/**
 * ==========================================================
 * LÉLUVERSE
 * BIOLOGY GROUP
 * ==========================================================
 */

import EngineGroup from "./EngineGroup";

import PlanetEngine from "./PlanetEngine";
import OceanEngine from "./OceanEngine";
import AtmosphereEngine from "./AtmosphereEngine";
import DNAEngine from "./DNAEngine";
import SpeciesEngine from "./SpeciesEngine";

export default function BiologyGroup() {

  return new EngineGroup(

    "Biology",

    [

      new PlanetEngine(),

      new OceanEngine(),

      new AtmosphereEngine(),

      new DNAEngine(),

      new SpeciesEngine(),

    ],

  );

}