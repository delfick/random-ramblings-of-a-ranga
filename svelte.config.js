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
    csp: {
      mode: "hash",
      directives: {
        "base-uri": ["delfick.com"],
        "object-src": ["none"],
        "script-src": [
          "self",
          "http:",
          "https:",
          "unsafe-inline",
          "strict-dynamic",
          // The inline script in app.html
          "sha256-gXWcBjQNffL0O67LvUwpJnqKB3MfAwAXIKj4/oEk2v4=",
        ],
      },
    },
  },
};
