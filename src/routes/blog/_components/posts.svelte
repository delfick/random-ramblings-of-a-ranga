<script lang="ts">
  import type { Post } from "@blog/meta";
  import PostSummary from "@blog/post_summary.svelte";

  export let description: string;
  export let posts: Array<Post>;
  export let noheading = false;
</script>

<svelte:head>
  <title>Random Ramblings of a Ranga</title>
  <meta name="description" content={description} />
  <meta name="author" content="Stephen Moore" />
</svelte:head>

<div class="w-full max-w-4xl mx-auto pt-20">
  {#if !noheading}
    <h2><slot /></h2>
  {/if}
  <div class="w-full max-w-4xl mx-auto pt-3">
    <ul>
      {#each [...posts].reverse() as post}
        <PostSummary {post} />
      {/each}
    </ul>
  </div>
</div>

<style lang="postcss">
  h2 {
    @apply leading-tight text-4xl mt-0 mb-2 pl-2 font-bold font-mono;
    @apply border-l-8 border-indigo-500;
  }

  :global(body.dark) {
    h2 {
      @apply !border-blog-heading-dark;
    }
  }
</style>
