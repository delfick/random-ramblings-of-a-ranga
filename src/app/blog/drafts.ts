import { EmptyMeta } from "@blog/meta";
import type { Post, BlogMeta, BlogMetaUpdater } from "@blog/meta";
import pathParse from "path-parse";

export type Module = {
    update: BlogMetaUpdater;
};

export const getter = async (
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
