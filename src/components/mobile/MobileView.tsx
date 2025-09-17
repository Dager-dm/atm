import React from "react";
import "../css/MobileView.css";

const MobileView: React.FC = () => {
  return (
    <div className="mobile-view">
      <div className="balance-section">
        <div className="balance-label">Tu saldo</div>
        <div className="balance-amount">$2.500.000</div>
        <div className="balance-subtitle">Disponible</div>
      </div>

      <div className="quick-actions">
        <div className="action-button">
          <div className="action-icon">💸</div>
          <div className="action-text">Enviar</div>
        </div>
        <div className="action-button">
          <div className="action-icon">💰</div>
          <div className="action-text">Recibir</div>
        </div>
        <div className="action-button">
          <div className="action-icon">🏪</div>
          <div className="action-text">Pagar</div>
        </div>
        <div className="action-button">
          <div className="action-icon">📊</div>
          <div className="action-text">Ahorrar</div>
        </div>
      </div>

      <div className="recent-transactions">
        <div className="section-title">Movimientos recientes</div>
        <div className="transaction-list">
          <div className="transaction-item">
            <div className="transaction-icon">💸</div>
            <div className="transaction-details">
              <div className="transaction-title">Envío a Juan Pérez</div>
              <div className="transaction-time">Hace 2 horas</div>
            </div>
            <div className="transaction-amount negative">-$50.000</div>
          </div>
          <div className="transaction-item">
            <div className="transaction-icon">💰</div>
            <div className="transaction-details">
              <div className="transaction-title">Recibo de María García</div>
              <div className="transaction-time">Ayer</div>
            </div>
            <div className="transaction-amount positive">+$75.000</div>
          </div>
          <div className="transaction-item">
            <div className="transaction-icon">🏪</div>
            <div className="transaction-details">
              <div className="transaction-title">Pago en Supermercado</div>
              <div className="transaction-time">Ayer</div>
            </div>
            <div className="transaction-amount negative">-$120.000</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileView;
