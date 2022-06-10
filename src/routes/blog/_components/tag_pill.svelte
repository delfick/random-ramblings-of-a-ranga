<script lang="ts">
  import { page } from "$app/stores";

  export let tag: string;
  export let float = true;
  export let size = "sm";
  export let linkable = true;

  // My text editor can't see app.d.ts and I can't figure out why
  interface Stuff {
    base: string;
  }

  const base = ($page.stuff as Stuff).base;
</script>

<svelte:element
  this={linkable ? "a" : "span"}
  {...linkable ? { href: `/${base}/tags/${encodeURIComponent(tag)}` } : {}}
>
  <span
    class="{float
      ? 'float-left'
      : ''} inline-block dark:bg-gray-200 bg-black rounded-full px-3 text-{size} font-semibold dark:text-gray-700 text-white mr-2"
    >#{tag}</span
  >
</svelte:element>
