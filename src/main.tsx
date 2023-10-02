import ReactDOM from "react-dom/client";
import { App } from "@app/App";
import { ThemeProvider } from "@app/providers/ThemeProvider";
import { StoreProvider } from "@app/providers/StoreProvider";
import { RouterProvider } from "@app/providers/RouterProvier";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StoreProvider>
    <RouterProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </RouterProvider>
  </StoreProvider>
);
