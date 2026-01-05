<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet
  }

  let { children }: Props = $props()
</script>

<blockquote
  class="my-4 border-s-4 border-gray-300 bg-gray-50 p-4 dark:border-gray-500 dark:bg-gray-800"
>
  <p class="text-l leading-relaxed font-medium text-gray-900 italic dark:text-white">
    {@render children?.()}
  </p>
</blockquote>
