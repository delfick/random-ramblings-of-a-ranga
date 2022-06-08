<script lang="ts">
  import type { Post } from "@blog/meta";
  import PostTags from "@blog/post_tags.svelte";

  export let post: Post;
</script>

<li>
  <div
    class="border-sky-200 border-2 mb-6 full-width min-w-0 p-4 !pb-0 bg-white rounded-lg dark:bg-gray-800 dark:shadow-dark-front"
  >
    <div class="font-bold text-xl mb-2">
      <a href={post.path}>{post.meta.title}</a>
    </div>
    <div class="px-4 py-2 mt-2 dark:text-white">
      {post.meta.tldr}
    </div>
    <PostTags tags={post.meta.tags} published={post.meta.published} />
  </div>
</li>
