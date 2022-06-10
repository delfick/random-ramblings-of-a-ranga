<script lang="ts" context="module">
  import type { Post } from "@blog/meta";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, params }) => {
    const posts: Array<Post> = await (await fetch(`/blog/posts.json`)).json();
    return {
      props: {
        posts: posts.filter((post) =>
          post.path.startsWith(`/blog/posts/${params.year}/${params.month}/`)
        ),
        year: params.year,
        month: params.month,
      },
    };
  };
</script>

<script lang="ts">
  import Posts from "@blog/posts.svelte";

  export let year: string;
  export let month: string;
  export let posts: Array<Post>;
</script>

<Posts description="delfick's experiments from {month}, {year}" {posts}>
  Experiments from {month}, {year}
</Posts>
