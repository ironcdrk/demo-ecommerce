import { env } from "@/shared/config/env";

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${env.apiUrl}${path}`, {
        ...options,
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token && {
            Authorization: `Bearer ${token}`,
            }),
        ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json() as Promise<T>;
}