import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import "./index.css";
import App from "./App.tsx";
import MobileApp from "./components/mobile/MobileApp.tsx";
import Login from "./components/pages/Login.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/cajero" element={<App />} />
          <Route path="/mobile" element={<MobileApp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
