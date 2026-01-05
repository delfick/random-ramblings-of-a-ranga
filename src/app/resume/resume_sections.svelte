<style lang="scss">
  .resume-sections {
    :global(p) {
      padding-bottom: 0.6em;
    }
  }
</style>

<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet
  }

  let { children }: Props = $props()
</script>

<div class="resume-sections">{@render children?.()}</div>
