<script lang="ts">
  import type { PageData } from './$types'
  import Posts from '@blog/posts.svelte'

  interface Props {
    data: PageData
  }

  let { data }: Props = $props()
  let posts = $derived(data.posts)
  let base = $derived(data.base)
</script>

<Posts {base} description="delfick's blog" {posts} noheading rss />
