/**
 * ==========================================================
 * LÉLU
 * VOICE RECOGNIZER
 * ==========================================================
 */

type SpeechRecognitionConstructor = new () => {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
};

export default class VoiceRecognizer {

  private recognition?: InstanceType<SpeechRecognitionConstructor>;

  constructor() {

    const API =
      window.SpeechRecognition ??
      window.webkitSpeechRecognition;

    if (!API) return;

    this.recognition = new API();

    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = "en-US";

  }

  async start(): Promise<void> {

    this.recognition?.start();

  }

  stop(): void {

    this.recognition?.stop();

  }

}