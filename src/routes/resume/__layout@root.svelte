<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {
    document.body.className = "light";
  });
</script>

<svelte:head>
  <title>Resume</title>
  <meta name="description" content="My resume" />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css"
  />
</svelte:head>

<slot />

<style lang="postcss">
  @page {
    size: auto;
    margin: 0;
    margin-top: 5mm;
  }
</style>
