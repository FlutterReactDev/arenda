import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    _BASE_API_URL_: JSON.stringify("https://178.217.174.94/api"),
    _2GIS_KEY_: JSON.stringify("10153539-2026-4a0c-b7a3-52ddb3fed411"),
  },
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "src/app"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@widgets": path.resolve(__dirname, "src/widgets"),
      "@entites": path.resolve(__dirname, "src/entites"),
      "@features": path.resolve(__dirname, "src/features"),
      "@shared": path.resolve(__dirname, "src/shared"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
});
