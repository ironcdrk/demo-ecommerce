import { env } from "@/shared/config/env";
const API_URL = env.apiUrl;

export interface LoginPayload {
  email: string;
  password: string;
  device_name?: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export async function loginRequest(payload: LoginPayload): Promise<LoginResponse> {
  console.log("URL de login:", `${API_URL}/auth/login`);
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Credenciales inválidas");
  }

  return data;
}
