import { defineWritable, loadWithStores } from "svelte-kit-isolated-stores";
import type { Load } from "@sveltejs/kit";

export const meta = defineWritable(() => EmptyMeta);

export declare interface BlogMeta {
  title: string;
  tldr: string;
  author: string;
  tags: Array<string>;
  published: string;
}

export declare interface Post {
  meta: BlogMeta;
  date: Date;
  path: string;
}

export const EmptyMeta = {
  title: "A blog",
  tldr: "Forgot to add meta to this post",
  author: "Stephen Moore",
  published: "the past",
  tags: ["forgot-meta"],
};

export const UpcomingPost = {
  meta: {
    ...EmptyMeta,
    title: "Upcoming posts",
    tldr: "Any posts I haven't finished yet",
    published: "",
    tags: [],
  },
  date: new Date(),
  path: "/blog/upcoming",
};

export declare type BlogMetaUpdater = (m: BlogMeta) => BlogMeta;

export declare interface LoadExports {
  load: Load;
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
