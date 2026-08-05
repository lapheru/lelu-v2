/**
 * ==========================================================
 * LÉLU
 * KEYWORD EXTRACTOR
 * ==========================================================
 */

export default class KeywordExtractor {

  extract(
    message: string,
  ): string[] {

    return message

      .toLowerCase()

      .replace(
        /[^a-z0-9 ]/g,
        "",
      )

      .split(" ")

      .filter(

        word =>

          word.length > 2,

      );

  }

}