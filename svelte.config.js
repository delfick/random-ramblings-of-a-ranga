import adapter from "@sveltejs/adapter-netlify";
import preprocess from "svelte-preprocess";

export default {
  preprocess: preprocess({ postcss: true }),
  kit: {
    adapter: adapter(),
    prerender: { default: false },
    alias: {
      "@app": "src/app",
      "@assets": "src/assets",
    },
    vite: {
      optimizeDeps: {
        exclude: ["svelte-kit-isolated-stores"],
      },
      ssr: {
        noExternal: ["svelte-kit-isolated-stores"],
      },
    },
  },
};
