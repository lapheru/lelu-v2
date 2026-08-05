/**
 * ==========================================================
 * LÉLU BOOTSTRAP
 * ==========================================================
 *
 * Entry point for the Lélu operating system.
 *
 * Responsibilities:
 * • Initialize the Kernel
 * • Start Lélu
 * • Prepare future systems
 */

import Kernel from "../core/kernel/kernel";

export function bootstrap(): void {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Initializing Lélu...");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  Kernel.boot();

  console.log("Lélu Engineer V1 Online");
}

export default bootstrap;