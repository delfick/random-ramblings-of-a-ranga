import pathParse from "path-parse";

import { EmptyMeta } from "./_components/meta";
import type { Post, BlogMeta } from "./_components/meta";

export const get = async () => {
  const allPostFiles = import.meta.glob("./posts/**/*.svelte");
  const iterablePostFiles = Object.entries(allPostFiles);

  const allPosts: Array<Post> = [];

  await Promise.all(
    iterablePostFiles.map(async ([p, resolver]) => {
      const resolved = await resolver();

      const parsed = pathParse(p);

      if (!resolved.update || parsed.name == "__layout") {
        return;
      }

      const meta: BlogMeta = { ...resolved.update(EmptyMeta) };

      allPosts.push({
        meta,
        path: `/blog/${parsed.dir.substring(2)}/${parsed.name}`,
      });
    })
  );

  const compare = (p1: Post, p2: Post): number => {
    const numbered = (path: string): string =>
      path.replace(
        /(jan|feb|march|april|may|june|july|august|september|october|november|december)/,
        (_, month: string) =>
          String(
            {
              jan: 1,
              feb: 2,
              march: 3,
              april: 4,
              may: 5,
              june: 6,
              july: 7,
              august: 8,
              september: 9,
              october: 10,
              november: 11,
              december: 12,
            }[month] || "0"
          )
      );

    const path1 = numbered(p1?.path || "");
    const path2 = numbered(p2?.path || "");
    return path1.localeCompare(path2) || 0;
  };

  return { body: allPosts.filter((p) => p != null).sort(compare) };
};
