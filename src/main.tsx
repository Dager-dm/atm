import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { AccountProvider } from "./contexts/AccountContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";
import App from "./App.tsx";
import MobileApp from "./components/mobile/MobileApp.tsx";
import Login from "./components/pages/Login.tsx";
import TestView from "./components/pages/TestView.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <AccountProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/cajero" element={<App />} />
            <Route
              path="/mobile"
              element={
                <ProtectedRoute>
                  <MobileApp />
                </ProtectedRoute>
              }
            />
            <Route path="/test" element={<TestView />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AccountProvider>
    </AuthProvider>
  </StrictMode>
);
