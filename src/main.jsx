// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client"; //renderiza la app
import { RouterProvider } from "react-router-dom"; //coneecta el router
import { StoreProvider } from "./hooks/useGlobalReducer";
import { router } from "./routes";  // 👈 importamos el router nuevo
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreProvider>
    <RouterProvider router={router} />
  </StoreProvider>
);
