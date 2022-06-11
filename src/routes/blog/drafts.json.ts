import pathParse from "path-parse";

import { EmptyMeta } from "./_components/meta";
import type { Post, BlogMeta, BlogMetaUpdater } from "./_components/meta";
import type { RequestEvent } from "@sveltejs/kit";

type Module = {
  update: BlogMetaUpdater;
};

export const get = async (
  _: RequestEvent,
  base: string,
  allposts: Record<string, () => Promise<Module>>
) => {
  if (!base) {
    base = "blog";
  }
  if (!allposts) {
    allposts = import.meta.glob("./_drafts/*.svelte");
  }
  const iterablePostFiles = Object.entries(allposts);

  const allPosts: Array<Post> = [];

  await Promise.all(
    iterablePostFiles.map(async ([p, resolver]) => {
      const resolved = (await resolver()) as Module;

      const parsed = pathParse(p);

      if (!resolved.update || parsed.name == "__layout") {
        return;
      }

      const meta: BlogMeta = { ...resolved.update(EmptyMeta) };
      const path = `/blog/draft-${parsed.name}`;

      allPosts.push({
        meta,
        path,
        date: new Date("Jan, 2069"),
      });
    })
  );

  const compare = (p1: Post, p2: Post): number => {
    return (p1?.path || "").localeCompare(p2?.path || "") || 0;
  };

  return { body: allPosts.filter((p) => p != null).sort(compare) };
};
