/**
 * ==========================================================
 * LÉLU
 * VOICE ROUTER
 * ==========================================================
 */

export default class VoiceRouter {

  normalize(

    transcript: string,

  ): string {

    return transcript

      .trim()

      .toLowerCase();

  }

}