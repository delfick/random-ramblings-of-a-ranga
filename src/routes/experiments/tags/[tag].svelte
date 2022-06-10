<script lang="ts" context="module">
  import type { Post } from "@blog/meta";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, params }) => {
    const tag = params.tag;
    const posts: Array<Post> = await (
      await fetch(`/experiments/posts.json`)
    ).json();
    return {
      props: {
        posts: posts.filter((post: Post) => post.meta.tags.includes(tag)),
        tag,
      },
    };
  };
</script>

<script lang="ts">
  import Posts from "@blog/posts.svelte";
  import TagPill from "@blog/tag_pill.svelte";

  export let tag: string;
  export let posts: Array<Post>;
</script>

<Posts description="#{tag} Experiments" {posts}>
  Experiments for <TagPill {tag} linkable={false} size="4xl" float={false} />
</Posts>
