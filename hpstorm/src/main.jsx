import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import PanierProvider from "./context/PanierProvider.jsx";
import "./styles/variables.css";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <PanierProvider>
        <App />
      </PanierProvider>
    </HashRouter>
  </StrictMode>
);