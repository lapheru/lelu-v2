/**
 * ==========================================================
 * LÉLU
 * OPENROUTER ADAPTER
 * ==========================================================
 */

export default class OpenRouterAdapter {

  readonly name =
    "OpenRouter";


  async chat(
    prompt: string,
  ): Promise<string> {

    const apiKey =
      import.meta.env.VITE_OPENROUTER_API_KEY;

    if (!apiKey) {

      throw new Error(
        "OpenRouter API key missing.",
      );

    }


    const model =
      import.meta.env.VITE_OPENROUTER_MODEL ??
      "openai/gpt-5.5";


    const response =
      await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {

          method:
            "POST",

          headers:
          {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${apiKey}`,

            "HTTP-Referer":
              window.location.origin,

            "X-Title":
              "LÉLU",
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
creative,
engineering focused,
and a personal AI companion.`,
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
        `OpenRouter ${response.status}: ${
          json?.error?.message ??
          raw
        }`,
      );

    }


    const content =
      json?.choices?.[0]?.message?.content;


    if (!content) {

      throw new Error(
        "OpenRouter returned no content.",
      );

    }


    return content;

  }

}