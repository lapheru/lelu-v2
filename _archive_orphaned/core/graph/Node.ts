/**
 * ==========================================================
 * LÉLU
 * GRAPH NODE
 * ==========================================================
 */

export type NodeType =

  | "memory"

  | "knowledge"

  | "conversation"

  | "experience"

  | "project"

  | "goal"

  | "person"

  | "place"

  | "concept"

  | "skill"

  | "file"

  | "image"

  | "research"

  | "tool"

  | "system"

  | "custom";

export interface GraphNode {

  readonly id: string;

  readonly type: NodeType;

  title: string;

  content?: string;

  tags: string[];

  metadata:
    Record<
      string,
      unknown
    >;

  createdAt: Date;

  updatedAt: Date;

}