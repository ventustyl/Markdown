import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/markdown/", // Définit le chemin de base
  build: {
    outDir: "dist", // Dossier de sortie pour les fichiers buildés
    sourcemap: true, // Générer les fichiers de map (optionnel)
  },
  server: {
    port: 3000, // Définit le port pour le serveur local
  },
});
