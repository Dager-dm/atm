import React from "react";
import "../css/ATMInterface.css";

interface ATMInterfaceProps {
  title: string;
  subtitle: string;
}

const ATMInterface: React.FC<ATMInterfaceProps> = ({ title, subtitle }) => {
  return (
    <div className="atm-container">
      <div className="atm-screen">
        <div className="atm-header">
          <div className="bank-logo">
            <div className="logo-graphic">
              <div className="logo-shape"></div>
              <div className="logo-shape"></div>
              <div className="logo-shape"></div>
            </div>
            <span className="bank-name">{title}</span>
          </div>
          <div className="system-logo"></div>
        </div>

        <div className="atm-content">
          <div className="instruction-area">
            <h2 className="instruction-text">
              Por favor seleccione el monto a retirar
            </h2>
            <div className="decorative-graphic">
              <div className="graphic-shape"></div>
              <div className="graphic-shape"></div>
              <div className="graphic-shape"></div>
            </div>
          </div>

          <div className="transaction-buttons">
            <div className="button-column">
              <button className="transaction-btn withdrawal">
                <span className="btn-text">$20.000</span>
              </button>
              <button className="transaction-btn withdrawal">
                <span className="btn-text">$50.000</span>
              </button>
              <button className="transaction-btn withdrawal">
                <span className="btn-text">$100.000</span>
              </button>
              <button className="transaction-btn withdrawal">
                <span className="btn-text">$200.000</span>
              </button>
            </div>

            <div className="button-column">
              <button className="transaction-btn withdrawal">
                <span className="btn-text">$500.000</span>
              </button>
              <button className="transaction-btn withdrawal">
                <span className="btn-text">$1.000.000</span>
              </button>
              <button className="transaction-btn custom">
                <span className="btn-text">Otro monto</span>
              </button>
            </div>
          </div>
        </div>

        <div className="atm-footer">
          <div className="footer-content">
            <div className="slogan">Grande como tú</div>
            <div className="contact-info">
              <div className="social-icons">
                <span className="icon">f</span>
                <span className="icon">t</span>
                <span className="icon">i</span>
                <span className="icon">y</span>
                <span className="handle">@{title.toLowerCase()}</span>
              </div>
              <div className="phone">800-5151</div>
              <div className="website">www.{title.toLowerCase()}.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATMInterface;
