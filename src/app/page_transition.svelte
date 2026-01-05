<script lang="ts">
  import { fade } from 'svelte/transition'

  interface Props {
    refresh: string
    children?: import('svelte').Snippet
  }

  let { refresh, children }: Props = $props()
  let duration = $derived(refresh == '/index' ? 0 : 200)
</script>

{#key refresh}
  <div in:fade|global={{ duration, delay: 500 }} out:fade|global={{ duration }}>
    {@render children?.()}
  </div>
{/key}
