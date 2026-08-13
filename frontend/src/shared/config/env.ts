type EnvConfig = {
  apiUrl: string;
  baseUrl: string;
};

function getEnv(): EnvConfig {
  return {
    apiUrl: import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1",
    baseUrl: import.meta.env.VITE_SERVER_BASE_URL || "http://localhost:8080",
  };
}

export const env = getEnv();