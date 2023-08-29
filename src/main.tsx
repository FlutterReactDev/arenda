import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "@app/App";
import { ThemeProvider } from "@app/providers/ThemeProvider";
import { StoreProvider } from "@app/providers/StoreProvider";
import { RouterProvider } from "@app/providers/RouterProvier";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <RouterProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </RouterProvider>
    </StoreProvider>
  </React.StrictMode>
);
