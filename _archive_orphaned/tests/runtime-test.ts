/**
 * ==========================================================
 * LÉLU
 * RUNTIME TEST
 * ==========================================================
 */

import AIRuntime
  from "../core/AIRuntime";



async function testRuntime() {


  const runtime =
    new AIRuntime();



  console.log(
    "Starting Lélu runtime...",
  );



  await runtime.initialize();



  console.log(
    "Runtime ready:",
    runtime.isReady(),
  );



  const response =
    await runtime.process({
      messages: [],
      prompt: "Hello Lélu",
      timestamp: Date.now(),
    });



  console.log(
    "Response:",
    response,
  );



  await runtime.shutdown();



  console.log(
    "Runtime stopped",
  );

}



testRuntime()

  .catch(

    error => {

      console.error(
        "Runtime failed:",
        error,
      );

    },

  );