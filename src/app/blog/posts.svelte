<style lang="postcss">
  @reference "tailwindcss";

  @theme {
    --color-blog-heading-dark: #8b8dff;
  }

  h2 {
    @apply mt-0 mb-2 pl-2 font-mono text-4xl leading-tight font-bold;
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

<script lang="ts">
  import RSS from '@assets/brands/rss.png'
  import type { Post } from '@blog/meta'
  import PostSummary from '@blog/post_summary.svelte'

  interface Props {
    base: string
    description: string
    posts: Array<Post>
    noheading?: boolean
    rss?: boolean
    children?: import('svelte').Snippet
    noposts?: import('svelte').Snippet
  }

  let {
    base,
    description,
    posts,
    noheading = false,
    rss = false,
    children,
    noposts
  }: Props = $props()
</script>

<svelte:head>
  <title>Random Ramblings of a Ranga</title>
  <meta name="description" content={description} />
  <meta name="author" content="Stephen Moore" />
</svelte:head>

<div class="mx-auto w-full max-w-4xl pt-20">
  {#if !noheading}
    <h2>{@render children?.()}</h2>
  {/if}
  {#if rss}
    <h2>
      <a href="/blog/rss.xml" target="_blank">
        <img
          class="rss mr-3 ml-1"
          style:display="inline"
          style="padding-bottom: 6px"
          src={RSS}
          alt="The RSS icon"
          width="30px"
          height="30px"
        />
      </a>
      Blog
    </h2>
  {/if}
  {#if posts.length > 0}
    <div class="mx-auto w-full max-w-4xl pt-3">
      <ul>
        {#each [...posts] as post (post.path)}
          <PostSummary {base} {post} />
        {/each}
      </ul>
    </div>
  {:else}
    {@render noposts?.()}
  {/if}
</div>
