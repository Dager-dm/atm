import React, { useState } from "react";
import MobileNavbar from "./MobileNavbar";
import NequiMobile from "../mobile/NequiMobile";
import AhorroManoMobile from "./AhorroManoMobile";
import AhorroMobile from "../mobile/AhorroMobile";
import "../css/MobileApp.css";

const MobileApp: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("nequi");

  const renderContent = () => {
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
          <div className="phone-screen">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default MobileApp;
