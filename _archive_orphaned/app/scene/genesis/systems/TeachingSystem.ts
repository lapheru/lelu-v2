/**
 * ==========================================================
 * LÉLUVERSE
 * TEACHING SYSTEM
 * ==========================================================
 */

export default class TeachingSystem {

  private lessons = new Map<string, unknown>();

  teach(

    topic: string,

    knowledge: unknown,

  ) {

    this.lessons.set(

      topic,

      knowledge,

    );

  }

  recall<T>(

    topic: string,

  ): T | undefined {

    return this.lessons.get(

      topic,

    ) as T;

  }

  knows(

    topic: string,

  ) {

    return this.lessons.has(

      topic,

    );

  }

  clear() {

    this.lessons.clear();

  }

}