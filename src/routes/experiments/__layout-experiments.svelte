<script context="module">
  import { loadWithStores } from "svelte-kit-isolated-stores";

  export const load = loadWithStores(({ url }) => ({
    props: { url },
    stuff: { base: "experiments" },
  }));
</script>

<script lang="ts">
  import "../layout.postcss";
  import PageTransition from "@app/page_transition.svelte";
  import Nav from "@blog/nav.svelte";

  export let url: URL;
</script>

<svelte:body class="bg-gray-100 font-sans leading-normal tracking-normal" />

{#if url.pathname !== "/index"}
  <Nav />
{/if}

<PageTransition refresh={url.pathname}>
  <slot />
</PageTransition>
