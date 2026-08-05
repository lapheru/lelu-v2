/**
 * ==========================================================
 * LÉLU
 * GRAPH
 * ==========================================================
 */

import type {

  GraphNode,

} from "./Node";

import type {

  GraphEdge,

} from "./Edge";

export default class Graph {

  private readonly nodes =
    new Map<
      string,
      GraphNode
    >();

  private readonly edges =
    new Map<
      string,
      GraphEdge
    >();

  addNode(
    node: GraphNode,
  ): void {

    this.nodes.set(
      node.id,
      node,
    );

  }

  getNode(
    id: string,
  ): GraphNode | undefined {

    return this.nodes.get(
      id,
    );

  }

  removeNode(
    id: string,
  ): void {

    this.nodes.delete(
      id,
    );

  }

  addEdge(
    edge: GraphEdge,
  ): void {

    this.edges.set(
      edge.id,
      edge,
    );

  }

  removeEdge(
    id: string,
  ): void {

    this.edges.delete(
      id,
    );

  }

  neighbors(
    id: string,
  ): GraphNode[] {

    const results:
      GraphNode[] = [];

    for (const edge of this.edges.values()) {

      if (
        edge.from !== id
      ) {

        continue;

      }

      const node =
        this.nodes.get(
          edge.to,
        );

      if (node) {

        results.push(
          node,
        );

      }

    }

    return results;

  }

  nodesList():
    GraphNode[] {

    return [
      ...this.nodes.values(),
    ];

  }

  edgesList():
    GraphEdge[] {

      return [
        ...this.edges.values(),
      ];

  }

}