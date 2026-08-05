/**
 * ==========================================================
 * LÉLU
 * VOICE SESSION
 * ==========================================================
 */

export default class VoiceSession {

  id = crypto.randomUUID();

  started = Date.now();

  transcript = "";

  listening = false;

  speaking = false;

}