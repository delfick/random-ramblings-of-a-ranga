import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";

const config: UserConfig = {
  plugins: [sveltekit()],
  optimizeDeps: {
    exclude: ["svelte-kit-isolated-stores"],
  },
  ssr: {
    noExternal: ["svelte-kit-isolated-stores"],
  },
};

export default config;
