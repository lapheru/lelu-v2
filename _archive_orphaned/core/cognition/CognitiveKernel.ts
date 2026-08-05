/**
 * ==========================================================
 * LÉLU
 * COGNITIVE KERNEL
 *
 * Central cognition coordinator
 * ==========================================================
 */

import CognitionExtractor
  from "./CognitionExtractor";

import EntityMemory
  from "./EntityMemory";

import GoalTracker
  from "./GoalTracker";

import KnowledgeGraph
  from "./KnowledgeGraph";

import AgentManager
  from "./AgentManager";

import WorkspaceManager
  from "./WorkspaceManager";

import type {
  CognitiveInsight,
} from "./CognitionExtractor";





export default class CognitiveKernel {


  private readonly extractor:

    CognitionExtractor;



  public readonly entities:

    EntityMemory;



  public readonly goals:

    GoalTracker;



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



    this.entities =

      new EntityMemory();



    this.goals =

      new GoalTracker();

  }





  /**
   * ==========================================================
   * Process thought
   * ==========================================================
   */
  public process(

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


    const entity =

      this.entities.create(

        insight.type,

        insight.content,

        {

          confidence:

            insight.confidence,


          entities:

            insight.entities,

        },

      );





    this.graph.addNode({

      id:

        entity.id,


      type:

        insight.type,


      label:

        entity.name,


      data:

      {

        confidence:

          insight.confidence,


        entities:

          insight.entities,

      },


      createdAt:

        entity.createdAt,

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


        this.goals.create(

          insight.content,

          insight.content,

          [

            entity.id,

          ],

        );



        this.workspaces.add(

          "growth",

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

          "core",

          insight.content,

        );


        break;

    }

  }





  /**
   * ==========================================================
   * State snapshot
   * ==========================================================
   */
  public state():

    {

      entities: unknown[];

      goals: unknown[];

      agents: unknown[];

      workspaces: unknown[];

      graph: unknown[];

    } {


    return {


      entities:

        this.entities.all(),



      goals:

        this.goals.all(),



      agents:

        this.agents.all(),



      workspaces:

        this.workspaces.all(),



      graph:

        this.graph.all(),

    };

  }

}