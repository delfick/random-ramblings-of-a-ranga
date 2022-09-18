import type { LayoutLoad } from "./$types";
import { EmptyMeta } from "@blog/meta";

export const load: LayoutLoad = async () => ({
  meta: { ...EmptyMeta },
  base: "blog",
});
