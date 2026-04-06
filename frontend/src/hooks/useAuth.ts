import { useState } from "react";
import { loginRequest } from "../api/auth";

interface AuthUser {
  id: number;
  name: string;
  email: string;
}

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(email: string, password: string) {
    try {
      setLoading(true);
      setError("");

      const response = await loginRequest({
        email,
        password,
        device_name: "web",
      });
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      window.dispatchEvent(new Event("auth_changed"));
      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error inesperado al iniciar sesión";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("demo_cart_v1");
    window.dispatchEvent(new Event("auth_changed"));
    window.dispatchEvent(new Event("cart_updated"));
  }

  function getUser(): AuthUser | null {
    try {
      const rawUser = localStorage.getItem("user");

      if (!rawUser || rawUser === "undefined") return null;

      return JSON.parse(rawUser);
    } catch {
      return null;
    }
  }

  function getToken(): string | null {
    return localStorage.getItem("token");
  }

  function isAuthenticated(): boolean {
    return !!getToken();
  }

  return {
    login,
    logout,
    getUser,
    getToken,
    isAuthenticated,
    loading,
    error,
  };
}