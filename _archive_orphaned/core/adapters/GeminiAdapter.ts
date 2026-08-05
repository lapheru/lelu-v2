/**
 * ==========================================================
 * LÉLU
 * GEMINI ADAPTER
 * ==========================================================
 */

export default class GeminiAdapter {

  readonly name =
    "Gemini";


  async chat(
    prompt: string,
  ): Promise<string> {

    const apiKey =
      import.meta.env.VITE_GOOGLE_API_KEY;


    if (!apiKey) {

      throw new Error(
        "Gemini API key missing.",
      );

    }


    const model =
      import.meta.env.VITE_GOOGLE_MODEL ??
      "gemini-2.5-pro";


    const endpoint =
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;


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
          },


          body:
            JSON.stringify({

              systemInstruction:
              {
                parts:
                [
                  {
                    text:
`You are Lélu.
A living AI companion,
teacher,
engineer,
and researcher.`,
                  },
                ],
              },


              contents:
              [
                {
                  parts:
                  [
                    {
                      text:
                        prompt,
                    },
                  ],
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
        `Gemini ${response.status}: ${
          json?.error?.message ??
          raw
        }`,
      );

    }


    const content =
      json?.candidates?.[0]
        ?.content
        ?.parts?.[0]
        ?.text;


    if (!content) {

      throw new Error(
        "Gemini returned no content.",
      );

    }


    return content;

  }

}