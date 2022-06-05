import adapter from "@sveltejs/adapter-netlify";
import preprocess from "svelte-preprocess";

const prod = process.env.NODE_ENV == "production";

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
    csp: {
      mode: prod ? "hash" : "auto",
      directives: {
        "base-uri": ["delfick.com"],
        "object-src": ["none"],
        "script-src": [
          "self",
          "http:",
          "https:",
          "unsafe-inline",
          "strict-dynamic",
        ],
      },
    },
  },
};
