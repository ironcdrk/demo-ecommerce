import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ShoppingBag } from "lucide-react";
import { validateLogin } from "../validators/loginValidator";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const { login, loading, error } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateLogin({ email, password });
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      await login(email, password);
      console.log("Login exitoso");
      navigate("/");
    } catch {
      console.log("error al hacer login");
    }
  };
  
    return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-brand">
          <div className="login-brand-icon">
            <ShoppingBag size={24} />
          </div>

          <div>
            <p style={{ margin: 0, fontSize: "1.75rem", fontWeight: 700, color: "#111827" }}>
              Login
            </p>
            <p className="login-subtitle">Ingresa tus credenciales para continuar.</p>
          </div>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Correo
              </label>

              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  className={`user_email form-input ${fieldErrors.email ? "form-input-error" : ""}`}
                />
              </div>

              {fieldErrors.email && (
                <p className="field-error">{fieldErrors.email}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>

              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`user_password form-input ${fieldErrors.password ? "form-input-error" : ""}`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="password-toggle"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {fieldErrors.password && (
                <p className="field-error">{fieldErrors.password}</p>
              )}
            </div>

            {error && <div className="form-error-box">{error}</div>}

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Ingresando..." : "Iniciar sesión"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
 
}