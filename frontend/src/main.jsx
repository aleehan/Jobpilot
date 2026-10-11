import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ApplicationsProvider } from "./context/ApplicationsContext.jsx";
import App from "./App.jsx";
import "./styles/index.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ApplicationsProvider>
          <App />
        </ApplicationsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
