import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useAccount } from "../../contexts/AccountContext";
import logoutIcon from "../../assets/logout.png";

const AhorroManoMobile: React.FC = () => {
  const [showCodeScreen, setShowCodeScreen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [oneTimeCode, setOneTimeCode] = useState<string>("------");

  const { logout } = useAuth();
  const { account } = useAccount();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const generateCode = () => {
    const code = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    setOneTimeCode(code);
  };

  const openCodeScreen = () => {
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
      <div style={{ height: "100%", background: "#0f1115", color: "#e5e7eb" }}>
        <div
          style={{
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
              color: "#facc15",
            }}
          >
            ←
          </button>
          <div style={{ fontSize: 14, marginBottom: 8, opacity: 0.8 }}>
            Código válido por
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              marginBottom: 24,
              color: "#facc15",
            }}
          >
            {secondsLeft}s
          </div>
          <div
            style={{
              fontSize: 40,
              letterSpacing: 6,
              fontWeight: 800,
              background: "#1f2937",
              color: "#facc15",
              padding: "16px 24px",
              borderRadius: 12,
              boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
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
                background: "#facc15",
                color: "#111827",
                border: "none",
                padding: "12px 20px",
                borderRadius: 10,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 6px 14px rgba(250,204,21,0.35)",
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
    <div
      style={{
        height: "100%",
        background: "#0f1115",
        color: "#e5e7eb",
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 14px",
          background: "#0b0e13",
          borderBottom: "1px solid #1f2937",
        }}
      >
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}></div>
        <div
          style={{
            fontWeight: 800,
            color: "#facc15",
            alignItems: "flex-start",
          }}
        >
          Ahorro a la mano
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span>🔔</span>
          <button
            onClick={handleLogout}
            title="Cerrar sesión"
            style={{
              background: "transparent",
              border: "1px solid #374151",
              padding: 2,
              borderRadius: 8,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={logoutIcon}
              alt="logout"
              style={{ width: 20, height: 20 }}
            />
          </button>
        </div>
      </div>

      {/* Greeting + Balance */}
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>
          Hola, {account?.nombreTitular || "Usuario"}
        </div>
        <div
          style={{
            background: "#111827",
            border: "1px solid #1f2937",
            borderRadius: 14,
            padding: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
          }}
        >
          <div>
            <div style={{ opacity: 0.8, marginBottom: 6 }}>
              Saldo disponible
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, color: "#facc15" }}>
              $ {Number(account?.balance || 0).toLocaleString()}
            </div>
          </div>
          {null}
        </div>
      </div>

      {/* Acciones principales (decorativo) */}
      <div style={{ padding: 16, paddingTop: 0, paddingBottom: 80 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 10,
          }}
        >
          {[
            { icon: "📄", text: "Ver movimientos" },
            { icon: "↔️", text: "Transferir" },
            { icon: "💳", text: "Tarjetas y créditos" },
            { icon: "💰", text: "Pagar facturas" },
            { icon: "⚙️", text: "Servicios" },
            { icon: "👛", text: "Bolsillos" },
          ].map((it, i) => (
            <div
              key={i}
              style={{
                background: "#111827",
                border: "1px solid #1f2937",
                borderRadius: 12,
                padding: 12,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                color: "#e5e7eb",
              }}
            >
              <div style={{ fontSize: 20 }}>{it.icon}</div>
              <span style={{ fontSize: 12, textAlign: "center" }}>
                {it.text}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Botón flotante inferior */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 12,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <button
          onClick={openCodeScreen}
          style={{
            pointerEvents: "auto",
            background: "#facc15",
            color: "#111827",
            border: "none",
            width: 64,
            height: 64,
            borderRadius: 32,
            fontWeight: 900,
            fontSize: 22,
            boxShadow: "0 10px 20px rgba(250,204,21,0.35)",
            cursor: "pointer",
          }}
          aria-label="Generar código"
          title="Generar código"
        >
          #
        </button>
      </div>
    </div>
  );
};

export default AhorroManoMobile;
