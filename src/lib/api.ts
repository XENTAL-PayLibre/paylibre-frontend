// PayLibre API client base. The API authenticates with HttpOnly session cookies, so every request
// must send credentials. On staging the API allows the http://localhost:3000 origin with
// SameSite=None cookies, so local dev against staging works out of the box.

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://paylibre.staging.xental.online"
).replace(/\/$/, "");

/** fetch wrapper that targets the API and always includes the session cookie. */
export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  return fetch(`${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
}
