/**
 * ==========================================================
 * LÉLUVERSE
 * QUANTUM GROUP
 * ==========================================================
 */

import EngineGroup from "./EngineGroup";

import VoidEngine from "./VoidEngine";
import QuantumEngine from "./QuantumEngine";
import ExpansionEngine from "./ExpansionEngine";
import EntropyEngine from "./EntropyEngine";
import HarmonyEngine from "./HarmonyEngine";
import BalanceEngine from "./BalanceEngine";

export default function QuantumGroup() {

  return new EngineGroup(

    "Quantum",

    [

      new VoidEngine(),

      new QuantumEngine(),

      new ExpansionEngine(),

      new EntropyEngine(),

      new HarmonyEngine(),

      new BalanceEngine(),

    ],

  );

}