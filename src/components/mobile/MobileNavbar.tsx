import React, { useState } from "react";
import "../css/MobileNavbar.css";

interface MobileNavbarProps {
  onSectionChange: (section: string) => void;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ onSectionChange }) => {
  const [activeItem, setActiveItem] = useState<string>("nequi");

  const menuItems = [
    { id: "nequi", label: "Nequi", icon: "💜" },
    { id: "ahorromano", label: "Ahorro a la mano", icon: "💰" },
    { id: "ahorro", label: "Ahorro", icon: "🏦" },
  ];

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    onSectionChange(itemId);
  };

  return (
    <div className="mobile-navbar">
      <div className="navbar-header">
        <div className="app-logo">
          <div className="logo-icon">🏦</div>
          <span className="app-name">Mi Banco</span>
        </div>
        <div className="navbar-actions">
          <button className="action-btn">🔔</button>
          <button className="action-btn">⚙️</button>
        </div>
      </div>

      <div className="navbar-tabs">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-tab ${activeItem === item.id ? "active" : ""}`}
            onClick={() => handleItemClick(item.id)}
          >
            <span className="tab-icon">{item.icon}</span>
            <span className="tab-label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavbar;
