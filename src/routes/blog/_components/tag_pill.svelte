<script lang="ts">
  export let tag: string;
  export let float = true;
  export let size = "sm";
  export let linkable = true;
</script>

<svelte:element
  this={linkable ? "a" : "span"}
  {...linkable ? { href: `/blog/tags/${encodeURIComponent(tag)}` } : {}}
>
  <span
    class="{float
      ? 'float-left'
      : ''} inline-block dark:bg-gray-200 bg-black rounded-full px-3 text-{size} font-semibold dark:text-gray-700 text-white mr-2"
    >#{tag}</span
  >
</svelte:element>
