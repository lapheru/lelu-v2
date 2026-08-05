/**
 * ==========================================================
 * LÉLU
 * AI PROVIDER CONTRACT
 * ==========================================================
 */


export interface AIMessage {

  role:
    "system"
    | "user"
    | "assistant";


  content:
    string;

}



export interface AIRequest {


  /**
   * Complete conversation context.
   */
  messages:
    AIMessage[];



  /**
   * Latest user message.
   */
  prompt:
    string;



  /**
   * Optional memory/context injected
   * before generation.
   */
  context?:
    string;



  /**
   * Timestamp of request.
   */
  timestamp?:
    number;



  /**
   * Optional model override.
   */
  model?:
    string;



  /**
   * Maximum tokens.
   */
  maxTokens?:
    number;



  /**
   * Sampling temperature.
   */
  temperature?:
    number;



  /**
   * Stop sequences.
   */
  stop?:
    string[];

}



export interface AIResponse {


  text:
    string;



  provider:
    string;



  model:
    string;



  processingTime:
    number;



  cached?:
    boolean;



  metadata?:
    Record<
      string,
      unknown
    >;

}



export interface AIProviderHealth {


  available:
    boolean;



  initialized:
    boolean;



  lastChecked:
    number;



  responseTime?:
    number;



  lastError?:
    string;

}



export default interface AIProvider {


  readonly name:
    string;



  readonly priority:
    number;



  readonly enabled:
    boolean;



  readonly timeout:
    number;



  readonly requiresApiKey:
    boolean;



  readonly capabilities:
    readonly string[];



  initialize():
    Promise<void>;



  shutdown?():
    Promise<void>;



  isAvailable():
    Promise<boolean>;



  health():
    Promise<AIProviderHealth>;



  canHandle(
    input:
      string,
  ):
    boolean;



  generate(
    request:
      AIRequest,
  ):
    Promise<AIResponse>;

}