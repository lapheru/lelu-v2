/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS CAMERA
 *
 * Living camera controller.
 *
 * Controls:
 * - smooth movement
 * - focus targets
 * - navigation targets
 * ==========================================================
 */


import * as THREE
  from "three";


import type GenesisNavigator
  from "./GenesisNavigator";





export default class GenesisCamera {


  public readonly camera:

    THREE.PerspectiveCamera;





  private position:

    THREE.Vector3;


  private target:

    THREE.Vector3;


  private destination:

    THREE.Vector3;


  private lookTarget:

    THREE.Vector3;


  private navigator?:

    GenesisNavigator;





  constructor(

    aspect:

      number,

  ) {


    this.camera =

      new THREE.PerspectiveCamera(

        55,

        aspect,

        0.1,

        10000,

      );





    this.position =

      new THREE.Vector3(

        0,

        4,

        12,

      );





    this.target =

      new THREE.Vector3(

        0,

        0,

        0,

      );





    this.destination =

      this.position.clone();





    this.lookTarget =

      this.target.clone();





    this.camera.position.copy(

      this.position,

    );


    this.camera.lookAt(

      this.target,

    );

  }





  public connectNavigator(

    navigator:

      GenesisNavigator,

  ) {


    this.navigator =

      navigator;



    navigator.subscribe(

      () => {


        const state =

          navigator.state();





        if (

          !state.target

        ) {


          return;

        }





        this.moveTo(

        {

          x:

            state.target.position.x,


          y:

            state.target.position.y + 4,


          z:

            state.target.position.z + 8,

        });



        this.focus(

          state.target.position,

        );

      },

    );

  }





  public update() {


    this.position.lerp(

      this.destination,

      0.05,

    );



    this.target.lerp(

      this.lookTarget,

      0.05,

    );



    this.camera.position.copy(

      this.position,

    );



    this.camera.lookAt(

      this.target,

    );

  }





  public moveTo(

    position:

    {

      x:number;

      y:number;

      z:number;

    },

  ) {


    this.destination.set(

      position.x,

      position.y,

      position.z,

    );

  }





  public focus(

    position:

    {

      x:number;

      y:number;

      z:number;

    },

  ) {


    this.lookTarget.set(

      position.x,

      position.y,

      position.z,

    );

  }





  public resize(

    width:

      number,

    height:

      number,

  ) {


    this.camera.aspect =

      width /

      height;



    this.camera.updateProjectionMatrix();

  }





  public getNavigator() {


    return this.navigator;

  }

}