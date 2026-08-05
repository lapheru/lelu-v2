/**
 * ==========================================================
 * LÉLUVERSE
 * WORKSPACE MANAGER
 *
 * Manages every workspace inside Lélu.
 * ==========================================================
 */

import Workspace from "./Workspace";

export default class WorkspaceManager {
  private initialized = false;
  private readonly workspaces = new Map<string, Workspace>();

  initialize(): void {
    if (this.initialized) {
      return;
    }

    this.initialized = true;
  }

  update(_delta: number): void {
    if (!this.initialized) {
      return;
    }

    for (const workspace of this.workspaces.values()) {
      workspace.update();
    }
  }

  shutdown(): void {
    this.workspaces.clear();
    this.initialized = false;
  }

  register(workspace: Workspace): void {
    this.workspaces.set(workspace.state.id, workspace);
  }

  unregister(id: string): void {
    this.workspaces.delete(id);
  }

  get(id: string): Workspace | undefined {
    return this.workspaces.get(id);
  }

  getAll(): Workspace[] {
    return Array.from(this.workspaces.values());
  }

  activate(id: string): void {
    for (const workspace of this.workspaces.values()) {
      workspace.deactivate();
    }

    const workspace = this.workspaces.get(id);
    if (!workspace) {
      return;
    }

    workspace.activate();
    workspace.show();
    workspace.unlock();
  }

  clear(): void {
    this.workspaces.clear();
  }
}