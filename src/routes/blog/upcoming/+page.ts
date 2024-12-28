import type { PageLoad } from "./$types";
import type { Post } from "@blog/meta";

export const load: PageLoad = async ({ fetch }) => {
  const posts: Array<Post> = await (await fetch(`/blog/drafts.json`)).json();
  return { posts };
};
