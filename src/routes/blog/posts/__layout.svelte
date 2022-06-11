<script lang="ts" context="module">
  import { loadWithStores } from "svelte-kit-isolated-stores";

  export const load = loadWithStores(() => ({
    stuff: { base: "blog" },
  }));
</script>

<script lang="ts">
  import FullPost from "@blog/full_post.svelte";
  import { meta as m } from "@blog/meta";
</script>

<svelte:head>
  <title>{$m.title} - Random Ramblings of a Ranga</title>
  <meta name="description" content={$m.tldr} />
  <meta name="author" content={$m.author} />
</svelte:head>

<FullPost
  tldr={$m.tldr}
  published={$m.published}
  tags={$m.tags}
  title={$m.title}
/>
