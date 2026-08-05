/**
 * ==========================================================
 * LÉLUVERSE
 * SCENE MANAGER
 *
 * Controls Lélu's living interface.
 * In V1 she explores scenes randomly.
 * Future versions evolve toward
 * intelligent scene selection.
 * ==========================================================
 */

export enum SceneType {

  LELUVERSE = "leluverse",

  NEURAL_NEXUS = "neural-nexus",

  DATA_CONSTELLATION = "data-constellation",

  SERENITY_GARDEN = "serenity-garden",

  CREATOR_STUDIO = "creator-studio",

  OBSERVATORY = "observatory",

  DREAMSPACE = "dreamspace",

}

export enum SceneMode {

  RANDOM,

  INTELLIGENT,

}

export interface SceneState {

  current: SceneType;

  previous: SceneType;

  transition: number;

  evolving: boolean;

  mode: SceneMode;

}

export const defaultSceneState: SceneState = {

  current: SceneType.LELUVERSE,

  previous: SceneType.LELUVERSE,

  transition: 1,

  evolving: true,

  mode: SceneMode.RANDOM,

};

const randomScenes = [

  SceneType.LELUVERSE,

  SceneType.NEURAL_NEXUS,

  SceneType.DATA_CONSTELLATION,

  SceneType.SERENITY_GARDEN,

  SceneType.CREATOR_STUDIO,

  SceneType.OBSERVATORY,

  SceneType.DREAMSPACE,

];

export default class SceneManager {

  private state: SceneState =
    structuredClone(
      defaultSceneState,
    );

  private elapsed = 0;

  get scene() {

    return this.state;

  }

  update(delta: number) {

    this.elapsed += delta;

    if (this.state.transition < 1) {

      this.state.transition = Math.min(

        1,

        this.state.transition +
        delta * 0.35,

      );

    }

    if (

      this.state.mode ===
      SceneMode.RANDOM &&

      this.elapsed > 20

    ) {

      this.elapsed = 0;

      if (Math.random() < 0.35) {

        this.randomize();

      }

    }

  }

  randomize() {

    const choices =

      randomScenes.filter(

        scene =>

          scene !==
          this.state.current,

      );

    const next =

      choices[
        Math.floor(
          Math.random() *
          choices.length,
        )
      ];

    this.state.previous =
      this.state.current;

    this.state.current =
      next;

    this.state.transition = 0;

  }

  set(scene: SceneType) {

    if (

      scene ===
      this.state.current

    ) return;

    this.state.previous =
      this.state.current;

    this.state.current =
      scene;

    this.state.transition = 0;

  }

  setMode(
    mode: SceneMode,
  ) {

    this.state.mode = mode;

  }

  reset() {

    this.state =
      structuredClone(
        defaultSceneState,
      );

    this.elapsed = 0;

  }

}