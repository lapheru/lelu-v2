/**
 * ==========================================================
 * LÉLUVERSE
 * WEATHER SYSTEM
 *
 * Planetary atmosphere engine.
 *
 * Controls:
 * - clouds
 * - humidity
 * - temperature
 * - pressure
 * - climate cycles
 * - atmospheric movement
 *
 * Logic only.
 * No rendering.
 * ==========================================================
 */


import {
  useFrame,
} from "@react-three/fiber";


import {
  useRef,
} from "react";


import {
  useGenesis,
} from "../GenesisCore";





export interface WeatherState {


  temperature:
    number;


  humidity:
    number;


  pressure:
    number;


  cloudDensity:
    number;


  wind:
    number;


  climate:
    number;

}





export default function WeatherSystem() {


  const {

    state,

  } = useGenesis();





  const weather =

    useRef<WeatherState>({

      temperature:0.5,

      humidity:0.5,

      pressure:0.7,

      cloudDensity:0.3,

      wind:0.2,

      climate:0.5,

    });





  const time =

    useRef(0);





  useFrame((_,delta)=>{


    time.current += delta;


    const w =

      weather.current;





    void state;





    /*
     * Natural temperature cycles
     */


    w.temperature =

      0.5 +

      Math.sin(

        time.current *

        0.03

      )

      *

      0.25;





    /*
     * Atmospheric moisture
     */


    w.humidity =

      0.5 +

      Math.sin(

        time.current *

        0.05

      )

      *

      0.3;





    /*
     * Cloud formation
     */


    w.cloudDensity =

      Math.min(

        1,

        w.humidity *

        0.9

      );





    /*
     * Wind movement
     */


    w.wind =

      0.3 +

      Math.sin(

        time.current *

        0.08

      )

      *

      0.3;





    /*
     * Atmospheric pressure
     */


    w.pressure =

      1 -

      w.wind *

      0.5;





    /*
     * Climate balance
     */


    w.climate =

      (

        w.temperature +

        w.humidity +

        w.pressure

      )

      /

      3;


  });





  return null;

}