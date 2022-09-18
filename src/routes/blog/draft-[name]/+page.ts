import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => ({
  stuff: { base: "blog" },
  props: { name: params.name },
});
