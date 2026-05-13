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
  try { return await res.json(); } catch { return undefined; }
}

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("auth_token");
    if (raw) return raw;
    // Fallback: JWT cũng có thể nằm trong auth_user object
    const user = localStorage.getItem("auth_user");
    if (user) {
      const parsed = JSON.parse(user);
      return parsed?.token || null;
    }
  } catch { /* ignore */ }
  return null;
}

function authHeaders(extra?: HeadersInit): HeadersInit {
  const token = getToken();
  return {
    "content-type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(extra ?? {}),
  };
}

export async function getJson<TResponse>(
  url: string,
  init?: Omit<RequestInit, "method">
): Promise<TResponse> {
  const res = await fetch(url, {
    method: "GET",
    headers: authHeaders(init?.headers),
    ...init,
  });
  const parsed = await safeJson(res);
  if (!res.ok) {
    const msg = (parsed as { message?: string } | undefined)?.message
      || `GET failed (${res.status})`;
    throw new ApiError(msg, res.status, parsed);
  }
  return parsed as TResponse;
}

export async function postJson<TResponse>(
  url: string,
  body: unknown,
  init?: Omit<RequestInit, "method" | "body">
): Promise<TResponse> {
  const res = await fetch(url, {
    method: "POST",
    headers: authHeaders(init?.headers),
    body: JSON.stringify(body),
    ...init,
  });
  const parsed = await safeJson(res);
  if (!res.ok) {
    const msg = (parsed as { message?: string } | undefined)?.message
      || `POST failed (${res.status})`;
    throw new ApiError(msg, res.status, parsed);
  }
  return parsed as TResponse;
}

export async function patchJson<TResponse>(
  url: string,
  body?: unknown,
  init?: Omit<RequestInit, "method" | "body">
): Promise<TResponse> {
  const res = await fetch(url, {
    method: "PATCH",
    headers: authHeaders(init?.headers),
    body: body !== undefined ? JSON.stringify(body) : undefined,
    ...init,
  });
  const parsed = await safeJson(res);
  if (!res.ok) {
    const msg = (parsed as { message?: string } | undefined)?.message
      || `PATCH failed (${res.status})`;
    throw new ApiError(msg, res.status, parsed);
  }
  return parsed as TResponse;
}
