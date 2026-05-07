export type ApiOk<T> = { success: true; data: T };
export type ApiFail = { success: false; message?: string; error?: unknown };

export class ApiError extends Error {
  status: number;
  body?: unknown;

  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

async function safeJson(res: Response): Promise<unknown | undefined> {
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) return undefined;
  try {
    return await res.json();
  } catch {
    return undefined;
  }
}

export async function postJson<TResponse>(
  url: string,
  body: unknown,
  init?: Omit<RequestInit, "method" | "body">
): Promise<TResponse> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {}),
    },
    body: JSON.stringify(body),
    ...init,
  });

  const parsed = await safeJson(res);
  if (!res.ok) {
    const msg =
      (parsed as { message?: string } | undefined)?.message ||
      `Request failed (${res.status})`;
    throw new ApiError(msg, res.status, parsed);
  }

  return parsed as TResponse;
}

