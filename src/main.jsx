import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#1a1a2e",
          color: "#fff",
          border: "1px solid #2a2a4a",
        },
        success: {
          iconTheme: { primary: "#e94560", secondary: "#fff" },
        },
        error: {
          iconTheme: { primary: "#ef4444", secondary: "#fff" },
        },
      }}
    />
  </StrictMode>,
);
