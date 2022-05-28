<script lang="ts">
  import TLDR from "../_components/tldr.svelte";

  export let tldr: string;
  export let title: string;
  export let published: string;
</script>

<div class="font-sans">
  <h1
    class="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl"
  >
    {title}
  </h1>

  <TLDR>{tldr}</TLDR>

  <p class="text-right !pt-0 text-sm md:text-base font-normal text-gray-600">
    Published <strong>{published}</strong> - Stephen Moore
  </p>
</div>
