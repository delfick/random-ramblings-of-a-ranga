<script lang="ts">
  import Markdown from "svelte-markdown";

  export let source: string;
</script>

<div class="blurb">
  <Markdown {source} />
</div>

<style lang="scss">
  .blurb {
    :global(p) {
      padding-bottom: 0.6em;
    }
  }
</style>
