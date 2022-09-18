import { loader } from "@blog/meta";
import type { BlogMeta } from "@blog/meta";

export const { load, update } = loader((meta: BlogMeta): BlogMeta => {
  meta.title = "When you decide to make a blog";
  meta.published = "June 2022";
  meta.tags = ["blog"];
  meta.tldr =
    "I had some time so I went down a rabbit hole of how to add a static blog to my personal website and now I love sveltekit";
  return meta;
});
