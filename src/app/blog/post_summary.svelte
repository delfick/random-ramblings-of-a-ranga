<script lang="ts">
  import type { Post } from '@blog/meta'
  import PostTags from '@blog/post_tags.svelte'

  interface Props {
    base: string
    post: Post
  }

  let { post, base }: Props = $props()
</script>

<li>
  <div
    class="full-width mr-2 mb-6 ml-2 min-w-0 rounded-lg border-2 border-sky-200 bg-white p-4 !pb-0 dark:bg-gray-800 dark:shadow-dark-front"
  >
    <div class="text-l mb-2 font-bold">
      <a href={post.path}>{post.meta.title}</a>
    </div>
    <div class="mt-2 px-4 py-2 dark:text-white">
      {post.meta.tldr}
    </div>
    {#if post.meta.tags.length > 0 || post.meta.published != ''}
      <PostTags {base} tags={post.meta.tags} published={post.meta.published} />
    {/if}
  </div>
</li>
