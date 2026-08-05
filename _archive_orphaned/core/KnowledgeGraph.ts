/**
 * ==========================================================
 * LÉLU
 * KNOWLEDGE GRAPH
 * ==========================================================
 */

export interface Node {

  id:
    string;

  label:
    string;

  type:
    string;

  metadata:
    Record<
      string,
      unknown
    >;

}

export interface Edge {

  id:
    string;

  from:
    string;

  to:
    string;

  relationship:
    string;

  weight:
    number;

}

export default class KnowledgeGraph {

  private readonly nodes =
    new Map<
      string,
      Node
    >();

  private readonly edges =
    new Map<
      string,
      Edge
    >();

  /**
   * Add node.
   */
  public addNode(
    node: Node,
  ): void {

    this.nodes.set(
      node.id,
      node,
    );

  }

  /**
   * Add edge.
   */
  public addEdge(
    edge: Edge,
  ): void {

    this.edges.set(
      edge.id,
      edge,
    );

  }

  /**
   * Get node.
   */
  public node(
    id: string,
  ): Node | undefined {

    return this.nodes.get(
      id,
    );

  }

  /**
   * Neighbors.
   */
  public neighbors(
    id: string,
  ): Node[] {

    const results: Node[] = [];

    for (

      const edge of
      this.edges.values()

    ) {

      if (

        edge.from === id

      ) {

        const node =
          this.nodes.get(
            edge.to,
          );

        if (

          node !==
          undefined

        ) {

          results.push(
            node,
          );

        }

      }

    }

    return results;

  }

  /**
   * Find shortest expansion.
   */
  public traverse(
    start:
      string,

    depth =
      2,

  ): Node[] {

    const visited =
      new Set<
        string
      >();

    const queue = [

      {

        id:
          start,

        level:
          0,

      },

    ];

    const output:
      Node[] = [];

    while (

      queue.length >
      0

    ) {

      const current =
        queue.shift()!;

      if (

        visited.has(
          current.id,
        )

      ) {

        continue;

      }

      visited.add(
        current.id,
      );

      const node =
        this.nodes.get(
          current.id,
        );

      if (

        node

      ) {

        output.push(
          node,
        );

      }

      if (

        current.level >=
        depth

      ) {

        continue;

      }

      for (

        const neighbor of
        this.neighbors(
          current.id,
        )

      ) {

        queue.push({

          id:
            neighbor.id,

          level:
            current.level + 1,

        });

      }

    }

    return output;

  }

  /**
   * Remove node.
   */
  public removeNode(
    id: string,
  ): void {

    this.nodes.delete(
      id,
    );

    for (

      const edge of
      this.edges.values()

    ) {

      if (

        edge.from === id ||

        edge.to === id

      ) {

        this.edges.delete(
          edge.id,
        );

      }

    }

  }

  /**
   * Clear graph.
   */
  public clear():
    void {

    this.nodes.clear();

    this.edges.clear();

  }

}