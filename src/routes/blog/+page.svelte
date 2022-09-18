<script lang="ts">
  import type { PageData } from "./$types";
  import Posts from "@blog/posts.svelte";

  export let data: PageData;
  const posts = data.posts;
</script>

<Posts description="delfick's blog" {posts} noheading rss showupcoming />
