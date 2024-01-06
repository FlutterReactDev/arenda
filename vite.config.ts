import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
const manifestForPlugIn: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
  manifest: {
    name: "Turak.kg",
    short_name: "turak.kg",
    description:
      "Turak.kg — сервис бронирования жилья: отели, квартиры посуточно, гостевые дома, коттеджи в частном секторе",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "/maskable_icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    theme_color: "#171717",
    background_color: "#f0e7db",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
  define: {
    _BASE_API_URL_: JSON.stringify("https://178.217.174.94/api"),
    _2GIS_KEY_: JSON.stringify("10153539-2026-4a0c-b7a3-52ddb3fed411"),
    _2GIS_API_URL_: JSON.stringify("https://catalog.api.2gis.com/3.0"),
    _2GIS_VALID_KEY_: JSON.stringify("demo"),

    _2GIS_REVIEW_API_URL_: JSON.stringify(
      `https://public-api.reviews.2gis.com/2.0`
    ),
    _2GIS_REVIEW_KEY_: JSON.stringify("37c04fe6-a560-4549-b459-02309cf643ad"),

    _2GIS_PHOTO_3V_API_: JSON.stringify("https://api.photo.2gis.com/3.0"),
    _2GIS_PHOTO_2V_API_: JSON.stringify("https://api.photo.2gis.com/2.0"),
    _2GIS_PHOTO_KEY_: JSON.stringify("gYu1s9N1wP"),
    _2GIS_PRODUCT_API_: JSON.stringify(
      " https://market-backend.api.2gis.ru/5.0/product"
    ),
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
