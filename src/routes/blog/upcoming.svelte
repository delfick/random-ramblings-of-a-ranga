<script lang="ts" context="module">
  import { dev } from "$app/env";
  import type { Post } from "@blog/meta";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch }) => {
    const posts: Array<Post> = await (await fetch(`/blog/drafts.json`)).json();
    return { props: { posts } };
  };
</script>

<script lang="ts">
  import Posts from "@blog/posts.svelte";

  export let posts: Array<Post>;
</script>

<Posts isupcoming={!dev} description="delfick's blog" {posts}
  >Upcoming Posts</Posts
>
