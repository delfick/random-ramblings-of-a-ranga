<style lang="postcss">
  @reference "tailwindcss";

  @theme {
    --color-mint-500: oklch(0.72 0.11 178);
    --color-dark-green-tldr: #2a7715;
    --color-dark-back: #252525;
    --color-dark-front: #839495;
    --color-mark-back: #d19696;
    --color-mark-front: #fff;
    --color-mark-back-dark: #d19696;
    --color-mark-front-dark: #000;
    --color-blog-heading-dark: #8b8dff;
  }

  .blog-content {
    :global(p) {
      @apply py-4;
    }

    :global(a) {
      @apply text-blue-600 underline visited:text-purple-600 hover:text-blue-800;
    }

    :global(h2) {
      @apply mt-0 mb-2 pr-2 text-right font-mono text-4xl leading-tight font-bold;
      @apply border-r-8 border-indigo-500;
    }

    :global(blockquote) {
      @apply my-8 border-l-4 border-green-500 pl-8 italic md:pl-12;
    }

    :global(mark) {
      @apply inline-block rounded-md bg-mark-back pr-1 pl-1 text-base text-mark-front shadow-md;
    }

    :global(ul) {
      list-style: disc;
    }

    :global(ol) {
      list-style: decimal;
    }

    :global(.tight-list) {
      line-height: 0;
    }
  }

  :global(body.dark) {
    .blog-content {
      :global(mark) {
        @apply bg-mark-back-dark text-mark-front-dark;
      }
    }
    :global(h2) {
      @apply !border-blog-heading-dark;
    }
  }

  @media screen(md) {
    .blog-content {
      :global(blockquote) {
        @apply pl-12;
      }
    }
  }
</style>

<script lang="ts">
  import Heading from '@blog/heading.svelte'
  import PostTags from '@blog/post_tags.svelte'

  interface Props {
    tldr: string
    published: string
    tags: Array<string>
    title: string
    children?: import('svelte').Snippet
    base: string
  }

  let { base, tldr, published, tags, title, children }: Props = $props()
</script>

<div class="mx-auto w-full max-w-4xl pt-20 pb-5">
  <div class="blog-content text-l w-full px-4 leading-normal md:px-6">
    {#if tldr != ''}
      <Heading {title} {published} {tldr} />
    {/if}
    {@render children?.()}
  </div>

  <PostTags {base} {tags} {published} margin="0.5rem" />
</div>
