/**
 * ==========================================================
 * LÉLU
 * COGNITION ENGINE
 *
 * Converts perception into evolving cognition
 * ==========================================================
 */

import CognitionExtractor
  from "./CognitionExtractor";

import type {
  CognitiveInsight,
} from "./CognitionExtractor";

import KnowledgeGraph
  from "./KnowledgeGraph";

import AgentManager
  from "./AgentManager";

import WorkspaceManager
  from "./WorkspaceManager";





export default class CognitionEngine {


  private readonly extractor:

    CognitionExtractor;



  constructor(

    private readonly graph:
      KnowledgeGraph,


    private readonly agents:
      AgentManager,


    private readonly workspaces:
      WorkspaceManager,

  ) {


    this.extractor =

      new CognitionExtractor();

  }





  /**
   * ==========================================================
   * Observe conversation
   * ==========================================================
   */
  public observe(

    text:
      string,

  ):
    CognitiveInsight[] {


    const insights =

      this.extractor.extract(

        text,

      );





    for (

      const insight of insights

    ) {


      this.integrate(

        insight,

      );

    }





    return insights;

  }





  /**
   * ==========================================================
   * Integrate cognition
   * ==========================================================
   */
  private integrate(

    insight:
      CognitiveInsight,

  ):
    void {


    this.graph.addNode({

      id:

        crypto.randomUUID(),


      type:

        insight.type,


      label:

        insight.content,


      data:

      {

        entities:

          insight.entities,


        confidence:

          insight.confidence,

      },


      createdAt:

        insight.createdAt,

    });





    switch(

      insight.type

    ) {


      case "project":


        this.workspaces.add(

          "projects",

          insight.content,

        );


        this.agents.assignMemory(

          "builder",

          insight.content,

        );


        break;





      case "goal":


        this.workspaces.add(

          "goals",

          insight.content,

        );


        this.agents.assignMemory(

          "life",

          insight.content,

        );


        break;





      case "skill":


        this.workspaces.add(

          "knowledge",

          insight.content,

        );


        this.agents.assignMemory(

          "research",

          insight.content,

        );


        break;





      case "idea":


        this.workspaces.add(

          "creative",

          insight.content,

        );


        this.agents.assignMemory(

          "creative",

          insight.content,

        );


        break;





      default:


        this.workspaces.add(

          "general",

          insight.content,

        );


        break;

    }

  }





  /**
   * ==========================================================
   * Batch processing
   * ==========================================================
   */
  public observeMany(

    messages:
      string[],

  ):
    CognitiveInsight[] {


    const results:

      CognitiveInsight[] = [];





    for (

      const message of messages

    ) {


      results.push(

        ...this.observe(

          message,

        ),

      );

    }





    return results;

  }

}