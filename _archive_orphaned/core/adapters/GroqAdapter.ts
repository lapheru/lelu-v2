/**
 * ==========================================================
 * LÉLU
 * GROQ ADAPTER
 * ==========================================================
 */

export default class GroqAdapter {

  readonly name =
    "Groq";


  async chat(
    prompt: string,
  ): Promise<string> {

    const apiKey =
      import.meta.env.VITE_GROQ_API_KEY;


    if (!apiKey) {

      throw new Error(
        "Groq API key missing.",
      );

    }


    const endpoint =
      "https://api.groq.com/openai/v1/chat/completions";


    const model =
      "openai/gpt-oss-120b";


    const response =
      await fetch(
        endpoint,
        {

          method:
            "POST",

          headers:
          {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${apiKey}`,
          },


          body:
            JSON.stringify({

              model,

              messages:
              [

                {
                  role:
                    "system",

                  content:
`You are Lélu.
You are intelligent,
calm,
creative and engineering focused.`,
                },

                {
                  role:
                    "user",

                  content:
                    prompt,
                },

              ],

            }),

        },
      );


    const raw =
      await response.text();


    let json:
      any = null;


    try {

      json =
        JSON.parse(raw);

    } catch {

      json =
        null;

    }


    if (!response.ok) {

      throw new Error(
        `Groq ${response.status}: ${
          json?.error?.message ??
          raw
        }`,
      );

    }


    const content =
      json?.choices?.[0]?.message?.content;


    if (!content) {

      throw new Error(
        "Groq returned no content.",
      );

    }


    return content;

  }

}