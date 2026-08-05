/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS WORKSPACE
 *
 * Living workspace objects inside Genesis.
 *
 * Shows:
 * - engineering spaces
 * - creative spaces
 * - research spaces
 * - active workspace focus
 * - navigation targets
 * ==========================================================
 */

import { useMemo } from "react";
import { useGenesis } from "./GenesisCore";
import type GenesisNavigator from "./GenesisNavigator";

interface WorkspaceNodeProps {
  id: string;
  name: string;
  index: number;
  navigator?: GenesisNavigator;
}

function WorkspaceNode({ id, name, index, navigator }: WorkspaceNodeProps) {
  const { state, focusWorkspace, selectDestination } = useGenesis();

  const position = useMemo<[number, number, number]>(() => [index * 3 - 3, 0, -5], [index]);

  const active = state.activeWorkspace === id;

  function selectWorkspace() {
    focusWorkspace(id);

    selectDestination({
      id,
      type: "workspace",
      name,
      position: {
        x: position[0],
        y: position[1],
        z: position[2],
      },
    });

    navigator?.navigate({
      id,
      type: "workspace",
      name,
      position: {
        x: position[0],
        y: position[1],
        z: position[2],
      },
    });
  }

  return (
    <mesh position={position} onClick={selectWorkspace}>
      <sphereGeometry args={[active ? 0.65 : 0.5, 32, 32]} />
      <meshStandardMaterial emissive={active ? "#55ddff" : "#000000"} emissiveIntensity={active ? 2 : 0} />
    </mesh>
  );
}

interface GenesisWorkspaceProps {
  navigator?: GenesisNavigator;
}

export default function GenesisWorkspace({ navigator }: GenesisWorkspaceProps) {
  const { state } = useGenesis();
  const workspaces = state.cognition?.workspaces ?? [];

  return (
    <>
      {workspaces.map((workspace: any, index: number) => (
        <WorkspaceNode
          key={workspace.id ?? index}
          id={workspace.id ?? String(index)}
          name={workspace.name ?? "Workspace"}
          index={index}
          navigator={navigator}
        />
      ))}
    </>
  );
}
