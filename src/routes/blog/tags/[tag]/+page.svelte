<script lang="ts">
  import type { PageData } from './$types'
  import Posts from '@blog/posts.svelte'
  import TagPill from '@blog/tag_pill.svelte'

  interface Props {
    data: PageData
  }

  let { data }: Props = $props()
  const tag = $derived(data.tag)
  const posts = $derived(data.posts)
  const base = $derived(data.base)
</script>

<Posts {base} description="#{tag} posts from delfick's blog" {posts}>
  Posts for <TagPill {base} {tag} linkable={false} size="4xl" float={false} />
</Posts>
