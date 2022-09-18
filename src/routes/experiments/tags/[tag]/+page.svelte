<script lang="ts">
  import type { PageData } from "./$types";
  import Posts from "@blog/posts.svelte";
  import TagPill from "@blog/tag_pill.svelte";

  export let data: PageData;
  let tag = data.tag;
  let posts = data.posts;
</script>

<Posts description="#{tag} Experiments" {posts}>
  Experiments for <TagPill {tag} linkable={false} size="4xl" float={false} />
</Posts>
