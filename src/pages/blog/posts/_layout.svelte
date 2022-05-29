<script lang="ts">
  import Heading from "../_components/heading.svelte";
  import { BlogMeta } from "../_components/meta";
  import Tags from "../_components/tags.svelte";
  import { page } from "@roxi/routify";

  let title = $page.title;
  let tldr = ($page.meta as BlogMeta).tldr || "";
  let published = ($page.meta as BlogMeta).published || "";
  let tags: Array<string> = ($page.meta as BlogMeta).tags || [];
</script>

<div class="w-full max-w-4xl mx-auto pt-20">
  <div
    class="blog-content w-full px-4 md:px-6 text-xl leading-normal"
    style="font-family:Georgia,serif;"
  >
    {#if tldr != ""}
      <Heading {title} {published} {tldr} />
    {/if}
    <slot />
  </div>

  <hr class="border-b-2 border-gray-400 mx-4" />

  <Tags {tags} />
</div>

<style lang="postcss">
  .blog-content {
    :global(p) {
      @apply py-6;
    }

    :global(blockquote) {
      @apply border-l-4 border-green-500 italic my-8 pl-8 md:pl-12;
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
