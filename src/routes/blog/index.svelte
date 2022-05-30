<script lang="ts" context="module">
  import type { Post } from "./_components/meta";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch }) => {
    const posts: Array<Post> = await (await fetch(`/blog/posts.json`)).json();
    return { props: { posts } };
  };
</script>

<script lang="ts">
  export let posts: Array<Post>;
</script>

<div class="w-full max-w-4xl mx-auto pt-20">
  <ul>
    {#each posts as post}
      <li><a href={post.path}>{post.meta.title}</a></li>
    {/each}
  </ul>
</div>
