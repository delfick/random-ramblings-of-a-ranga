<style lang="postcss" global>
  @tailwind base;

  @tailwind utilities;
</style>

<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet
  }

  let { children }: Props = $props()
</script>

<div
  class="full-width mb-6 min-w-0 rounded-lg border-2 border-sky-200 bg-white p-4 shadow-lg dark:bg-gray-800 dark:shadow-dark-front"
>
  <div class="mt-2 px-4 py-2 dark:text-white">
    <div
      class="inline rounded-lg bg-emerald-100 px-3 py-1 shadow-2xl dark:bg-dark-green-tldr"
    >
      tldr
    </div>
    {@render children?.()}
  </div>
</div>
