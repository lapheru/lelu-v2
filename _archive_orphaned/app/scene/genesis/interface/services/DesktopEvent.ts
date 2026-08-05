/**
 * ==========================================================
 * LÉLUVERSE
 * DESKTOP EVENT
 * ==========================================================
 */

export default interface DesktopEvent {

  id: string;

  type: string;

  timestamp: number;

  source: string;

  data?: unknown;

}