// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import { Toaster } from "react-hot-toast";  // ✅ Import this

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster position="top-right" reverseOrder={false} /> {/* ✅ Add this line */}
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
