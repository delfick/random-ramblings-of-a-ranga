import { loader } from "@blog/meta";
import type { BlogMeta } from "@blog/meta";

export const { load, update } = loader((meta: BlogMeta): BlogMeta => {
  meta.title = "So what's with the resume layout?";
  meta.published = "June 2022";
  meta.tags = ["resume", "me"];
  meta.tldr =
    "My resume isn't a normal layout despite people keep on telling me recruiters won't read it";
  return meta;
});
