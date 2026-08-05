/**
 * ==========================================================
 * LÉLU
 * GRAPH QUERY
 * ==========================================================
 */

import Graph
  from "./Graph";

import type {
  GraphNode,
} from "./Node";

export default class Query {

  constructor(

    private readonly graph:
      Graph,

  ) {}

  findById(
    id: string,
  ): GraphNode | undefined {

    return this.graph.getNode(
      id,
    );

  }

  findByType(
    type: GraphNode["type"],
  ): GraphNode[] {

    return this.graph
      .nodesList()
      .filter(
        node =>
          node.type ===
          type,
      );

  }

  search(
    text: string,
  ): GraphNode[] {

    const query =
      text.toLowerCase();

    return this.graph
      .nodesList()
      .filter(
        node =>
          node.title
            .toLowerCase()
            .includes(query) ||

          node.content
            ?.toLowerCase()
            .includes(query),
      );

  }

}