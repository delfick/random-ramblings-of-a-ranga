<script lang="ts" context="module">
  import { loadWithStores } from "svelte-kit-isolated-stores";

  export const load = loadWithStores();
</script>

<script lang="ts">
  import Heading from "../_components/heading.svelte";
  import { meta } from "../_components/meta";
  import Tags from "../_components/tags.svelte";
</script>

<div class="w-full max-w-4xl mx-auto pt-20">
  <div
    class="blog-content w-full px-4 md:px-6 text-xl leading-normal"
    style="font-family:Georgia,serif;"
  >
    {#if $meta.tldr != ""}
      <Heading
        title={$meta.title}
        published={$meta.published}
        tldr={$meta.tldr}
      />
    {/if}
    <slot />
  </div>

  <hr class="border-b-2 border-gray-400 mx-4" />

  <Tags tags={$meta.tags} />
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
