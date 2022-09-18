<script lang="ts">
  import type { PageData } from "./$types";
  import Posts from "@blog/posts.svelte";

  export let data: PageData;
  const year = data.year;
  const posts = data.posts;
</script>

<Posts description="delfick's experiments from {year}" {posts}>
  Experiments from {year}
</Posts>
