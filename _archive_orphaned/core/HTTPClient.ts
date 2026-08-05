/**
 * ==========================================================
 * LÉLU
 * HTTP CLIENT
 * ==========================================================
 */

export interface HTTPRequest {

  url: string;

  method?: string;

  headers?: HeadersInit;

  body?: unknown;

  timeout?: number;

}

export interface HTTPResponse<T = unknown> {

  status: number;

  ok: boolean;

  data: T;

}

export default class HTTPClient {

  public async request<T = unknown>(
    request: HTTPRequest,
  ): Promise<HTTPResponse<T>> {

    const controller =
      new AbortController();

    const timeout =
      setTimeout(

        () =>
          controller.abort(),

        request.timeout ??
        30000,

      );

    try {

      const response =
        await fetch(

          request.url,

          {

            method:
              request.method ??
              "GET",

            headers:
              request.headers,

            body:

              request.body ===
              undefined

                ? undefined

                : JSON.stringify(
                    request.body,
                  ),

            signal:
              controller.signal,

          },

        );

      const text =
        await response.text();

      let data:
        unknown = text;

      try {

        data =
          JSON.parse(
            text,
          );

      }

      catch {}

      if (
        !response.ok
      ) {

        throw new Error(

          `${response.status} ${response.statusText}\n\n${text}`,

        );

      }

      return {

        status:
          response.status,

        ok:
          true,

        data:
          data as T,

      };

    }

    finally {

      clearTimeout(
        timeout,
      );

    }

  }

}