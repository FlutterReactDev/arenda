import { App } from "@app/App";
import { ErrorBoundary } from "@app/providers/ErrorBoundary";
import { RouterProvider } from "@app/providers/RouterProvier";
import { StoreProvider } from "@app/providers/StoreProvider";
import { ThemeProvider } from "@app/providers/ThemeProvider";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <StoreProvider>
      <RouterProvider>
        <ThemeProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </ThemeProvider>
      </RouterProvider>
    </StoreProvider>
  </ErrorBoundary>
);
