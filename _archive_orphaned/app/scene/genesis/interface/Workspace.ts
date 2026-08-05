/**
 * ==========================================================
 * LÉLUVERSE
 * WORKSPACE
 *
 * Represents a single Lélu 
 * ==========================================================
 */

export interface WorkspaceState {

  id: string;

  title: string;

  icon: string;

  active: boolean;

  visible: boolean;

  locked: boolean;

  created: number;

  updated: number;

}

export default class Workspace {

  readonly state:
    WorkspaceState;

  constructor(
    state: WorkspaceState,
  ) {

    this.state = state;

  }

  activate(): void {

    this.state.active =
      true;

    this.state.updated =
      Date.now();

  }

  deactivate(): void {

    this.state.active =
      false;

    this.state.updated =
      Date.now();

  }

  show(): void {

    this.state.visible =
      true;

    this.state.updated =
      Date.now();

  }

  hide(): void {

    this.state.visible =
      false;

    this.state.updated =
      Date.now();

  }

  lock(): void {

    this.state.locked =
      true;

    this.state.updated =
      Date.now();

  }

  unlock(): void {

    this.state.locked =
      false;

    this.state.updated =
      Date.now();

  }

  rename(
    title: string,
  ): void {

    this.state.title =
      title;

    this.state.updated =
      Date.now();

  }

  update(): void {

    this.state.updated =
      Date.now();

  }

}