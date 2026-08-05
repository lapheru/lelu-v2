/**
 * ==========================================================
 * LÉLUVERSE
 * ENGINE RUNTIME
 *
 * Living engine execution bridge.
 *
 * Connects:
 * - EngineRegistry
 * - EngineBootstrap
 * - GenesisState
 *
 * ==========================================================
 */


import EngineRegistry
  from "./EngineRegistry";


import EngineBootstrap
  from "./EngineBootstrap";


import type {
  GenesisState,
} from "../state/GenesisState";

import EngineBus
  from "./EngineBus";

import type {
  GenesisSignals,
} from "./GenesisSignals";



export default class EngineRuntime {



  private readonly registry:

    EngineRegistry;  private readonly engineBus:

  EngineBus;

  private lastState: GenesisState | undefined;




  constructor(){


    this.registry =

      new EngineRegistry();

this.engineBus =

  new EngineBus(

    this.registry,

  );

    EngineBootstrap.register(

      this.registry,

    );


  }







  async initialize(): Promise<void> {

    await this.registry.initialize();

  }



  async dispatch(event: string, payload?: unknown): Promise<void> {

    await this.registry.dispatch(
      event,
      payload,
      this.lastState,
    );

  }




update(
  state: GenesisState,
  delta: number,
  signals?: GenesisSignals,
): void {

  this.lastState = state;

  this.registry.update(
    state,
    delta,
    signals,
  );

  this.engineBus.update(
    state,
    delta,
  );

}

getEngineBus(): EngineBus {

  return this.engineBus;

}







  







  getRegistry(){

    return this.registry;

  }

}