<script lang="ts" context="module">
  import type { Post } from "./_components/meta";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch }) => {
    const posts: Array<Post> = await (await fetch(`/blog/posts.json`)).json();
    return { props: { posts } };
  };
</script>

<script lang="ts">
  import PostTags from "@blog/post_tags.svelte";

  export let posts: Array<Post>;
</script>

<svelte:head>
  <title>Random Ramblings of a Ranga</title>
  <meta name="description" content="delfick's blog" />
  <meta name="author" content="Stephen Moore" />
</svelte:head>

<div class="w-full max-w-4xl mx-auto pt-20">
  <ul>
    {#each [...posts].reverse() as post}
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
    {/each}
  </ul>
</div>
