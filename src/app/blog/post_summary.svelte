<script lang="ts">
  import type { Post } from "@blog/meta";
  import PostTags from "@blog/post_tags.svelte";

  export let post: Post;
  export let isupcoming = false;
</script>

<li>
  <div
    class="border-sky-200 border-2 mb-6 ml-2 mr-2 full-width min-w-0 p-4 !pb-0 bg-white rounded-lg dark:bg-gray-800 dark:shadow-dark-front"
  >
    <div class="font-bold text-l mb-2">
      {#if isupcoming}
        {post.meta.title}
      {:else}
        <a href={post.path}>{post.meta.title}</a>
      {/if}
    </div>
    <div class="px-4 py-2 mt-2 dark:text-white">
      {post.meta.tldr}
    </div>
    {#if post.meta.tags.length > 0 || post.meta.published != ""}
      <PostTags tags={post.meta.tags} published={post.meta.published} />
    {/if}
  </div>
</li>
