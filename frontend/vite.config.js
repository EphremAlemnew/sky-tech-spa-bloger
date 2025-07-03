import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { config as configDotenv } from "dotenv";

configDotenv(); // Load .env

export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: process.env.VITE_PORT ? parseInt(process.env.VITE_PORT) : 4000,
    watch: {
      usePolling: true,
    },
  },
});
