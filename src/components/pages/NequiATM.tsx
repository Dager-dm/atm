import React, { useState } from "react";
import "../css/ATMInterface.css";
import { getAccount } from "../../supabase/supabaseFunctions";

interface ValidatedAccount {
  id: string;
  idCuenta?: string;
  idUsuario?: string;
  nombreTitular?: string;
  balance: number;
  saldo?: number;
  tipoCuenta?: string;
}

const NequiATM: React.FC = () => {
  const [step, setStep] = useState<"enter" | "options" | "amount" | "code">(
    "enter"
  );
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<ValidatedAccount | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [amountError, setAmountError] = useState<string | null>(null);
  const [code, setCode] = useState<string>("");
  const [codeError, setCodeError] = useState<string | null>(null);

  const handleAccountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    setAccountNumber(onlyDigits.slice(0, 10));
  };

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!accountNumber.trim()) {
      setError("Ingresa el número de cuenta");
      return;
    }
    if (accountNumber.length !== 10) {
      setError("El número de cuenta debe tener 10 dígitos");
      return;
    }
    setLoading(true);
    try {
      const formatted = accountNumber.startsWith("0")
        ? accountNumber
        : `0${accountNumber}`;
      const res = await getAccount({ idCuenta: formatted });

      if (res?.message) {
        throw new Error(res.message);
      }

      let raw = res?.data;
      if (Array.isArray(raw)) {
        raw = raw[0];
      }

      if (!raw) throw new Error("Cuenta no encontrada");
      const normalized: ValidatedAccount = {
        id: raw.idCuenta || raw.id || accountNumber,
        idCuenta: raw.idCuenta,
        idUsuario: raw.idUsuario,
        nombreTitular: raw.nombreTitular,
        balance:
          typeof raw.saldo === "number"
            ? raw.saldo
            : typeof raw.balance === "number"
            ? raw.balance
            : 0,
        saldo: raw.saldo,
        tipoCuenta: raw.tipoCuenta,
      };
      setAccount(normalized);
      setStep("options");
    } catch (err: any) {
      setError(err?.message || "Error validando la cuenta");
    } finally {
      setLoading(false);
    }
  };

  const renderEnter = () => (
    <div className="atm-container">
      <div className="atm-screen">
        <div className="atm-header">
          <div className="bank-logo">
            <div className="logo-graphic">
              <div className="logo-shape"></div>
              <div className="logo-shape"></div>
              <div className="logo-shape"></div>
            </div>
            <span className="bank-name">Nequi</span>
          </div>
          <div className="system-logo"></div>
        </div>

        <div className="atm-content">
          <div className="instruction-area">
            <h2 className="instruction-text">Ingresa tu número de cuenta</h2>
            <div className="decorative-graphic">
              <div className="graphic-shape"></div>
              <div className="graphic-shape"></div>
              <div className="graphic-shape"></div>
            </div>
          </div>

          <form
            noValidate
            onSubmit={handleValidate}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "80%",
                color: "#fff",
                fontSize: 14,
                alignSelf: "center",
              }}
            >
              Número de cuenta
            </div>
            <input
              type="tel"
              value={accountNumber}
              onChange={handleAccountInputChange}
              placeholder="Ej: 03001239879"
              style={{
                width: "80%",
                padding: "12px 14px",
                borderRadius: 10,
                border: "1px solid #d1d5db",
                background: "#ffffff",
                color: "#111827",
                fontSize: 16,
                outline: "none",
              }}
              inputMode="numeric"
              maxLength={10}
              autoFocus
            />
            {error ? (
              <div style={{ color: "#fecaca", fontSize: 14 }}>{error}</div>
            ) : null}
            <button
              type="submit"
              className="transaction-btn custom"
              disabled={loading}
              style={{
                width: 220,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Validando..." : "Continuar"}
            </button>
          </form>
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
                <span className="handle">@nequi</span>
              </div>
              <div className="phone">800-5151</div>
              <div className="website">www.nequi.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOptions = () => (
    <div className="atm-container">
      <div className="atm-screen">
        <div className="atm-header">
          <div className="bank-logo">
            <div className="logo-graphic">
              <div className="logo-shape"></div>
              <div className="logo-shape"></div>
              <div className="logo-shape"></div>
            </div>
            <span className="bank-name">Nequi</span>
          </div>
          <div className="system-logo"></div>
        </div>

        <div className="atm-content">
          <div className="instruction-area">
            <h2 className="instruction-text">Selecciona el monto a retirar</h2>
            <div className="decorative-graphic">
              <div className="graphic-shape"></div>
              <div className="graphic-shape"></div>
              <div className="graphic-shape"></div>
            </div>
            <div
              style={{
                color: "#fff",
                opacity: 0.9,
                marginTop: 8,
                fontSize: 14,
              }}
            >
              {account?.nombreTitular ? `${account.nombreTitular} · ` : ""}
              Saldo: $ {Number(account?.balance || 0).toLocaleString()}
            </div>
          </div>

          <div className="transaction-buttons">
            <div className="button-column">
              <button
                className="transaction-btn withdrawal"
                onClick={() => {
                  setSelectedAmount(20000);
                  setStep("code");
                }}
              >
                <span className="btn-text">$20.000</span>
              </button>
              <button
                className="transaction-btn withdrawal"
                onClick={() => {
                  setSelectedAmount(50000);
                  setStep("code");
                }}
              >
                <span className="btn-text">$50.000</span>
              </button>
              <button
                className="transaction-btn withdrawal"
                onClick={() => {
                  setSelectedAmount(100000);
                  setStep("code");
                }}
              >
                <span className="btn-text">$100.000</span>
              </button>
              <button
                className="transaction-btn withdrawal"
                onClick={() => {
                  setSelectedAmount(200000);
                  setStep("code");
                }}
              >
                <span className="btn-text">$200.000</span>
              </button>
            </div>

            <div className="button-column">
              <button
                className="transaction-btn withdrawal"
                onClick={() => {
                  setSelectedAmount(500000);
                  setStep("code");
                }}
              >
                <span className="btn-text">$500.000</span>
              </button>
              <button
                className="transaction-btn withdrawal"
                onClick={() => {
                  setSelectedAmount(1000000);
                  setStep("code");
                }}
              >
                <span className="btn-text">$1.000.000</span>
              </button>
              <button
                className="transaction-btn custom"
                onClick={() => {
                  setSelectedAmount(null);
                  setCustomAmount("");
                  setAmountError(null);
                  setStep("amount");
                }}
              >
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
                <span className="handle">@nequi</span>
              </div>
              <div className="phone">800-5151</div>
              <div className="website">www.nequi.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAmount = () => (
    <div className="atm-container">
      <div className="atm-screen">
        <div className="atm-header">
          <div className="bank-logo">
            <div className="logo-graphic">
              <div className="logo-shape"></div>
              <div className="logo-shape"></div>
              <div className="logo-shape"></div>
            </div>
            <span className="bank-name">Nequi</span>
          </div>
          <div className="system-logo"></div>
        </div>

        <div className="atm-content">
          <div className="instruction-area">
            <h2 className="instruction-text">Ingresa el monto a retirar</h2>
            <div className="decorative-graphic">
              <div className="graphic-shape"></div>
              <div className="graphic-shape"></div>
              <div className="graphic-shape"></div>
            </div>
            <div
              style={{
                color: "#fff",
                opacity: 0.9,
                marginTop: 8,
                fontSize: 14,
              }}
            >
              Saldo: $ {Number(account?.balance || 0).toLocaleString()}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setAmountError(null);
              const digits = customAmount.replace(/\D/g, "");
              const value = Number(digits);
              if (!value || value <= 0) {
                setAmountError("Ingresa un monto válido");
                return;
              }
              if (value > (account?.balance || 0)) {
                setAmountError("El monto supera el saldo disponible");
                return;
              }
              setSelectedAmount(value);
              setStep("code");
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "center",
            }}
          >
            <input
              type="tel"
              value={customAmount}
              onChange={(e) =>
                setCustomAmount(e.target.value.replace(/\D/g, "").slice(0, 9))
              }
              placeholder="Ej: 150000"
              style={{
                width: "80%",
                padding: "12px 14px",
                borderRadius: 10,
                border: "1px solid #d1d5db",
                background: "#ffffff",
                color: "#111827",
                fontSize: 16,
                outline: "none",
              }}
              inputMode="numeric"
              autoFocus
            />
            {amountError ? (
              <div style={{ color: "#fecaca", fontSize: 14 }}>
                {amountError}
              </div>
            ) : null}
            <div style={{ display: "flex", gap: 12 }}>
              <button
                type="button"
                className="transaction-btn withdrawal"
                onClick={() => setStep("options")}
              >
                Atrás
              </button>
              <button
                type="submit"
                className="transaction-btn custom"
                style={{ width: 220 }}
              >
                Continuar
              </button>
            </div>
          </form>
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
                <span className="handle">@nequi</span>
              </div>
              <div className="phone">800-5151</div>
              <div className="website">www.nequi.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCode = () => (
    <div className="atm-container">
      <div className="atm-screen">
        <div className="atm-header">
          <div className="bank-logo">
            <div className="logo-graphic">
              <div className="logo-shape"></div>
              <div className="logo-shape"></div>
              <div className="logo-shape"></div>
            </div>
            <span className="bank-name">Nequi</span>
          </div>
          <div className="system-logo"></div>
        </div>

        <div className="atm-content">
          <div className="instruction-area">
            <h2 className="instruction-text">Ingresa el código de retiro</h2>
            <div className="decorative-graphic">
              <div className="graphic-shape"></div>
              <div className="graphic-shape"></div>
              <div className="graphic-shape"></div>
            </div>
            <div
              style={{
                color: "#fff",
                opacity: 0.9,
                marginTop: 8,
                fontSize: 14,
              }}
            >
              Monto: $ {Number(selectedAmount || 0).toLocaleString()} · Saldo: ${" "}
              {Number(account?.balance || 0).toLocaleString()}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setCodeError(null);
              if (!code || code.length < 6) {
                setCodeError("Código inválido");
                return;
              }
              /* Aquí luego conectamos verificación */ alert(
                "Código ingresado: " + code
              );
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "center",
            }}
          >
            <input
              type="tel"
              value={code}
              onChange={(e) =>
                setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="Código de 6 dígitos"
              style={{
                width: "60%",
                padding: "12px 14px",
                borderRadius: 10,
                border: "1px solid #d1d5db",
                background: "#ffffff",
                color: "#111827",
                fontSize: 16,
                outline: "none",
                textAlign: "center",
                letterSpacing: 4,
              }}
              inputMode="numeric"
              autoFocus
            />
            {codeError ? (
              <div style={{ color: "#fecaca", fontSize: 14 }}>{codeError}</div>
            ) : null}
            <div style={{ display: "flex", gap: 12 }}>
              <button
                type="button"
                className="transaction-btn withdrawal"
                onClick={() => setStep("options")}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="transaction-btn custom"
                style={{ width: 220 }}
              >
                Confirmar
              </button>
            </div>
          </form>
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
                <span className="handle">@nequi</span>
              </div>
              <div className="phone">800-5151</div>
              <div className="website">www.nequi.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (step === "enter") return renderEnter();
  if (step === "options") return renderOptions();
  if (step === "amount") return renderAmount();
  return renderCode();
};

export default NequiATM;
