<script lang="ts">
  interface Props {
    size?: number
    color?: string
    hide_overflow?: boolean
    right?: boolean
    children?: import('svelte').Snippet
  }

  let {
    size = 0,
    color = 'black',
    hide_overflow = false,
    right = false,
    children
  }: Props = $props()

  let component = $derived(`h${size || 1}`)
</script>

<svelte:element
  this={component}
  class="title {size === 0 ? '' : 'is-4'}"
  style:text-align={right ? 'right' : 'auto'}
  style:color
  style:overflow={hide_overflow ? 'hidden' : 'auto'}
>
  {@render children?.()}
</svelte:element>
