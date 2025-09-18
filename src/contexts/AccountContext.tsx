import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getAccountUser } from "../supabase/supabaseFunctions";

interface Account {
  id: string;
  userId: string;
  balance: number;
  accountType: string;
  nombreTitular?: string;
  // Agrega más campos según tu estructura de base de datos
}

interface AccountContextType {
  account: Account | null;
  loading: boolean;
  error: string | null;
  refreshAccount: () => Promise<void>;
}

const AccountContext = createContext<AccountContextType | null>(null);

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};

interface AccountProviderProps {
  children: React.ReactNode;
}

export const AccountProvider: React.FC<AccountProviderProps> = ({
  children,
}) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchAccount = async () => {
    console.log(
      "[AccountContext] fetchAccount called. user:",
      user?.uid || null
    );
    if (!user) {
      setAccount(null);
      console.log("[AccountContext] No user. Skipping fetch.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("[AccountContext] Calling getAccountUser with:", {
        userId: user.uid,
      });
      const response = await getAccountUser({ userId: user.uid });
      console.log("[AccountContext] getAccountUser raw response:", response);

      // Normalizar la respuesta al modelo de Account del contexto
      const raw = response?.data || response;
      const normalized: Account | null = raw
        ? {
            id: raw.idCuenta || raw.id || "",
            userId: raw.idUsuario || raw.userId || "",
            balance:
              typeof raw.saldo === "number"
                ? raw.saldo
                : typeof raw.balance === "number"
                ? raw.balance
                : 0,
            accountType: raw.tipoCuenta || raw.accountType || "",
            nombreTitular: raw.nombreTitular,
          }
        : null;

      if (normalized && (normalized.id || normalized.userId)) {
        setAccount(normalized);
        console.log("[AccountContext] Account set (normalized):", normalized);
      } else {
        const errMsg = response?.error || "Error al obtener la cuenta";
        setError(errMsg);
        console.warn("[AccountContext] Error en respuesta:", errMsg);
      }
    } catch (err) {
      setError("Error de conexión al obtener la cuenta");
      console.error("Error fetching account:", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshAccount = async () => {
    await fetchAccount();
  };

  useEffect(() => {
    console.log("[AccountContext] useEffect user changed:", user?.uid || null);
    fetchAccount();
  }, [user]);

  const value = {
    account,
    loading,
    error,
    refreshAccount,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};
