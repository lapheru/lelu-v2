/**
 * ==========================================================
 * LÉLUVERSE
 * ENGINE REGISTRY
 *
 * Central manager for all Genesis engines.
 *
 * Responsibilities:
 * - Register engines
 * - Control execution order
 * - Prevent duplicate engines
 * - Safe engine updates
 * - Runtime inspection
 *
 * ==========================================================
 */


import type {
  GenesisState,
} from "../state/GenesisState";

import {
  idleGenesisSignals,
  type GenesisSignals,
} from "./GenesisSignals";




export interface GenesisEngine {


  readonly id?: string;


  readonly priority?: number;


  enabled?: boolean;

  error?: string;

  weight?: number;

getWeight?(
  state: GenesisState,
): number;

  initialize?(): void | Promise<void>;

  handleEvent?(
    event: string,
    payload?: unknown,
    state?: GenesisState,
  ): void | Promise<void>;

  update?(

    state: GenesisState,

    delta: number,

    signals?: GenesisSignals,

  ): void;


}





export interface EngineStatus {


  id:string;


  enabled:boolean;


  priority:number;


  error?:string;


}





export default class EngineRegistry {




  private readonly engines =

    new Map<string, GenesisEngine>();







  register(

    engine:GenesisEngine,

  ):void {



    const id =


      engine.id ??

      engine.constructor.name;





    if(

      this.engines.has(id)

    ){

      return;

    }





    // Keep the original instance instead of spreading it into a plain
    // object. Engine behavior lives on the class prototype, so spreading
    // would silently drop initialize/update/handleEvent methods and leave
    // the registry with metadata-only shells.
    if (engine.enabled === undefined) {

      engine.enabled = true;

    }

    this.engines.set(

      id,

      engine,

    );



  }







  unregister(

    id:string,

  ):void {


    this.engines.delete(

      id,

    );


  }







  get(

    id:string,

  ):


  GenesisEngine | undefined {


    return this.engines.get(

      id,

    );


  }







  enable(

    id:string,

  ):void {


    const engine =

      this.engines.get(id);





    if(engine){


      engine.enabled = true;


    }


  }







  disable(

    id:string,

  ):void {


    const engine =

      this.engines.get(id);





    if(engine){


      engine.enabled = false;


    }


  }







  async initialize(): Promise<void> {

    for (const engine of this.getAll()) {

      if (engine.enabled === false) {

        continue;

      }

      try {

        await engine.initialize?.();

      }

      catch (error) {

        engine.enabled = false;
        engine.error = error instanceof Error ? error.message : String(error);

        console.error(`Genesis engine initialization failed: ${engine.id}`, error);

      }

    }

  }



  async dispatch(
    event: string,
    payload?: unknown,
    state?: GenesisState,
  ): Promise<void> {

    for (const engine of this.getAll()) {

      if (engine.enabled === false) {

        continue;

      }

      try {

        await engine.handleEvent?.(event, payload, state);

      }

      catch (error) {

        engine.enabled = false;
        engine.error = error instanceof Error ? error.message : String(error);

        console.error(`Genesis engine event failed: ${engine.id}`, error);

      }

    }

  }



  update(

    state:GenesisState,

    delta:number,

    signals:GenesisSignals = idleGenesisSignals,

  ):void {



    const engines =

      this.getAll();





    for(

      const engine

      of engines

    ){



      if(

        engine.enabled === false

        || typeof engine.update !== "function"

      ){

        continue;

      }





      try {



        engine.update(

          state,

          delta,

          signals,

        );





      }      catch(error){



        engine.enabled = false;
        engine.error = error instanceof Error ? error.message : String(error);



        console.error(

          `Genesis engine failed: ${engine.id}`,

          error,

        );



      }


    }


  }







  getAll():GenesisEngine[] {


    return Array.from(

      this.engines.values(),

    )

    .sort(


      (a,b)=>



        (

          a.priority ??

          100

        )

        -

        (

          b.priority ??

          100

        )



    );


  }







  getStatus():EngineStatus[] {



    return this.getAll()

      .map(engine=>({



        id:

          engine.id ??


          engine.constructor.name,



        enabled:

          engine.enabled !== false,        priority:

          engine.priority ?? 100,

        error: engine.error,

      }));


  }







  clear():void {


    this.engines.clear();


  }



}