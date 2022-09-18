<script lang="ts">
  import "../layout.postcss";
  import type { PageData } from "./$types";
  import PageTransition from "@app/page_transition.svelte";
  import Nav from "@blog/nav.svelte";
  import ThemeToggle from "@blog/theme_toggle.svelte";

  export let data: PageData;
  let pathname: string;
  $: pathname = data.pathname;
</script>

<svelte:body class="bg-gray-100 font-sans leading-normal tracking-normal" />

{#if pathname !== "/index"}
  <Nav />
{/if}

<ThemeToggle hidden />

<PageTransition refresh={pathname}>
  <slot />
</PageTransition>
