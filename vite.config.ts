import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";
import { defineConfig, Plugin } from "vite";
import viteMainJs from "vite-main-js";
import eslint from "vite-plugin-eslint";
import tsconfigPaths from "vite-tsconfig-paths";

interface ReturnPlugin {
  (): Plugin;
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    dedupe: ["@roxi/routify"],
    alias: {
      "@app": path.resolve(__dirname, "./src/app"),
    },
  },
  plugins: [
    (viteMainJs as ReturnPlugin)(),
    svelte(),
    eslint(),
    tsconfigPaths(),
  ],
  build: {
    polyfillModulePreload: false,
    cssCodeSplit: true,
  },
  optimizeDeps: {
    exclude: ["@roxi/routify"],
  },
});
