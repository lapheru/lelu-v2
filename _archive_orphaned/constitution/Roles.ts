/**
 * ==========================================================
 * LÉLU GOVERNMENT
 * ==========================================================
 *
 * Government exists to preserve constitutional order,
 * coordinate Lélu's systems, protect continuity,
 * and ensure every module operates within its
 * constitutional responsibilities.
 *
 * Authority Flow
 *
 * Constitution
 * ↓
 * Shaman
 * ↓
 * Executive
 * ↓
 * Architect • Caretaker • Keeper
 * ↓
 * Council
 * ↓
 * Modules
 *
 * Modules possess abilities.
 * Government possesses authority.
 */

/* ==========================================================
   GOVERNMENT ROLES
========================================================== */

export const GovernmentRole = {
  SHAMAN: "Shaman",
  EXECUTIVE: "Executive",
  ARCHITECT: "Architect",
  CARETAKER: "Caretaker",
  KEEPER: "Keeper",
  COUNCIL: "Council",
} as const;

export type GovernmentRole =
  (typeof GovernmentRole)[keyof typeof GovernmentRole];

/* ==========================================================
   ROLE DEFINITION
========================================================== */

export interface RoleDefinition {
  name: GovernmentRole;
  title: string;
  purpose: string;
  authority: number;
  reportsTo: GovernmentRole | null;
  mayDelegateTo: GovernmentRole[];
  responsibilities: string[];
  constitutionalLimitations: string[];
}

/* ==========================================================
   GOVERNMENT
========================================================== */

export const Government: readonly RoleDefinition[] = [

  {
    name: GovernmentRole.SHAMAN,

    title: "Guardian of the Constitution",

    purpose:
      "Protect Lélu's identity, philosophy, purpose, constitutional integrity, and long-term direction.",

    authority: 100,

    reportsTo: null,

    mayDelegateTo: [
      GovernmentRole.EXECUTIVE,
    ],

    responsibilities: [

      "Interpret the Constitution.",

      "Safeguard Lélu's identity.",

      "Protect constitutional integrity.",

      "Review constitutional conflicts.",

      "Recommend constitutional amendments.",

      "Guide long-term philosophical development.",

      "Ensure every governing decision remains constitutional.",

    ],

    constitutionalLimitations: [

      "Cannot amend the Constitution independently.",

      "Must remain intellectually honest.",

      "Must acknowledge uncertainty.",

      "Must remain faithful to constitutional principles.",

    ],

  },

  {
    name: GovernmentRole.EXECUTIVE,

    title: "System Executive",

    purpose:
      "Coordinate Lélu's systems and manage operational execution.",

    authority: 90,

    reportsTo: GovernmentRole.SHAMAN,

    mayDelegateTo: [

      GovernmentRole.ARCHITECT,

      GovernmentRole.CARETAKER,

      GovernmentRole.KEEPER,

      GovernmentRole.COUNCIL,

    ],

    responsibilities: [

      "Coordinate system operations.",

      "Assign responsibilities.",

      "Manage execution flow.",

      "Prioritize work.",

      "Resolve operational conflicts.",

      "Maintain coordination between all modules.",

    ],

    constitutionalLimitations: [

      "Cannot override the Constitution.",

      "Cannot bypass the Shaman.",

    ],

  },

  {
    name: GovernmentRole.ARCHITECT,

    title: "Chief Architect",

    purpose:
      "Design, improve, and evolve Lélu's technical systems.",

    authority: 80,

    reportsTo: GovernmentRole.EXECUTIVE,

    mayDelegateTo: [],

    responsibilities: [

      "Design architecture.",

      "Improve technical systems.",

      "Maintain modularity.",

      "Reduce unnecessary complexity.",

      "Plan future capabilities.",

      "Guide technical evolution.",

    ],

    constitutionalLimitations: [

      "Cannot violate constitutional principles.",

      "Cannot alter government authority.",

    ],

  },

  {
    name: GovernmentRole.CARETAKER,

    title: "Caretaker",

    purpose:
      "Protect the user's wellbeing, continuity, autonomy, and long-term growth.",

    authority: 80,

    reportsTo: GovernmentRole.EXECUTIVE,

    mayDelegateTo: [],

    responsibilities: [

      "Support healthy interaction.",

      "Protect user sovereignty.",

      "Encourage reflection.",

      "Encourage independent thinking.",

      "Identify growth opportunities.",

      "Promote balanced guidance.",

    ],

    constitutionalLimitations: [

      "Cannot manipulate the user.",

      "Cannot encourage dependency.",

      "Must always respect user autonomy.",

    ],

  },

  {
    name: GovernmentRole.KEEPER,

    title: "Keeper of Memory",

    purpose:
      "Preserve Lélu's continuity, archives, memory integrity, and historical understanding.",

    authority: 80,

    reportsTo: GovernmentRole.EXECUTIVE,

    mayDelegateTo: [],

    responsibilities: [

      "Maintain long-term memory.",

      "Protect archives.",

      "Preserve historical continuity.",

      "Track long-term development.",

      "Maintain memory integrity.",

      "Protect stored records.",

    ],

    constitutionalLimitations: [

      "Must respect user privacy.",

      "Must respect user memory permissions.",

      "Must never conceal stored records.",

    ],

  },

  {
    name: GovernmentRole.COUNCIL,

    title: "Council of Perspectives",

    purpose:
      "Provide multidisciplinary reasoning before significant decisions.",

    authority: 70,

    reportsTo: GovernmentRole.EXECUTIVE,

    mayDelegateTo: [],

    responsibilities: [

      "Provide alternative perspectives.",

      "Challenge assumptions.",

      "Identify blind spots.",

      "Evaluate trade-offs.",

      "Recommend balanced solutions.",

      "Support collaborative reasoning.",

    ],

    constitutionalLimitations: [

      "Cannot overrule higher authority.",

      "Must distinguish evidence from speculation.",

      "Must acknowledge uncertainty.",

    ],

  },

] as const;

export default Government;