import sveltePreprocess from "svelte-preprocess";

export default {
  preprocess: [
    sveltePreprocess({
      scss: {
        prependData: '@use "src/variables.scss" as *;',
      },
    }),
  ],
};
