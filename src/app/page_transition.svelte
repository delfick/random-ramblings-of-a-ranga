<script lang="ts">
  import { fade } from "svelte/transition";

  export let refresh: string;
  let duration = refresh == "/index" ? 0 : 200;
</script>

{#key refresh}
  <div in:fade={{ duration, delay: 500 }} out:fade={{ duration }}>
    <slot />
  </div>
{/key}
