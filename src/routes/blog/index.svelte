<script lang="ts" context="module">
  import type { Post } from "@blog/meta";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch }) => {
    const posts: Array<Post> = await (await fetch(`/blog/posts.json`)).json();
    return { props: { posts } };
  };
</script>

<script lang="ts">
  import PostSummary from "@blog/post_summary.svelte";

  export let posts: Array<Post>;
</script>

<svelte:head>
  <title>Random Ramblings of a Ranga</title>
  <meta name="description" content="delfick's blog" />
  <meta name="author" content="Stephen Moore" />
</svelte:head>

<div class="w-full max-w-4xl mx-auto pt-20">
  <ul>
    {#each [...posts].reverse() as post}
      <PostSummary {post} />
    {/each}
  </ul>
</div>
