import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ShoppingBag } from "lucide-react";
import { validateLogin } from "../validators/loginValidator";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateLogin({ email, password });
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      await login(email, password);
      console.log("Login exitoso");
    } catch {
      console.log("error al hacer login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-8 py-8">
        <div className="mx-auto max-w-md">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-500 text-white">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">DemoEcommerce</p>
              <p className="text-sm text-gray-500">Accede a tu cuenta</p>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-[1.3rem] font-semibold text-gray-900">Login</h2>
            <p className="mt-1 text-sm text-gray-500">
              Ingresa tus credenciales para continuar.
            </p>
          </div>

          <div
            className="rounded-lg bg-white p-6 border border-gray-100"
            style={{
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Correo
                </label>

                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@ejemplo.com"
                    className={`w-full rounded-md bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition ${
                      fieldErrors.email
                        ? "border border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                  />
                </div>

                {fieldErrors.email && (
                  <p className="mt-2 text-sm text-red-500">{fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>

                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full rounded-md bg-white py-2.5 pl-10 pr-10 text-sm outline-none transition ${
                      fieldErrors.password
                        ? "border border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {fieldErrors.password && (
                  <p className="mt-2 text-sm text-red-500">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md border-none bg-blue-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Ingresando..." : "Iniciar sesión"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}