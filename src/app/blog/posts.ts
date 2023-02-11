import { EmptyMeta } from "@blog/meta";
import type { Post, BlogMeta, BlogMetaUpdater } from "@blog/meta";
import pathParse from "path-parse";

export type Module = {
  update: BlogMetaUpdater;
};

export const getter = async (
  base: string,
  allposts: Record<string, () => Promise<Module>>
) => {
  const iterablePostFiles = Object.entries(allposts);

  const allPosts: Array<Post> = [];

  await Promise.all(
    iterablePostFiles.map(async ([p, resolver]) => {
      const resolved = (await resolver()) as Module;

      const parsed = pathParse(p);

      if (!resolved.update || parsed.name == "+layout") {
        return;
      }

      const meta: BlogMeta = { ...resolved.update(EmptyMeta) };
      const path = `/${base}${parsed.dir.substring(2)}`;
      const match =
        new RegExp(`/${base}/posts/([^/]+)/([^/]+)/([^-]+).+`).exec(path) || [];

      allPosts.push({
        meta,
        path,
        date: new Date(`${match[1]}-${match[2]}-${match[3]}`),
      });
    })
  );

  const compare = (p1: Post, p2: Post): number => {
    const numbered = (path: string): string =>
      path.replace(
        /(january|february|march|april|may|june|july|august|september|october|november|december)/,
        (_, month: string) =>
          String(
            {
              january: 1,
              february: 2,
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

  return { body: allPosts.filter((p) => p != null).sort(compare).reverse() };
};
