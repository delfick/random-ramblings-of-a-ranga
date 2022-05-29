<script lang="ts">
  import Nav from "./_components/nav.svelte";
  import PageTransition from "@app/page_transition.svelte";
  import { page } from "@roxi/routify";
</script>

<svelte:body class="bg-gray-100 font-sans leading-normal tracking-normal" />

{#if $page.path !== "/index"}
  <Nav />
{/if}

<PageTransition refresh={$page.path}>
  <slot />
</PageTransition>
