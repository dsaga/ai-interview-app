import { defineConfig } from "vite";
import commonjs from "@rollup/plugin-commonjs";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  envDir: ".",
  plugins: [react()],
  build: {
    rollupOptions: {
      plugins: [
        commonjs()
      ],
    }
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
