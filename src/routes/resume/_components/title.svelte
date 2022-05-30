<script lang="ts">
  export let size = 0;
  export let color = "black";
  export let hide_overflow = false;

  $: component = `h${size || 1}`;
</script>

<svelte:element
  this={component}
  class="title {size === 0 ? '' : `is-${size}`}"
  style:color
  style:overflow={hide_overflow ? "hidden" : "auto"}
>
  <slot />
</svelte:element>
