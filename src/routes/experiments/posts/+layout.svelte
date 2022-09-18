<script lang="ts">
  import Heading from "@blog/heading.svelte";
  import { meta as m } from "@blog/meta";
  import PostTags from "@blog/post_tags.svelte";
</script>

<svelte:head>
  <title>{$m.title} - Random Ramblings of a Ranga</title>
  <meta name="description" content={$m.tldr} />
  <meta name="author" content={$m.author} />
</svelte:head>

<div class="w-full max-w-4xl mx-auto pt-20 pb-5">
  <div
    class="experiment-content w-full px-4 md:px-6 text-xl leading-normal"
    style="font-family:Georgia,serif;"
  >
    {#if $m.tldr != ""}
      <Heading title={$m.title} published={$m.published} tldr={$m.tldr} />
    {/if}
    <slot />
  </div>

  <PostTags tags={$m.tags} published={$m.published} margin="0.5rem" />
</div>

<style lang="postcss">
  .experiment-content {
    :global(p) {
      @apply py-4;
    }

    :global(h2) {
      @apply leading-tight text-4xl mt-0 mb-2 pr-2 text-right font-bold font-mono;
      @apply border-r-8 border-indigo-500;
    }

    :global(blockquote) {
      @apply border-l-4 border-green-500 italic my-8 pl-8 md:pl-12;
    }

    :global(mark) {
      @apply inline-block pr-1 pl-1 text-base text-mark-front bg-mark-back rounded-md shadow-md bg-opacity-100;
    }
  }

  :global(body.dark) {
    .experiment-content {
      :global(mark) {
        @apply text-mark-front-dark bg-mark-back-dark;
      }
    }
    :global(h2) {
      @apply !border-blog-heading-dark;
    }
  }

  @media screen(md) {
    .experiment-content {
      :global(blockquote) {
        @apply pl-12;
      }
    }
  }
</style>
