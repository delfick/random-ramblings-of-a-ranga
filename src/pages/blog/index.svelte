<script lang="ts">
  import { BlogMeta } from "./_components/meta";
  import { ClientNodeApi } from "./_components/post";
  import Posts from "./_components/posts.svelte";

  let title = (post: ClientNodeApi): string =>
    (post.meta as BlogMeta).title || "";
</script>

<div class="w-full max-w-4xl mx-auto pt-20">
  <Posts let:posts>
    <ul>
      {#each posts as post}
        <a href={post.path}>{title(post)}</a>
      {/each}
    </ul>
  </Posts>
</div>
