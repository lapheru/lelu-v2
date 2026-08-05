/**
 * ==========================================================
 * LÉLU
 * SKILL ENGINE
 * ==========================================================
 */

export interface Skill {

  id:
    string;

  name:
    string;

  description:
    string;

  category:
    string;

  enabled:
    boolean;

  priority:
    number;

  canHandle(
    input: string,
  ): boolean;

  execute(
    input: string,
  ): Promise<string>;

}

export default class SkillEngine {

  private readonly skills =
    new Map<
      string,
      Skill
    >();

  /**
   * Register.
   */
  public register(
    skill: Skill,
  ): void {

    this.skills.set(
      skill.id,
      skill,
    );

  }

  /**
   * Register many.
   */
  public registerMany(
    skills: Skill[],
  ): void {

    for (

      const skill of
      skills

    ) {

      this.register(
        skill,
      );

    }

  }

  /**
   * Best skill.
   */
  public find(
    input: string,
  ): Skill | undefined {

    return Array

      .from(
        this.skills.values(),
      )

      .filter(

        skill =>

          skill.enabled &&

          skill.canHandle(
            input,
          ),

      )

      .sort(

        (
          left,
          right,
        ) =>

          right.priority -

          left.priority,

      )[0];

  }

  /**
   * Execute.
   */
  public async execute(
    input: string,
  ): Promise<string | undefined> {

    const skill =
      this.find(
        input,
      );

    if (

      skill ===
      undefined

    ) {

      return;

    }

    return skill.execute(
      input,
    );

  }

  /**
   * All.
   */
  public all():
    Skill[] {

    return Array.from(
      this.skills.values(),
    );

  }

  /**
   * Remove.
   */
  public remove(
    id: string,
  ): void {

    this.skills.delete(
      id,
    );

  }

  /**
   * Clear.
   */
  public clear():
    void {

    this.skills.clear();

  }

}