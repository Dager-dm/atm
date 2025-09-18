import React, { useState } from "react";
import {
  getAccountUser,
  generateCode,
  deleteCode,
  createRetiro,
} from "../../supabase/supabaseFunctions";

const TestView: React.FC = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testGetAccountUser = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await getAccountUser({
        userId: "dGHqyXge8eXm25G5cuskCDwUbqF2",
      });
      console.log("getAccountUser response:", response);
      setResult({ function: "getAccountUser", response });
    } catch (err) {
      console.error("getAccountUser error:", err);
      setError(`getAccountUser failed: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const testGenerateCode = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await generateCode({
        userId: "test-user-id",
        amount: 1000,
      });
      console.log("generateCode response:", response);
      setResult({ function: "generateCode", response });
    } catch (err) {
      console.error("generateCode error:", err);
      setError(`generateCode failed: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const testDeleteCode = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await deleteCode({ codeId: "test-code-id" });
      console.log("deleteCode response:", response);
      setResult({ function: "deleteCode", response });
    } catch (err) {
      console.error("deleteCode error:", err);
      setError(`deleteCode failed: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const testCreateRetiro = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await createRetiro({
        userId: "test-user-id",
        amount: 1000,
        accountId: "test-account-id",
      });
      console.log("createRetiro response:", response);
      setResult({ function: "createRetiro", response });
    } catch (err) {
      console.error("createRetiro error:", err);
      setError(`createRetiro failed: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Segoe UI",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1>🧪 Vista de Prueba - Funciones Supabase</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Funciones Disponibles:</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={testGetAccountUser}
            disabled={loading}
            style={{
              padding: "10px 15px",
              backgroundColor: "#8b5cf6",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            Test getAccountUser
          </button>

          <button
            onClick={testGenerateCode}
            disabled={loading}
            style={{
              padding: "10px 15px",
              backgroundColor: "#8b5cf6",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            Test generateCode
          </button>

          <button
            onClick={testDeleteCode}
            disabled={loading}
            style={{
              padding: "10px 15px",
              backgroundColor: "#8b5cf6",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            Test deleteCode
          </button>

          <button
            onClick={testCreateRetiro}
            disabled={loading}
            style={{
              padding: "10px 15px",
              backgroundColor: "#8b5cf6",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            Test createRetiro
          </button>

          <button
            onClick={testGetAccountUser}
            disabled={loading}
            style={{
              padding: "10px 15px",
              backgroundColor: "#8b5cf6",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            Test getUserAccount
          </button>
        </div>
      </div>

      {loading && (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f3f4f6",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          <p>🔄 Ejecutando función...</p>
        </div>
      )}

      {error && (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ color: "#dc2626", margin: "0 0 10px 0" }}>❌ Error:</h3>
          <p style={{ color: "#dc2626", margin: 0 }}>{error}</p>
        </div>
      )}

      {result && (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f0f9ff",
            border: "1px solid #bae6fd",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ color: "#0369a1", margin: "0 0 10px 0" }}>
            ✅ Resultado de {result.function}:
          </h3>
          <pre
            style={{
              backgroundColor: "#1e293b",
              color: "#e2e8f0",
              padding: "15px",
              borderRadius: "5px",
              overflow: "auto",
              fontSize: "14px",
            }}
          >
            {JSON.stringify(result.response, null, 2)}
          </pre>
        </div>
      )}

      <div
        style={{
          padding: "20px",
          backgroundColor: "#f9fafb",
          borderRadius: "5px",
          fontSize: "14px",
        }}
      >
        <h3>📝 Instrucciones:</h3>
        <ul>
          <li>
            Haz clic en cualquier botón para probar la función correspondiente
          </li>
          <li>Revisa la consola del navegador para logs detallados</li>
          <li>Los resultados aparecerán en la sección de abajo</li>
          <li>Si hay errores, aparecerán en la sección roja</li>
        </ul>
      </div>
    </div>
  );
};

export default TestView;
