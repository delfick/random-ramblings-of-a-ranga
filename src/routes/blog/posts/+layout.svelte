<script lang="ts">
  import type { PageData } from './$types'
  import FullPost from '@blog/full_post.svelte'
  import { meta as m } from '@blog/meta'
  interface Props {
    children?: import('svelte').Snippet
    data: PageData
  }

  let { children, data }: Props = $props()
  let base = $derived(data.base)
</script>

<svelte:head>
  <title>{$m.title} - Random Ramblings of a Ranga</title>
  <meta name="description" content={$m.tldr} />
  <meta name="author" content={$m.author} />
</svelte:head>

<FullPost {base} tldr={$m.tldr} published={$m.published} tags={$m.tags} title={$m.title}>
  {@render children?.()}
</FullPost>
