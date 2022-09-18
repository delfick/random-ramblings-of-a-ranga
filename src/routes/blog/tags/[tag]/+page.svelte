<script lang="ts">
  import type { PageData } from "./$types";
  import Posts from "@blog/posts.svelte";
  import TagPill from "@blog/tag_pill.svelte";

  export let data: PageData;
  const tag = data.tag;
  const posts = data.posts;
</script>

<Posts description="#{tag} posts from delfick's blog" {posts}>
  Posts for <TagPill {tag} linkable={false} size="4xl" float={false} />
</Posts>
