/**
 * ==========================================================
 * LÉLU
 * MEMORY SYNC
 * ==========================================================
 */

import type MemoryStore from "./MemoryStore";
import MemoryBackup from "./MemoryBackup";

export default class MemorySync {

  private syncing = false;

  constructor(

    _store: MemoryStore,

    private readonly backup: MemoryBackup,

  ) {}

  isOnline(): boolean {

    return navigator.onLine;

  }

  async sync(): Promise<boolean> {

    if (

      this.syncing

    ) {

      return false;

    }

    this.syncing = true;

    try {

      const snapshot =

        await this.backup.createSnapshot();

      if (

        !this.isOnline()

      ) {

        return false;

      }

      /**
       * Future:
       *
       * Upload snapshot
       * Merge remote changes
       * Resolve conflicts
       */

      console.info(

        "[LÉLU] Memory Sync",

        snapshot,

      );

      return true;

    }

    finally {

      this.syncing = false;

    }

  }

  async autoSync(): Promise<void> {

    if (

      this.isOnline()

    ) {

      await this.sync();

    }

  }

  start(

    interval = 300000,

  ): number {

    return window.setInterval(

      () => {

        void this.autoSync();

      },

      interval,

    );

  }

}