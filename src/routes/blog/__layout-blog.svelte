<script context="module">
  import { loadWithStores } from "svelte-kit-isolated-stores";

  export const load = loadWithStores(({ url }) => ({ props: { url } }));
</script>

<script lang="ts">
  import "../layout.postcss";
  import Nav from "./_components/nav.svelte";
  import PageTransition from "@app/page_transition.svelte";

  export let url: URL;
</script>

<svelte:body class="bg-gray-100 font-sans leading-normal tracking-normal" />

{#if url.pathname !== "/index"}
  <Nav />
{/if}

<PageTransition refresh={url.pathname}>
  <slot />
</PageTransition>
