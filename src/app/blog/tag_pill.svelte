<script lang="ts">
  interface Props {
    tag: string
    float?: boolean
    size?: string
    linkable?: boolean
    base: string
  }

  let { base, tag, float = true, size = 'sm', linkable = true }: Props = $props()
</script>

<svelte:element
  this={linkable ? 'a' : 'span'}
  {...linkable ? { href: `/${base}/tags/${encodeURIComponent(tag)}` } : {}}
>
  <span
    class="{float
      ? 'float-left'
      : ''} inline-block rounded-full bg-black px-3 dark:bg-gray-200 text-{size} mr-2 font-semibold text-white dark:text-gray-700"
    >#{tag}</span
  >
</svelte:element>
