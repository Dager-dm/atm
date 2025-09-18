import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { useAuth } from "../../contexts/AuthContext";
import "../css/Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Redirigir si ya está logueado
  useEffect(() => {
    if (!authLoading && user) {
      navigate("/mobile");
    }
  }, [user, authLoading, navigate]);

  // Mostrar loading mientras se verifica la autenticación
  if (authLoading) {
    return (
      <div className="login-container">
        <div className="login-form-container">
          <div className="login-form">
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <div style={{ fontSize: "18px" }}>Verificando sesión...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // ✅ Puedes acceder al usuario
      console.log("Usuario logueado:", userCredential.user);

      // Redirigir
      navigate("/mobile");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google user:", result.user);

      navigate("/mobile");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-form">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">
            Welcome back! Please enter your details.
          </p>

          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="form-input"
                required
              />
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="checkbox"
                />
                <span className="checkbox-text">Remember for 30 days</span>
              </label>
              <a href="#" className="forgot-password">
                Forgot password
              </a>
            </div>

            {error && (
              <div
                className="error-message"
                style={{
                  color: "red",
                  marginBottom: "16px",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}

            <button type="submit" className="signin-button" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <button
              type="button"
              className="google-signin-button"
              onClick={handleGoogleSignIn}
            >
              <div className="google-icon">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </div>
              Sign in with Google
            </button>

            <p className="signup-link">
              Don't have an account?{" "}
              <a href="#" className="signup-link-text">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>

      <div className="login-graphic">
        <div className="abstract-circle">
          <div className="circle-top"></div>
          <div className="circle-bottom"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
