/**
 * ==========================================================
 * LÉLU
 * GOAL TRACKER
 *
 * Tracks objectives, progress, and direction
 * ==========================================================
 */



export interface CognitiveGoal {


  id:
    string;


  title:
    string;


  description:
    string;


  status:

    "active"

    | "completed"

    | "paused";



  progress:
    number;



  relatedEntities:
    string[];



  createdAt:
    number;



  updatedAt:
    number;

}





export default class GoalTracker {



  private readonly goals:

    Map<string, CognitiveGoal> =

      new Map();





  /**
   * ==========================================================
   * Create goal
   * ==========================================================
   */
  public create(

    title:
      string,


    description:
      string,


    entities:
      string[] = [],

  ):
    CognitiveGoal {


    const goal:

      CognitiveGoal =

    {

      id:

        crypto.randomUUID(),


      title,


      description,


      status:

        "active",


      progress:

        0,


      relatedEntities:

        entities,


      createdAt:

        Date.now(),


      updatedAt:

        Date.now(),

    };





    this.goals.set(

      goal.id,

      goal,

    );





    return goal;

  }





  /**
   * ==========================================================
   * Update progress
   * ==========================================================
   */
  public updateProgress(

    id:
      string,


    progress:
      number,

  ):
    void {


    const goal =

      this.goals.get(

        id,

      );





    if (

      !goal

    ) {


      return;

    }





    goal.progress =

      Math.max(

        0,

        Math.min(

          100,

          progress,

        ),

      );





    if (

      goal.progress >= 100

    ) {


      goal.status =

        "completed";

    }





    goal.updatedAt =

      Date.now();

  }





  /**
   * ==========================================================
   * Complete goal
   * ==========================================================
   */
  public complete(

    id:
      string,

  ):
    void {


    const goal =

      this.goals.get(

        id,

      );





    if (

      !goal

    ) {


      return;

    }





    goal.status =

      "completed";



    goal.progress =

      100;



    goal.updatedAt =

      Date.now();

  }





  /**
   * ==========================================================
   * Find goals
   * ==========================================================
   */
  public search(

    query:
      string,

  ):
    CognitiveGoal[] {


    const value =

      query.toLowerCase();





    return Array.from(

      this.goals.values(),

    )

    .filter(

      goal =>

        goal.title

          .toLowerCase()

          .includes(value)

        ||

        goal.description

          .toLowerCase()

          .includes(value),

    );

  }





  /**
   * ==========================================================
   * Active goals
   * ==========================================================
   */
  public active():

    CognitiveGoal[] {


    return Array.from(

      this.goals.values(),

    )

    .filter(

      goal =>

        goal.status ===

          "active",

    );

  }





  /**
   * ==========================================================
   * All goals
   * ==========================================================
   */
  public all():

    CognitiveGoal[] {


    return Array.from(

      this.goals.values(),

    );

  }

}