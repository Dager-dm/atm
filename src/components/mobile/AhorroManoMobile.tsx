import React from "react";

const AhorroManoMobile: React.FC = () => {
  return (
    <div className="ahorro-mano-container">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="time">9:41</div>
        <div className="status-icons">
          <div className="signal-icon">📶</div>
          <div className="wifi-icon">📶</div>
          <div className="battery-icon">🔋 100</div>
        </div>
      </div>

      {/* Header */}
      <div className="ahorro-header">
        <div className="header-left">
          <span className="help-text">Ayuda</span>
          <span className="help-icon">❓</span>
        </div>
        <div className="header-center">
          <div className="logo">
            <div className="logo-line"></div>
            <div className="logo-line"></div>
            <div className="logo-line"></div>
          </div>
        </div>
        <div className="header-right">
          <span className="messages-text">Mensajes</span>
          <div className="bell-container">
            <span className="bell-icon">🔔</span>
            <div className="notification-dot"></div>
          </div>
        </div>
      </div>

      {/* Greeting */}
      <div className="greeting-section">
        <h1 className="greeting-text">Buenos Días</h1>
      </div>

      {/* Dynamic Key Card */}
      <div className="dynamic-key-card">
        <div className="key-left">
          <div className="lock-icon">🔒</div>
          <div className="key-info">
            <span className="key-label">Clave dinámica</span>
            <span className="key-number">737064</span>
          </div>
        </div>
        <div className="key-right">
          <span className="key-date">24 Abr 2021</span>
        </div>
      </div>

      {/* Information Alert Card */}
      <div className="info-alert-card">
        <div className="alert-left">
          <div className="megaphone-icon">📢</div>
        </div>
        <div className="alert-content">
          <h3 className="alert-title">Lo tienes que saber</h3>
          <p className="alert-text">
            Evolucionamos nuestra imagen. Nunca te pediremos tu usuario, clave y
            números de tarjetas a través de llamadas, correos o mensajes de
            texto.
          </p>
        </div>
      </div>

      {/* Action Grid */}
      <div className="action-grid-section">
        <h2 className="section-title">¿Qué quieres hacer hoy?</h2>
        <div className="action-grid">
          <div className="action-button">
            <div className="action-icon">📄</div>
            <span className="action-text">Ver saldos y movimientos</span>
          </div>
          <div className="action-button">
            <div className="action-icon">↔️</div>
            <span className="action-text">Transferir dinero</span>
          </div>
          <div className="action-button">
            <div className="action-icon">💳</div>
            <span className="action-text">
              Pagar tarjeta de crédito y créditos
            </span>
          </div>
          <div className="action-button">
            <div className="action-icon">💰</div>
            <span className="action-text">Pagar y administrar facturas</span>
          </div>
          <div className="action-button">
            <div className="action-icon">⚙️</div>
            <span className="action-text">Gestionar mi día a día</span>
          </div>
          <div className="action-button">
            <div className="action-icon">👛</div>
            <span className="action-text">Bolsillos</span>
          </div>
          <div className="action-button">
            <div className="action-icon">🚌</div>
            <span className="action-text">Recargar Cívica</span>
          </div>
          <div className="action-button">
            <div className="action-icon">➕</div>
            <span className="action-text">Inscribir cuentas</span>
          </div>
        </div>
      </div>

      {/* New Opportunities Section */}
      <div className="opportunities-section">
        <h2 className="section-title">Nuevas oportunidades</h2>
        <div className="opportunities-carousel">
          <div className="opportunity-card">
            <div className="card-content">
              <div className="card-icon">👷</div>
              <span className="card-text">MisAliados</span>
            </div>
          </div>
          <div className="qr-code">
            <div className="qr-icon">📱</div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-navigation">
        <div className="nav-item active">
          <div className="nav-icon">🏠</div>
          <span className="nav-text">Inicio</span>
        </div>
        <div className="nav-item">
          <div className="nav-icon">💳</div>
          <span className="nav-text">Mis productos</span>
        </div>
        <div className="nav-item">
          <div className="nav-icon">🎯</div>
          <span className="nav-text">Mis metas</span>
        </div>
        <div className="nav-item">
          <div className="nav-icon">🛒</div>
          <span className="nav-text">Solicitar productos</span>
        </div>
        <div className="nav-item">
          <div className="nav-icon">👤</div>
          <span className="nav-text">Perfil</span>
        </div>
      </div>
    </div>
  );
};

export default AhorroManoMobile;
