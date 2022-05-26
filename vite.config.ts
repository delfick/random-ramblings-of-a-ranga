import { svelte } from "@sveltejs/vite-plugin-svelte";
import preprocess from "svelte-preprocess";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({ preprocess: preprocess() }), eslint(), tsconfigPaths()],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
});
