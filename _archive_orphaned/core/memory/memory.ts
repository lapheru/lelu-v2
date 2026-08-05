/**
 * ==========================================================
 * LÉLU
 * MEMORY STORE
 * ==========================================================
 */

export type MemorySpace =

  | "user"
  | "lelu"
  | "shared"
  | "log"
  | "reflection";

export interface MemoryRecord {

  id: string;

  space: MemorySpace;

  title: string;

  content: string;

  tags: string[];

  importance: number;

  created: number;

  updated: number;

}

export default interface MemoryStore {

  initialize(): Promise<void>;

  save(
    memory: MemoryRecord,
  ): Promise<void>;

  update(
    memory: MemoryRecord,
  ): Promise<void>;

  delete(
    id: string,
  ): Promise<void>;

  get(
    id: string,
  ): Promise<MemoryRecord | null>;

  search(
    query: string,
    space?: MemorySpace,
  ): Promise<MemoryRecord[]>;

  recent(
    space?: MemorySpace,
  ): Promise<MemoryRecord[]>;

  all(
    space?: MemorySpace,
  ): Promise<MemoryRecord[]>;

}