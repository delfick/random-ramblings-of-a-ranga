import { loader } from "@blog/meta";
import type { BlogMeta } from "@blog/meta";

export const { load, update } = loader((meta: BlogMeta): BlogMeta => {
  meta.title = "Making pytest Fixture Factories";
  meta.published = "Februrary 2023";
  meta.tags = ["pytest", "python"];
  meta.tldr =
    "It's possible to make pytest fixture factories that are flexible, capable and easier to keep track of.";
  return meta;
});
