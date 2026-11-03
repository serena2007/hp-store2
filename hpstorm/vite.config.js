import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// "base" doit être le nom exact du dépôt GitHub, entre deux "/"
export default defineConfig({
  plugins: [react()],
  base: "/hp-store2/",
});