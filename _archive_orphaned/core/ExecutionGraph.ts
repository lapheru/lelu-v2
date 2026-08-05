/**
 * ==========================================================
 * LÉLU
 * EXECUTION GRAPH
 * ==========================================================
 */

export type NodeStatus =
  | "pending"
  | "ready"
  | "running"
  | "completed"
  | "failed";

export interface ExecutionNode {

  id:
    string;

  name:
    string;

  description:
    string;

  dependencies:
    string[];

  priority:
    number;

  status:
    NodeStatus;

  action():
    Promise<void>;

}

export default class ExecutionGraph {

  private readonly nodes =
    new Map<
      string,
      ExecutionNode
    >();

  public add(
    node: ExecutionNode,
  ): void {

    this.nodes.set(
      node.id,
      node,
    );

  }

  public remove(
    id: string,
  ): void {

    this.nodes.delete(
      id,
    );

  }

  public get(
    id: string,
  ): ExecutionNode | undefined {

    return this.nodes.get(
      id,
    );

  }

  public all():
    ExecutionNode[] {

    return Array.from(
      this.nodes.values(),
    );

  }

  public ready():
    ExecutionNode[] {

    return this.all()

      .filter(

        node =>

          node.status ===
          "pending"

          &&

          node.dependencies.every(

            dependency =>

              this.nodes.get(
                dependency,
              )?.status ===
              "completed",

          ),

      )

      .sort(

        (
          left,
          right,
        ) =>

          right.priority -

          left.priority,

      );

  }

  public async execute():
    Promise<void> {

    while (

      this.ready().length >

      0

    ) {

      const ready =
        this.ready();

      await Promise.all(

        ready.map(

          async node => {

            node.status =
              "running";

            try {

              await node.action();

              node.status =
                "completed";

            }

            catch {

              node.status =
                "failed";

            }

          },

        ),

      );

    }

  }

  public clear():
    void {

    this.nodes.clear();

  }

}