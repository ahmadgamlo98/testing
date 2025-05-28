import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      components: "/src/components",
      lib: "/src/lib",
      utils: "/src/utils"
    }
  },
  server: {
    port: 3000
  },
  preview: {
    port: 3000
  },
  plugins: [
    react({
      babel: {
        plugins: ["styled-components"]
      }
    })
  ]
});
