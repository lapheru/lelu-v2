/**
 * ==========================================================
 * LÉLUVERSE
 * SPEECH RECOGNITION SERVICE
 * ==========================================================
 */

export type SpeechRecognitionCallback =
  (transcript: string) => void;

export type SpeechErrorCallback =
  (error: string) => void;

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

declare global {

  interface Window {

    SpeechRecognition?: SpeechRecognitionConstructor;

    webkitSpeechRecognition?: SpeechRecognitionConstructor;

  }

}

export default class SpeechRecognitionService {

  private recognition?: any;

  private listening =
    false;

  private initialized =
    false;

  private transcriptCallback?:
    SpeechRecognitionCallback;

  private errorCallback?:
    SpeechErrorCallback;

  initialize(): void {

    if (this.initialized)
      return;

    const Recognition =

      window.SpeechRecognition ||

      window.webkitSpeechRecognition;

    if (!Recognition) {

      throw new Error(
        "Speech Recognition is not supported by this browser.",
      );

    }

    this.recognition =
      new Recognition();

    this.recognition.continuous =
      true;

    this.recognition.interimResults =
      true;

    this.recognition.maxAlternatives =
      1;

    this.recognition.lang =
      "en-US";

    this.recognition.onresult =
      (event: any) => {

        let transcript =
          "";

        for (

          let i =
            event.resultIndex;

          i <
            event.results.length;

          i++

        ) {

          transcript +=

            event.results[i][0]
              .transcript;

        }

        transcript =
          transcript.trim();

        if (

          transcript.length >

          0

        ) {

          this.transcriptCallback?.(
            transcript,
          );

        }

      };

    this.recognition.onerror =
      (event: any) => {

        this.errorCallback?.(
          event.error,
        );

      };

    this.recognition.onend =
      () => {

        if (

          this.listening

        ) {

          try {

            this.recognition.start();

          }

          catch {

          }

        }

      };

    this.initialized =
      true;

  }

  onTranscript(

    callback:
      SpeechRecognitionCallback,

  ): void {

    this.transcriptCallback =
      callback;

  }

  onError(

    callback:
      SpeechErrorCallback,

  ): void {

    this.errorCallback =
      callback;

  }

  start(): void {

    if (

      !this.initialized

    ) {

      this.initialize();

    }

    if (

      this.listening

    ) {

      return;

    }

    this.listening =
      true;

    this.recognition.start();

  }

  stop(): void {

    if (

      !this.recognition

    ) {

      return;

    }

    this.listening =
      false;

    this.recognition.stop();

  }

  toggle(): void {

    if (

      this.listening

    ) {

      this.stop();

    }

    else {

      this.start();

    }

  }

  isListening():
    boolean {

    return this.listening;

  }

}