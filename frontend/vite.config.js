import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  server: {
    host: "0.0.0.0", // Bind to all network interfaces
    port: process.env.PORT ? parseInt(process.env.PORT) : 4000, // Use the PORT env variable or default to 5173
    watch: {
      usePolling: true,
    },
  },
});
