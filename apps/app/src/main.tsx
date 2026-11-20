import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./router";
import "@fontsource-variable/plus-jakarta-sans/wght.css";
import "./styles.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Elemen #root tidak ditemukan");

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
