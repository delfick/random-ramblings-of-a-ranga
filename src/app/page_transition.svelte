<script>
  import { fade } from "svelte/transition";
  export let refresh = "";

  $: duration = refresh == "/index" ? 0 : 200;
</script>

{#key refresh}
  <div
    in:fade={{ duration: duration, delay: 500 }}
    out:fade={{ duration: duration }}
  >
    <slot />
  </div>
{/key}
