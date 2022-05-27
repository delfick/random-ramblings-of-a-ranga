import preprocess from "svelte-preprocess";

const production = process.env.NODE_ENV === "production";

export default {
  preprocess: preprocess({ postcss: true }),
  emitCss: true,
  hot: !production,
};
