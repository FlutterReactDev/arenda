import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "@app/App";
import { ThemeProvider } from "@app/providers/ThemeProvider";
import { StoreProvider } from "@app/providers/StoreProvider";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
);
