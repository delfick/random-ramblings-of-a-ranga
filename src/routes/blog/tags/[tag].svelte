<script lang="ts" context="module">
  import type { Post } from "@blog/meta";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, params }) => {
    const tag = params.tag;
    const posts: Array<Post> = await (await fetch(`/blog/posts.json`)).json();
    return {
      props: {
        posts: posts.filter((post: Post) => post.meta.tags.includes(tag)),
        tag,
      },
    };
  };
</script>

<script lang="ts">
  import PostSummary from "@blog/post_summary.svelte";
  import TagPill from "@blog/tag_pill.svelte";

  export let tag: string;
  export let posts: Array<Post>;
</script>

<svelte:head>
  <title>Random Ramblings of a Ranga</title>
  <meta name="description" content="{tag} posts from delfick's blog" />
  <meta name="author" content="Stephen Moore" />
</svelte:head>

<div class="w-full max-w-4xl mx-auto pt-20">
  <h2>Posts for <TagPill {tag} linkable={false} size="4xl" float={false} /></h2>
  <div class="w-full max-w-4xl mx-auto pt-3">
    <ul>
      {#each [...posts].reverse() as post}
        <PostSummary {post} />
      {/each}
    </ul>
  </div>
</div>

<style lang="postcss">
  h2 {
    @apply leading-tight text-4xl mt-0 mb-2 pl-2 font-bold font-mono;
    @apply border-l-8 border-indigo-500;
  }

  :global(body.dark) {
    h2 {
      @apply !border-blog-heading-dark;
    }
  }
</style>
