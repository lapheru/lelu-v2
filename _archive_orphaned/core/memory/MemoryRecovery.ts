/**
 * ==========================================================
 * LÉLU
 * MEMORY RECOVERY
 * ==========================================================
 */

import type MemoryStore from "./MemoryStore";

import MemoryBackup, {
  type MemorySnapshot,
} from "./MemoryBackup";

export default class MemoryRecovery {

  constructor(

    private readonly store: MemoryStore,

    private readonly backup: MemoryBackup,

  ) {}

  async recover(
    snapshot?: MemorySnapshot,
  ): Promise<boolean> {

    try {

      if (!snapshot) {

        snapshot =
          await this.backup.clone();

      }

      await this.store.clear();

      for (

        const memory of snapshot.memories

      ) {

        await this.store.save(
          memory,
        );

      }

      return true;

    } catch (

      error

    ) {

      console.error(

        "[LÉLU] Memory Recovery Failed",

        error,

      );

      return false;

    }

  }

  async verify(): Promise<boolean> {

    try {

      await this.store.initialize();

      await this.store.all();

      return true;

    } catch {

      return false;

    }

  }

  async recoverIfNeeded(): Promise<boolean> {

    const healthy =
      await this.verify();

    if (

      healthy

    ) {

      return true;

    }

    return this.recover();

  }

}