<script lang="ts">
  import Nav from "./_components/nav.svelte";
  import PageTransition from "@app/page_transition.svelte";
  import Transitionable from "@app/transitionable.svelte";
  import { page } from "@roxi/routify";
</script>

<svelte:body class="bg-gray-100 font-sans leading-normal tracking-normal" />

<Transitionable let:changeable refresh={$page.path}>
  {#if $page.path !== "/index"}
    <Nav {changeable} />
  {/if}

  <PageTransition refresh={$page.path} {changeable}>
    <slot />
  </PageTransition>
</Transitionable>
