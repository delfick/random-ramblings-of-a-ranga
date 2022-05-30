import { loadWithStores, defineWritable } from "svelte-kit-isolated-stores";

export const meta = defineWritable(() => EmptyMeta);

export declare interface BlogMeta {
  title: string;
  tldr: string;
  tags: Array<string>;
  published: string;
}

export declare interface Post {
  meta: BlogMeta;
  path: string;
}

export const EmptyMeta = {
  title: "A blog",
  tldr: "Forgot to add meta to this post",
  published: "the past",
  tags: ["forgot-meta"],
};

export declare type BlogMetaUpdater = (m: BlogMeta) => BlogMeta;

export declare interface LoadExports {
  load: unknown;
  update: BlogMetaUpdater;
}

export const loader = (updater: BlogMetaUpdater): LoadExports => {
  const update = (meta: BlogMeta): BlogMeta => {
    return updater(meta);
  };

  const load = loadWithStores({ meta }, async ({ meta }) => {
    meta.update(update);
    return {};
  });

  return { update, load };
};
