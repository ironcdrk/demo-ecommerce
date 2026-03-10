type EnvConfig = {
  apiUrl: string;
};

function getEnv(): EnvConfig {
  return {
    apiUrl: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  };
}

export const env = getEnv();