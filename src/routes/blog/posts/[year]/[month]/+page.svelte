<script lang="ts">
  import type { PageData } from "./$types";
  import Posts from "@blog/posts.svelte";

  export let data: PageData;
  const year = data.year;
  const month = data.month;
  const posts = data.posts;
</script>

<Posts description="delfick's blog posts from {month}, {year}" {posts}>
  Posts from {month}, {year}
</Posts>
