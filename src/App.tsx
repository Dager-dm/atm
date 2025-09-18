import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Navbar from "./components/ui/Navbar";
import NequiATM from "./components/pages/NequiATM";
import AhorroATM from "./components/pages/AhorroATM";
import AhorroManoATM from "./components/pages/AhorroManoATM";
import "./App.css";

function App() {
  const [activeSection, setActiveSection] = useState<string>("nequi");
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

  const renderContent = () => {
    switch (activeSection) {
      case "nequi":
        return <NequiATM />;
      case "ahorromano":
        return <AhorroManoATM />;
      case "ahorro":
        return <AhorroATM />;
      default:
        return <NequiATM />;
    }
  };

  return (
    <div className="App">
      <Navbar onSectionChange={setActiveSection} />
      <main className="main-content">
        <div className="main-container">
          <div className="content-wrapper">
            <div style={{ position: "absolute", top: "10px", right: "10px" }}>
              <button
                onClick={handleLogout}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Logout
              </button>
            </div>
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
