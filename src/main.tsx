import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlatoInteractivo from "./screens/Plato";
import SeleccionAlimento from "./screens/SeleccionAlimento";
import App from "./App";
import { PlatoProvider } from "./screens/PlatoContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PlatoProvider> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/plato" element={<PlatoInteractivo />} />
          <Route path="/seleccion/:tipo" element={<SeleccionAlimento />} />
        </Routes>
      </BrowserRouter>
    </PlatoProvider>
  </React.StrictMode>
);
