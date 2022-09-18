import type { PageLoad } from "./$types";
import type { Post } from "@blog/meta";

export const load: PageLoad = async ({ fetch, params }) => {
  const posts: Array<Post> = await (await fetch(`/blog/posts.json`)).json();
  return {
    posts: posts.filter((post) =>
      post.path.startsWith(`/blog/posts/${params.year}/${params.month}/`)
    ),
    year: params.year,
    month: params.month,
  };
};
