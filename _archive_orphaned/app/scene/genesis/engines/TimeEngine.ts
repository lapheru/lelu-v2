/**
 * ==========================================================
 * LÉLUVERSE
 * TIME ENGINE
 *
 * Controls universal timeline flow.
 *
 * Does not advance age.
 * GenesisSimulation owns creation time.
 * ==========================================================
 */

import type {
  GenesisState,
} from "../state/GenesisState";


export default class TimeEngine {


  private elapsed = 0;



  update(

    state: GenesisState,

    delta:number,

  ):void {


    if(state.paused)

      return;



    this.elapsed += delta;



    /*
     * Timeline acceleration
     *
     * Starts fast during awakening,
     * stabilizes as the universe forms.
     */

    const maturity =

      (

        state.energy +

        state.matter +

        state.life +

        state.awareness

      ) / 4;



    state.timeline.acceleration =

      Math.max(

        0.25,

        2 -

        maturity,

      );



    /*
     * Timeline event generation
     */

    if(

      this.elapsed > 2

    ){

      state.timeline.events +=

        delta *

        state.timeline.acceleration;


    }



    /*
     * Simulation phase tracking
     */

    if(

      state.evolutionSystem.stage < 0.25

    ){

      state.mode =

        "FORMING";

    }

    else if(

      state.evolutionSystem.stage < 0.75

    ){

      state.mode =

        "EVOLVING";

    }



  }


}