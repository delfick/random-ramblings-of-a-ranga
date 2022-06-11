<script lang="ts" context="module">
  import { loadWithStores } from "svelte-kit-isolated-stores";

  export const load = loadWithStores(({ params }) => ({
    stuff: { base: "blog" },
    props: { name: params.name },
  }));
</script>

<script lang="ts">
  import { dev } from "$app/env";
  import FullPost from "@blog/full_post.svelte";
  import { meta as m, EmptyMeta } from "@blog/meta";
  import type { BlogMeta } from "@blog/meta";
  import { onMount } from "svelte";
  import type { SvelteComponent } from "svelte";

  export let name: string;

  let Post: SvelteComponent;
  let meta: BlogMeta;

  onMount(async () => {
    let mod = await import(`./_drafts/${name}.svelte`);
    Post = mod.default;
    let m = EmptyMeta;
    mod.update(m);
    meta = m;
  });
</script>

<svelte:head>
  <title>Draft - {$m.title} - Random Ramblings of a Ranga</title>
  <meta name="description" content={$m.tldr} />
  <meta name="author" content={$m.author} />
</svelte:head>

{#if meta}
  <FullPost
    tldr={meta.tldr}
    published={meta.published}
    tags={meta.tags}
    title={meta.title}
  >
    {#if dev && Post}
      <svelte:component this={Post} />
    {/if}
  </FullPost>
{/if}
