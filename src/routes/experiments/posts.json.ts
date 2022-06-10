import { get as blogget } from "../blog/posts.json";
import type { RequestEvent } from "@sveltejs/kit";

export const get = async (event: RequestEvent) => {
  return await blogget(
    event,
    "experiments",
    import.meta.glob("./posts/**/*.svelte")
  );
};
