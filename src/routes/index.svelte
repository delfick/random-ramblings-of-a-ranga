<script lang="ts" context="module">
  export const prerender = true;
</script>

<script lang="ts">
  import "./layout.postcss";
  import avatar from "@assets/avatar.svg";
  import { onMount } from "svelte";

  onMount(() => {
    document.body.className = "light";
  });
</script>

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
    <div><p><a href="https://github.com/delfick">Github</a></p></div>
    <div><p><a href="https://www.linkedin.com/in/delfick">LinkedIn</a></p></div>
  </div>
</main>

<style>
  p {
    text-align: center;
  }
</style>
