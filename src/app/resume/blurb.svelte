<style lang="scss">
  .blurb {
    :global(p) {
      padding-bottom: 0.6em;
    }
  }
</style>

<script lang="ts">
  import { marked } from 'marked'

  interface Props {
    source: string
  }

  let { source }: Props = $props()
</script>

<div class="blurb">
  {@html marked(source)}
</div>
