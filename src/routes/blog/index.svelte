<script lang="ts" context="module">
  import type { Post } from "@blog/meta";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch }) => {
    const posts: Array<Post> = await (await fetch(`/blog/posts.json`)).json();
    return { props: { posts } };
  };
</script>

<script lang="ts">
  import Posts from "@blog/posts.svelte";

  export let posts: Array<Post>;
</script>

<Posts description="delfick's blog" {posts} noheading />
