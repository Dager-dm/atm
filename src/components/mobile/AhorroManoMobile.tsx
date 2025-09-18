import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useAccount } from "../../contexts/AccountContext";
import logoutIcon from "../../assets/logout.png";
import {
  generateCode as supaGenerateCode,
  deleteCode as supaDeleteCode,
} from "../../supabase/supabaseFunctions";

const AhorroManoMobile: React.FC = () => {
  const [showCodeScreen, setShowCodeScreen] = useState(false);
  const [oneTimeCode, setOneTimeCode] = useState<string>("----");
  const [regenCooldown, setRegenCooldown] = useState<number>(0);

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

  const generateAndSaveCode = async () => {
    const code = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    setOneTimeCode(code);
    try {
      if (account?.id) {
        await supaGenerateCode({ idCuenta: account.id, code });
      }
    } catch (err) {
      console.error("Error al guardar el código en Supabase:", err);
    }
    setRegenCooldown(10);
  };

  const handleCodeButtonClick = async () => {
    setShowCodeScreen(true);
    await generateAndSaveCode();
  };

  const handleRegenerate = async () => {
    await generateAndSaveCode();
  };

  const handleBack = () => {
    setShowCodeScreen(false);
  };

  useEffect(() => {
    if (!showCodeScreen) return;
    if (regenCooldown <= 0) return;
    const t = setTimeout(
      () => setRegenCooldown((s) => Math.max(0, s - 1)),
      1000
    );
    return () => clearTimeout(t);
  }, [regenCooldown, showCodeScreen]);

  // Función para marcar el código como usado (se puede llamar desde el ATM)
  const markCodeAsUsed = async () => {
    if (oneTimeCode && oneTimeCode !== "----") {
      try {
        await supaDeleteCode({ code: oneTimeCode });
        setOneTimeCode("----");
        setShowCodeScreen(false);
      } catch (err) {
        console.error("Error al eliminar el código en Supabase:", err);
      }
    }
  };

  // Exponer la función para que pueda ser llamada desde el ATM
  React.useEffect(() => {
    (window as any).markAhorroManoCodeAsUsed = markCodeAsUsed;
    return () => {
      delete (window as any).markAhorroManoCodeAsUsed;
    };
  }, [oneTimeCode]);

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
            Código de retiro
          </div>
          <div
            style={{
              fontSize: 40,
              letterSpacing: 8,
              fontWeight: 800,
              background: "#1f2937",
              color: "#facc15",
              padding: "16px 24px",
              borderRadius: 12,
              boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
              marginBottom: 24,
              minWidth: 180,
              textAlign: "center",
            }}
          >
            {oneTimeCode}
          </div>
          <div
            style={{
              fontSize: 12,
              marginBottom: 16,
              opacity: 0.7,
              textAlign: "center",
            }}
          >
            Este código se vence cuando se use
          </div>
          <button
            onClick={handleRegenerate}
            disabled={regenCooldown > 0}
            style={{
              background: "#facc15",
              color: "#111827",
              border: "none",
              padding: "12px 20px",
              borderRadius: 10,
              fontWeight: 700,
              cursor: regenCooldown > 0 ? "not-allowed" : "pointer",
              opacity: regenCooldown > 0 ? 0.6 : 1,
              boxShadow: "0 6px 14px rgba(250,204,21,0.35)",
            }}
          >
            {regenCooldown > 0
              ? `Espera ${regenCooldown}s`
              : "Generar nuevo código"}
          </button>
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
          onClick={handleCodeButtonClick}
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
