import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: "0.0.0.0", 
    port: 5173,
    allowedHosts: true
  },
  preview: {
    host: "0.0.0.0", 
    port: 4173,
    allowedHosts: true
  },
});
