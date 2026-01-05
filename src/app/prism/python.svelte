<script lang="ts">
  import Highlight from 'svelte-highlight'
  import python from 'svelte-highlight/languages/python'
  import atomOneLight from 'svelte-highlight/styles/atom-one-light'
  import atomOneDark from 'svelte-highlight/styles/atom-one-dark'
  import { mode } from 'mode-watcher'

  interface Props {
    source: string
  }

  let { source }: Props = $props()
</script>

<svelte:head>
  {#if mode.current == 'dark'}
    {@html atomOneDark}
  {:else}
    {@html atomOneLight}
  {/if}
</svelte:head>

<Highlight language={python} code={source} />
