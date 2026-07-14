import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // The frontend never talks to the backend origin directly in dev —
    // Vite proxies /api to Express, so no CORS configuration is needed.
    proxy: {
      "/api": "http://localhost:4000",
    },
  },
});
