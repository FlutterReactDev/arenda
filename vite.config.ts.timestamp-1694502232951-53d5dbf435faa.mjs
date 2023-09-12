// vite.config.ts
import { defineConfig } from "file:///C:/Users/User/arenda/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/User/arenda/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\User\\arenda";
var vite_config_default = defineConfig({
  plugins: [react()],
  define: {
    _BASE_API_URL_: JSON.stringify("https://178.217.174.94/api")
  },
  resolve: {
    alias: {
      "@app": path.resolve(__vite_injected_original_dirname, "src/app"),
      "@pages": path.resolve(__vite_injected_original_dirname, "src/pages"),
      "@widgets": path.resolve(__vite_injected_original_dirname, "src/widgets"),
      "@entites": path.resolve(__vite_injected_original_dirname, "src/entites"),
      "@features": path.resolve(__vite_injected_original_dirname, "src/features"),
      "@shared": path.resolve(__vite_injected_original_dirname, "src/shared"),
      "@assets": path.resolve(__vite_injected_original_dirname, "src/assets")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXGFyZW5kYVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcVXNlclxcXFxhcmVuZGFcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL1VzZXIvYXJlbmRhL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcclxuICBkZWZpbmU6IHtcclxuICAgIF9CQVNFX0FQSV9VUkxfOkpTT04uc3RyaW5naWZ5KFwiaHR0cHM6Ly8xNzguMjE3LjE3NC45NC9hcGlcIiksXHJcbiAgfSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICBcIkBhcHBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvYXBwXCIpLFxyXG4gICAgICBcIkBwYWdlc1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9wYWdlc1wiKSxcclxuICAgICAgXCJAd2lkZ2V0c1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyYy93aWRnZXRzXCIpLFxyXG4gICAgICBcIkBlbnRpdGVzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2VudGl0ZXNcIiksXHJcbiAgICAgIFwiQGZlYXR1cmVzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2ZlYXR1cmVzXCIpLFxyXG4gICAgICBcIkBzaGFyZWRcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvc2hhcmVkXCIpLFxyXG4gICAgICBcIkBhc3NldHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvYXNzZXRzXCIpLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzUCxTQUFTLG9CQUFvQjtBQUNuUixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBRmpCLElBQU0sbUNBQW1DO0FBSXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixRQUFRO0FBQUEsSUFDTixnQkFBZSxLQUFLLFVBQVUsNEJBQTRCO0FBQUEsRUFDNUQ7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLFFBQVEsS0FBSyxRQUFRLGtDQUFXLFNBQVM7QUFBQSxNQUN6QyxVQUFVLEtBQUssUUFBUSxrQ0FBVyxXQUFXO0FBQUEsTUFDN0MsWUFBWSxLQUFLLFFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQ2pELFlBQVksS0FBSyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUNqRCxhQUFhLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDbkQsV0FBVyxLQUFLLFFBQVEsa0NBQVcsWUFBWTtBQUFBLE1BQy9DLFdBQVcsS0FBSyxRQUFRLGtDQUFXLFlBQVk7QUFBQSxJQUNqRDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=