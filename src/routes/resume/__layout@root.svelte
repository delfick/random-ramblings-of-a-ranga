<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {
    document.body.className = "light";
  });
</script>

<svelte:head>
  <title>Resume</title>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
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
