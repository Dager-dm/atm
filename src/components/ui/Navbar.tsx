import React, { useState } from "react";
import "../css/Navbar.css";

interface NavbarProps {
  onSectionChange: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSectionChange }) => {
  const [activeItem, setActiveItem] = useState<string>("nequi");

  const menuItems = [
    { id: "nequi", label: "Nequi" },
    { id: "ahorromano", label: "Ahorro a la mano" },
  ];

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    onSectionChange(itemId);
    console.log(`Selected: ${itemId}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-menu">
          {menuItems.map((item) => (
            <li key={item.id} className="navbar-item">
              <button
                className={`navbar-link ${
                  activeItem === item.id ? "active" : ""
                }`}
                onClick={() => handleItemClick(item.id)}
              >
                <span className="link-text">{item.label}</span>
                <div className="liquid-glass-effect"></div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
