import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useAccount } from "../../contexts/AccountContext";
import NequiMobile from "./NequiMobile";
import AhorroManoMobile from "./AhorroManoMobile";
import AhorroMobile from "./AhorroMobile";
import "../css/MobileApp.css";

const MobileApp: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("nequi");
  const [now, setNow] = useState<string>("");
  const { logout } = useAuth();
  const {
    account,
    loading: accountLoading,
    error: accountError,
  } = useAccount();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, "0");
      const mm = d.getMinutes().toString().padStart(2, "0");
      setNow(`${hh}:${mm}`);
    };
    update();
    const t = setInterval(update, 30_000);
    return () => clearInterval(t);
  }, []);

  const renderContent = () => {
    if (accountLoading) {
      return (
        <div style={{ color: "#111827", padding: 16, fontWeight: 600 }}>
          Cargando cuenta...
        </div>
      );
    }

    if (accountError) {
      return (
        <div style={{ color: "#b91c1c", padding: 16, fontWeight: 600 }}>
          {accountError}
        </div>
      );
    }

    // Seleccionar vista por tipo de cuenta (normalizado en el contexto)
    const type = (account?.accountType || "").toLowerCase();
    if (type.includes("nequi")) return <NequiMobile />;
    if (
      type.includes("ahorro a la mano") ||
      type.includes("ahorromano") ||
      type.includes("mano")
    )
      return <AhorroManoMobile />;
    if (type.includes("ahorro")) return <AhorroMobile />;

    // Fallback: usar selección manual o Nequi por defecto
    switch (activeSection) {
      case "nequi":
        return <NequiMobile />;
      case "ahorromano":
        return <AhorroManoMobile />;
      case "ahorro":
        return <AhorroMobile />;
      default:
        return <NequiMobile />;
    }
  };

  return (
    <div className="mobile-app">
      <div className="phone-container">
        <div className="phone-frame">
          <div className="phone-screen">
            <div
              className="status-bar"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 12px 6px",
                fontSize: 12,
                fontWeight: 700,
                color: "#fff",
                background: "#000",
              }}
            >
              <div className="time">{now || "--:--"}</div>
              <div
                className="status-icons"
                style={{ display: "flex", gap: 6, alignItems: "center" }}
              >
                <div className="signal-icon">📶</div>
                <div className="wifi-icon">📶</div>
                <div className="battery-icon">🔋</div>
              </div>
            </div>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileApp;
