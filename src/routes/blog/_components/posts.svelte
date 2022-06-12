<script lang="ts">
  import RSS from "@assets/brands/rss.png";
  import type { Post } from "@blog/meta";
  import { UpcomingPost } from "@blog/meta";
  import PostSummary from "@blog/post_summary.svelte";

  export let description: string;
  export let posts: Array<Post>;
  export let noheading = false;
  export let rss = false;
  export let isupcoming = false;
  export let showupcoming = false;
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
  {#if rss}
    <h2>
      <a href="/blog/rss.xml" target="_blank"
        ><img
          class="rss ml-1 mr-3"
          style:display="inline"
          style="padding-bottom: 6px"
          src={RSS}
          alt="The RSS icon"
          width="30px"
          height="30px"
        /></a
      >Blog
    </h2>
  {/if}
  <div class="w-full max-w-4xl mx-auto pt-3">
    <ul>
      {#if showupcoming}
        <PostSummary post={UpcomingPost} />
      {/if}
      {#each [...posts].reverse() as post}
        <PostSummary {post} {isupcoming} />
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

    .rss {
      filter: invert(1) opacity(0.5) drop-shadow(0 0 0 red);
    }
  }
</style>
