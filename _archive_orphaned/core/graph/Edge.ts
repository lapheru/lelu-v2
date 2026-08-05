/**
 * ==========================================================
 * LÉLU
 * GRAPH EDGE
 * ==========================================================
 */

export interface GraphEdge {

  readonly id: string;

  readonly from: string;

  readonly to: string;

  relation: string;

  weight: number;

  createdAt: Date;

}