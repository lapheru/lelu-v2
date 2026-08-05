/**
 * ==========================================================
 * LÉLUVERSE
 * NETWORK WIDGET
 *
 * Displays network and provider status.
 * ==========================================================
 */

import DesktopWidget
  from "./DesktopWidget";

export default class NetworkWidget
  extends DesktopWidget {

  private connected =
    false;

  private latency =
    0;

  private provider =
    "Offline";

  private syncing =
    false;

  constructor() {

    super({

      id:
        "network",

      title:
        "Network",

      visible:
        true,

      enabled:
        true,

      x:
        24,

      y:
        532,

      width:
        300,

      height:
        120,

    });

  }

  override update(
    _delta: number,
  ): void {

  }

  setConnected(
    connected: boolean,
  ): void {

    this.connected =
      connected;

  }

  setLatency(
    latency: number,
  ): void {

    this.latency =
      latency;

  }

  setProvider(
    provider: string,
  ): void {

    this.provider =
      provider;

  }

  setSyncing(
    syncing: boolean,
  ): void {

    this.syncing =
      syncing;

  }

  isConnected():
    boolean {

    return this.connected;

  }

  getLatency():
    number {

    return this.latency;

  }

  getProvider():
    string {

    return this.provider;

  }

  isSyncing():
    boolean {

    return this.syncing;

  }

}