<script lang="ts">
  import type { PageData } from './$types'
  import Posts from '@blog/posts.svelte'

  interface Props {
    data: PageData
  }

  let { data }: Props = $props()
  const year = $derived(data.year)
  const month = $derived(data.month)
  const posts = $derived(data.posts)
  const base = $derived(data.base)
</script>

<Posts {base} description="delfick's blog posts from {month}, {year}" {posts}>
  Posts from {month}, {year}
</Posts>
