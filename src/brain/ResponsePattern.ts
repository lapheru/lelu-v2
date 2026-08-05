/**
 * ==========================================================
 * LÉLU
 * RESPONSE PATTERN
 * ==========================================================
 */


export type MemoryCategory =

  | "identity"

  | "preference"

  | "goal"

  | "skill"

  | "project"

  | "relationship"

  | "experience"

  | "conversation"

  | "general";




export default interface ResponsePattern {


  /**
   * Unique identifier.
   */
  id:
    string;



  /**
   * Memory category.
   */
  category:
    MemoryCategory;



  /**
   * Original user message.
   */
  prompt:
    string;



  /**
   * Stored information.
   */
  response:
    string;



  /**
   * High-level intent.
   */
  intent:
    string;



  /**
   * Important words.
   */
  keywords:
    string[];



  /**
   * Additional memory metadata.
   */
  context:
    Record<
      string,
      unknown
    >;



  /**
   * Importance of memory.
   */
  importance:
    number;



  /**
   * Confidence score.
   */
  confidence:
    number;



  /**
   * Number of successful retrievals.
   */
  successfulUses:
    number;



  /**
   * Number of failed retrievals.
   */
  failedUses:
    number;



  /**
   * Creation timestamp.
   */
  createdAt:
    number;



  /**
   * Last update timestamp.
   */
  updatedAt:
    number;

}