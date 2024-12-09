import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist", // Dossier de sortie
    sourcemap: true, // Générer les fichiers de map
  },
  server: {
    port: 3000, // Port pour le dev server
  },
});
