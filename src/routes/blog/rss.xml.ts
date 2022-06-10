import type { RequestHandler } from "@sveltejs/kit";
import type { Post } from "@blog/meta";
import { get as getposts } from "./posts.json";
import RSS from "rss";

export const get: RequestHandler = async () => {
  const posts: Array<Post> = (await getposts()).body;
  const headers = {
    "Cache-Control": "max-age=0, s-maxage=3600",
    "Content-Type": "application/xml",
  };
  const feed = new RSS({
    title: "Random Ramblings of a Ranga",
    description: "The blog for delfick",
    feed_url: "https://delfick.com/blog/rss.xml",
    site_url: "https://delfick.com/blog",
    image_url: "https://delfick.com/avatar_white.png",
    managingEditor: "Stephen Moore",
    webMaster: "Stephen Moore",
    copyright: "Stephen Moore",
    language: "en",
    categories: ["random", "technology", "personal"],
  });

  posts.forEach((post) =>
    feed.item({
      title: post.meta.title,
      description: post.meta.tldr,
      url: `https://delfick.com/${post.path}`,
      categories: post.meta.tags,
      date: post.date.toUTCString(),
    })
  );

  const body = feed.xml();

  return {
    headers,
    body,
  };
};
