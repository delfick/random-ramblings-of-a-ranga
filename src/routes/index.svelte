<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";

  export const prerender = true;

  export const load: Load = async ({ url }) => ({
    props: { url },
  });
</script>

<script lang="ts">
  import "./layout.postcss";
  import PageTransition from "@app/page_transition.svelte";
  import avatar from "@assets/avatar.svg";
  import LinkedIn from "@blog/links/linkedin.svelte";
  import { onMount } from "svelte";

  export let url: URL;

  onMount(() => {
    document.body.className = "light";
  });
</script>

<svelte:head>
  <title>Random Ramblings of a Ranga</title>
</svelte:head>

<PageTransition refresh={url.pathname}>
  <main class="flex h-screen">
    <div class="grid grid-cols-1 gap-4 content-center m-auto">
      <div>
        <img
          src={avatar}
          style:display="inline"
          style:height="256px"
          alt="The delfick avatar"
        />
      </div>
      <div><p><a href="/blog">Blog</a></p></div>
      <div>
        <p><a target="_blank" href="https://github.com/delfick">Github</a></p>
      </div>
      <div><p><a href="/resume/engineer">Resume</a></p></div>
      <div>
        <p>
          <LinkedIn />
        </p>
      </div>
      <div><p><a href="/experiments">Experiments</a></p></div>
    </div>
  </main>
</PageTransition>

<style>
  p {
    text-align: center;
  }
</style>
