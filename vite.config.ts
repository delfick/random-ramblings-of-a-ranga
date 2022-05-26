import { svelte } from "@sveltejs/vite-plugin-svelte";
import viteMainJs from "vite-main-js";
import preprocess from "svelte-preprocess";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
import { defineConfig, Plugin } from "vite";
import eslint from "vite-plugin-eslint";
import tsconfigPaths from "vite-tsconfig-paths";

const production = process.env.NODE_ENV === "production";

interface ReturnPlugin {
  (): Plugin;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    (viteMainJs as ReturnPlugin)(),
    svelte({
      preprocess: preprocess(),
      emitCss: true,
      hot: !production,
    }),
    eslint(),
    tsconfigPaths(),
  ],
  build: {
    polyfillModulePreload: false,
    cssCodeSplit: false,
  },
  optimizeDeps: {
    exclude: ["@roxi/routify"],
  },
  resolve: {
    dedupe: ["@roxi/routify"],
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
});
