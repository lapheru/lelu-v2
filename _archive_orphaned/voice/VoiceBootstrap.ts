/**
 * ==========================================================
 * LÉLU
 * VOICE BOOTSTRAP
 * ==========================================================
 */

import VoiceCoordinator from "./VoiceCoordinator";

export default class VoiceBootstrap {

  readonly coordinator: VoiceCoordinator;

  constructor(

    coordinator: VoiceCoordinator,

  ) {

    this.coordinator = coordinator;

  }

  async boot(): Promise<void> {

    await this.coordinator.start();

  }

}