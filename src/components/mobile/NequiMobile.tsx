import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/NequiMobile.css";

const NequiMobile: React.FC = () => {
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const [showCodeScreen, setShowCodeScreen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [oneTimeCode, setOneTimeCode] = useState<string>("------");

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const toggleBalanceVisibility = () => {
    setIsBalanceHidden(!isBalanceHidden);
  };

  const generateCode = () => {
    const code = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    setOneTimeCode(code);
  };

  const handlePesoButtonClick = () => {
    setShowCodeScreen(true);
    setSecondsLeft(60);
    generateCode();
  };

  const handleRegenerate = () => {
    setSecondsLeft(60);
    generateCode();
  };

  const handleBack = () => {
    setShowCodeScreen(false);
  };

  useEffect(() => {
    if (!showCodeScreen) return;
    if (secondsLeft === 0) return;
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [showCodeScreen, secondsLeft]);

  if (showCodeScreen) {
    return (
      <div className="nequi-container">
        <div
          style={{
            background: "#ffffff",
            color: "#1f2937",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            position: "relative",
          }}
        >
          <button
            onClick={handleBack}
            aria-label="Volver"
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: "transparent",
              border: "none",
              fontSize: 24,
              cursor: "pointer",
            }}
          >
            ←
          </button>
          <div style={{ fontSize: 14, marginBottom: 8, opacity: 0.7 }}>
            Código válido por
          </div>
          <div style={{ fontSize: 48, fontWeight: 700, marginBottom: 24 }}>
            {secondsLeft}s
          </div>
          <div
            style={{
              fontSize: 40,
              letterSpacing: 6,
              fontWeight: 800,
              background: "#1D2247",
              color: "#fff",
              padding: "16px 24px",
              borderRadius: 12,
              boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
              marginBottom: 24,
              minWidth: 220,
              textAlign: "center",
            }}
          >
            {oneTimeCode}
          </div>
          {secondsLeft === 0 ? (
            <button
              onClick={handleRegenerate}
              style={{
                background: "#8b5cf6",
                color: "#fff",
                border: "none",
                padding: "12px 20px",
                borderRadius: 10,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 6px 14px rgba(139,92,246,0.35)",
              }}
            >
              Generar nuevo código
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="nequi-container">
      {/* Header */}
      <div className="nequi-header">
        <div className="user-greeting">
          <div className="user-icon">👤</div>
          <span>Hola, Dager</span>
        </div>
        <div className="header-actions">
          <button className="action-btn">🔔</button>
          <button className="action-btn">❓</button>
          <button
            className="action-btn"
            onClick={handleLogout}
            title="Cerrar sesión"
            style={{
              color: "#ef4444",
              fontSize: "18px",
            }}
          >
            🚪
          </button>
        </div>
      </div>

      {/* Balance Section */}
      <div className="balance-section">
        <div className="balance-header">
          <span>Depósito Bajo Monto</span>
          <button className="eye-btn" onClick={toggleBalanceVisibility}>
            {isBalanceHidden ? "👁️‍🗨️" : "👁️‍🗨️"}
          </button>
        </div>
        <div className="balance-amount">
          {isBalanceHidden ? "••••••••" : "$ 482.444,91"}
        </div>
      </div>

      {/* Favorites Section */}
      <div className="favorites-section">
        <div className="section-header">
          <div className="section-title">
            <span className="heart-icon">❤️</span>
            Tus favoritos
          </div>
          <button className="edit-btn">✏️</button>
        </div>
        <div className="favorites-list">
          <div className="favorite-item">
            <div className="favorite-icon">💳</div>
            <span>Tarjeta</span>
          </div>
          <div className="favorite-item">
            <div className="favorite-icon">🛏️</div>
            <span>Colchón</span>
          </div>
          <div className="favorite-item">
            <div className="favorite-icon">👛</div>
            <span>Bolsillos</span>
          </div>
          <div className="favorite-item">
            <div className="favorite-icon">🐷</div>
            <span>Metas</span>
          </div>
        </div>
      </div>

      {/* Suggestions Section */}
      <div className="suggestions-section">
        <div className="section-title">Sugeridos Nequi</div>
        <div className="suggestions-list">
          <div className="suggestion-item">
            <div className="suggestion-logo breb">Bre-B</div>
            <span>Bre-B</span>
          </div>
          <div className="suggestion-item">
            <div className="suggestion-icon">🗝️</div>
            <span>Tus llaves</span>
          </div>
          <div className="suggestion-item">
            <div className="suggestion-logo wom">WOM</div>
            <span>WOM</span>
          </div>
          <div className="suggestion-item">
            <div className="suggestion-icon">😊</div>
            <span>Créditos</span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="nav-item active">
          <div className="nav-icon">🏠</div>
          <span>Inicio</span>
        </div>
        <div className="nav-item">
          <div className="nav-icon">📄</div>
          <span>Movimientos</span>
        </div>
        <div className="nav-item">
          <div className="nav-icon">⚙️</div>
          <span>Servicios</span>
        </div>
        <button className="peso-button" onClick={handlePesoButtonClick}>
          <span className="peso-symbol">$</span>
        </button>
      </div>
    </div>
  );
};

export default NequiMobile;
