import type { Post } from "@blog/meta";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
  const posts: Array<Post> = await (await fetch(`/blog/drafts.json`)).json();
  return { posts };
};
