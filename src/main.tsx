import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "@app/App";
import { ThemeProvider } from "@app/providers/ThemeProvider";
import { StoreProvider } from "@app/providers/StoreProvider";
import { RouterProvider } from "@app/providers/RouterProvier";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StoreProvider>
    <RouterProvider>
      <ThemeProvider>
        <CookiesProvider defaultSetOptions={{ path: "/" }}>
          <App />
        </CookiesProvider>
      </ThemeProvider>
    </RouterProvider>
  </StoreProvider>
);
