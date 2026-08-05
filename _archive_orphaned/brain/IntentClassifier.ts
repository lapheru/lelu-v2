/**
 * ==========================================================
 * LÉLU
 * INTENT CLASSIFIER
 * ==========================================================
 */

export default class IntentClassifier {

  classify(
    message: string,
  ): string {

    const input =
      message.toLowerCase();

    if (
      input.includes("error")
    ) {

      return "error";

    }

    if (
      input.includes("help")
    ) {

      return "help";

    }

    if (
      input.includes("build")
    ) {

      return "build";

    }

    return "general";

  }

}