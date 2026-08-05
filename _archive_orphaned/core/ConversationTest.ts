/**
 * ==========================================================
 * LÉLU
 * CONVERSATION TEST
 * ==========================================================
 */

import AIService
  from "./AIService";


async function conversationTest() {


  const ai =
    AIService.getInstance();



  await ai.initialize();



  const first =
    await ai.chat(
      "My name is Heru. Remember that.",
    );


  console.log(
    "FIRST RESPONSE:",
    first,
  );



  const second =
    await ai.chat(
      "What is my name?",
    );


  console.log(
    "MEMORY RESPONSE:",
    second,
  );



  const third =
    await ai.chat(
      "Help me plan my next project.",
    );


  console.log(
    "PLANNING RESPONSE:",
    third,
  );



  await ai.shutdown();

}



conversationTest()

.catch(

  error => {

    console.error(
      "Lélu conversation failed:",
      error,
    );

  },

);