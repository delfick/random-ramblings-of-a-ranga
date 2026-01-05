<script lang="ts">
  import type { PageData } from './$types'
  import Posts from '@blog/posts.svelte'
  import TagPill from '@blog/tag_pill.svelte'

  interface Props {
    data: PageData
  }

  let { data }: Props = $props()
  let tag = $derived(data.tag)
  let posts = $derived(data.posts)
  let base = $derived(data.base)
</script>

<Posts {base} description="#{tag} Experiments" {posts}>
  Experiments for <TagPill {base} {tag} linkable={false} size="4xl" float={false} />
</Posts>
