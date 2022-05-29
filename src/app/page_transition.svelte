<script lang="ts">
  import { fade } from "svelte/transition";

  export let refresh: string;
  export let changeable: boolean;
  $: duration = refresh == "/index" ? 0 : 200;
</script>

{#if changeable}
  {#key refresh}
    <div in:fade={{ duration, delay: 500 }} out:fade={{ duration }}>
      <slot />
    </div>
  {/key}
{:else}
  <div out:fade={{ duration }}>
    <slot />
  </div>
{/if}
