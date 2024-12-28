<script lang="ts">
  import TLDR from "@blog/tldr.svelte";

  export let tldr: string;
  export let title: string;
  export let published: string;
</script>

<div class="font-sans">
  <h1 class="font-bold font-sans break-normal pt-6 pb-2 text-3xl md:text-4xl">
    {title}
  </h1>

  <TLDR>{tldr}</TLDR>

  <p class="text-right !pt-0 text-sm md:text-base font-normal">
    Published <strong>{published}</strong> - Stephen Moore
  </p>
</div>
