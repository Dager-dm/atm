import React, { useState } from "react";
import "../css/NequiMobile.css";

const NequiMobile: React.FC = () => {
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);

  const toggleBalanceVisibility = () => {
    setIsBalanceHidden(!isBalanceHidden);
  };

  const handlePesoButtonClick = () => {
    alert(
      "¡Botón de pesos presionado! Aquí iría la funcionalidad de envío de dinero."
    );
  };

  return (
    <div className="nequi-container">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="time">8:56 PM</div>
        <div className="status-icons">
          <div className="wifi-icon">📶</div>
          <div className="signal-icon">📶</div>
          <div className="battery-icon">🔋 29</div>
        </div>
      </div>

      {/* Header */}
      <div className="nequi-header">
        <div className="user-greeting">
          <div className="user-icon">👤</div>
          <span>Hola, Dager</span>
        </div>
        <div className="header-actions">
          <button className="action-btn">🔔</button>
          <button className="action-btn">❓</button>
          <button className="action-btn">🔒</button>
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
