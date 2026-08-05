/**
 * ==========================================================
 * LÉLUVERSE
 * CORE ENGINE
 *
 * Master Genesis simulation heartbeat.
 *
 * Orchestrates:
 * - universe formation
 * - physical systems
 * - cosmic systems
 * - life systems
 * - consciousness systems
 * ==========================================================
 */


import type {
  GenesisState,
} from "../state/GenesisState";



import GenesisSimulation from "./GenesisSimulation";

import TimeEngine from "./TimeEngine";

import MatterEngine from "./MatterEngine";

import QuantumEngine from "./QuantumEngine";

import PulseEngine from "./PulseEngine";

import StarEngine from "./StarEngine";

import PlanetEngine from "./PlanetEngine";

import OceanEngine from "./OceanEngine";

import EvolutionEngine from "./EvolutionEngine";

import MemoryEngine from "./MemoryEngine";

import ConsciousnessEngine from "./ConsciousnessEngine";

import CuriosityEngine from "./CuriosityEngine";

import LearningEngine from "./LearningEngine";

import RealityEngine from "./RealityEngine";

import ExistenceEngine from "./ExistenceEngine";

import CivilizationEngine from "./CivilizationEngine";



export default class CoreEngine {


  /*
   * Foundation systems
   */


  private readonly simulation =

    new GenesisSimulation();



  private readonly time =

    new TimeEngine();



  private readonly matter =

    new MatterEngine();



  private readonly quantum =

    new QuantumEngine();



  private readonly pulse =

    new PulseEngine();




  /*
   * Cosmic systems
   */


  private readonly stars =

    new StarEngine();



  private readonly planets =

    new PlanetEngine();



  private readonly ocean =

    new OceanEngine();




  /*
   * Living systems
   */


  private readonly evolution =

    new EvolutionEngine();



  private readonly memory =

    new MemoryEngine();



  private readonly consciousness =

    new ConsciousnessEngine();



  private readonly curiosity =

    new CuriosityEngine();



  private readonly learning =

    new LearningEngine();




  /*
   * Reality systems
   */


  private readonly reality =

    new RealityEngine();



  private readonly existence =

    new ExistenceEngine();



  private readonly civilization =

    new CivilizationEngine();





  update(

    state: GenesisState,

    delta:number,

  ):void {


    if(state.paused)

      return;




    /*
     * Genesis ignition
     */


    this.simulation.update(

      state,

      delta,

    );



    this.time.update(

      state,

      delta,

    );



    this.matter.update(

      state,

      delta,

    );



    this.quantum.update(

      state,

      delta,

    );



    this.pulse.update(

      state,

      delta,

    );





    /*
     * Cosmic evolution
     */


    this.stars.update(

      state,

      delta,

    );



    this.planets.update(

      state,

      delta,

    );



    this.ocean.update(

      state,

      delta,

    );





    /*
     * Conscious evolution
     */


    this.evolution.update(

      state,

      delta,

    );



    this.memory.update(

      state,

      delta,

    );



    this.consciousness.update(

      state,

      delta,

    );



    this.curiosity.update(

      state,

      delta,

    );



    this.learning.update(

      state,

      delta,

    );





    /*
     * Reality manifestation
     */


    this.reality.update(

      state,

      delta,

    );



    this.existence.update(

      state,

      delta,

    );



    this.civilization.update(

      state,

      delta,

    );


  }


}