<script lang="ts">
  import Heading from "@blog/heading.svelte";
  import PostTags from "@blog/post_tags.svelte";

  export let tldr: string;
  export let published: string;
  export let tags: Array<string>;
  export let title: string;
</script>

<div class="w-full max-w-4xl mx-auto pt-20 pb-5">
  <div
    class="blog-content w-full px-4 md:px-6 text-xl leading-normal"
    style="font-family:Georgia,serif;"
  >
    {#if tldr != ""}
      <Heading {title} {published} {tldr} />
    {/if}
    <slot />
  </div>

  <PostTags {tags} {published} margin="0.5rem" />
</div>

<style lang="postcss">
  .blog-content {
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

    :global(ul) {
      list-style: disc;
    }
  }

  :global(body.dark) {
    .blog-content {
      :global(mark) {
        @apply text-mark-front-dark bg-mark-back-dark;
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
