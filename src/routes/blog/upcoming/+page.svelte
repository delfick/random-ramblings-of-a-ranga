<script lang="ts">
  import { dev } from "$app/environment";
  import type { PageData } from "./$types";
  import Posts from "@blog/posts.svelte";

  export let data: PageData;
  const posts = data.posts;
</script>

<Posts isupcoming={!dev} description="delfick's blog" {posts}>
  <span slot="default">Upcoming Posts</span>
  <div slot="noposts">
    <p>I haven't started any drafts. I don't recommend holding your breath!</p>
  </div>
</Posts>
