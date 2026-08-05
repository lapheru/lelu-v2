/**
 * ==========================================================
 * LÉLUVERSE
 * PORTAL STARS
 *
 * Master Portal System
 *
 * This file assembles every
 * portal subsystem.
 * All portal intelligence
 * lives in PortalController.
 * ==========================================================
 */

import PortalRenderer from "./PortalRenderer";
import PortalParticles from "./PortalParticles";
import PortalEffects from "./PortalEffects";
import PortalEvents from "./PortalEvents";

export default function PortalStars() {

  return (

    <group>

      {/* Portal Geometry */}

      <PortalRenderer />

      {/* Living Portal Particles */}

      <PortalParticles />

      {/* Warp / Bloom / Morph */}

      <PortalEffects />

      {/* Cosmic Events */}

      <PortalEvents />

    </group>

  );

}