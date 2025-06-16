// src/api/fetchClient.ts
export class FetchError<T = unknown> extends Error {
  status: number;
  body?: T;
  constructor(message: string, status: number, body?: T) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

export async function fetchClient<TResponse>(
  input: RequestInfo,
  options?: RequestInit
): Promise<TResponse> {
  const res = await fetch(input, {
    ...options,
    headers: {
      ...(options?.headers || {}),
      "Content-Type": "application/json",
    },
  });

  const contentType = res.headers.get("content-type");
  const data = contentType?.includes("application/json")
    ? await res.json()
    : null;

  if (!res.ok) {
    throw new FetchError(res.statusText, res.status, data);
  }

  return data;
}
