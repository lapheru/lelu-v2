/**
 * ==========================================================
 * LÉLUVERSE
 * DIMENSION RENDERER
 *
 * Handles rendering rules for every supported dimension.
 * ==========================================================
 */

export type Dimension =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;

export interface DimensionState {

  dimension: Dimension;

  name: string;

  renderScale: number;

  particleDensity: number;

  lighting: number;

  gravity: number;

  timeScale: number;

  visible: boolean;

}

export default class DimensionRenderer {

  private state: DimensionState = {

    dimension: 3,

    name: "Physical",

    renderScale: 1,

    particleDensity: 1,

    lighting: 1,

    gravity: 1,

    timeScale: 1,

    visible: true,

  };

  get current(): DimensionState {

    return this.state;

  }

  setDimension(

    dimension: Dimension,

  ) {

    this.state.dimension = dimension;

    switch (dimension) {

      case 1:

        this.state = {

          ...this.state,

          name: "Point",

          renderScale: 0.2,

          particleDensity: 0,

          lighting: 0,

          gravity: 0,

          timeScale: 1,

          visible: true,

        };

        break;

      case 2:

        this.state = {

          ...this.state,

          name: "Plane",

          renderScale: 0.6,

          particleDensity: 0.15,

          lighting: 0.3,

          gravity: 0,

          timeScale: 1,

          visible: true,

        };

        break;

      case 3:

        this.state = {

          ...this.state,

          name: "Physical",

          renderScale: 1,

          particleDensity: 1,

          lighting: 1,

          gravity: 1,

          timeScale: 1,

          visible: true,

        };

        break;

      case 4:

        this.state = {

          ...this.state,

          name: "Space-Time",

          renderScale: 1.1,

          particleDensity: 1.5,

          lighting: 1.2,

          gravity: 1.1,

          timeScale: 1.5,

          visible: true,

        };

        break;

      case 5:

        this.state = {

          ...this.state,

          name: "Probability",

          renderScale: 1.25,

          particleDensity: 2,

          lighting: 1.5,

          gravity: 0.8,

          timeScale: 2,

          visible: true,

        };

        break;

      default:

        this.state = {

          ...this.state,

          name: `Dimension ${dimension}`,

          renderScale: 1 +

            dimension * 0.1,

          particleDensity: 1 +

            dimension * 0.25,

          lighting: 1 +

            dimension * 0.15,

          gravity: 1,

          timeScale: 1 +

            dimension * 0.2,

          visible: true,

        };

    }

  }

  next() {

    const next =

      this.state.dimension >= 12

        ? 1

        : ((this.state.dimension + 1) as Dimension);

    this.setDimension(next);

  }

  previous() {

    const previous =

      this.state.dimension <= 1

        ? 12

        : ((this.state.dimension - 1) as Dimension);

    this.setDimension(previous);

  }

  reset() {

    this.setDimension(3);

  }

}