<style lang="postcss" global>
  @reference "tailwindcss";

  .emphasis strong {
    @apply text-shadow-lg text-shadow-orange-100;
  }

  :global(body.dark) {
    .emphasis strong {
      @apply text-orange-200 text-shadow-black;
    }
  }
</style>

<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet
  }

  let { children }: Props = $props()
</script>

<span class="emphasis">
  <strong>{@render children?.()}</strong>
</span>
