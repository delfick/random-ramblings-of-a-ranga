<style lang="scss">
  li::before {
    content: '\2022';
    color: #b01919;
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
</style>

<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet
  }

  let { children }: Props = $props()
</script>

<li>{@render children?.()}</li>
