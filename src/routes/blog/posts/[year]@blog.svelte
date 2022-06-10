<script lang="ts" context="module">
  import type { Post } from "@blog/meta";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, params }) => {
    const posts: Array<Post> = await (await fetch(`/blog/posts.json`)).json();
    return {
      props: {
        posts: posts.filter((post) =>
          post.path.startsWith(`/blog/posts/${params.year}/`)
        ),
        year: params.year,
      },
    };
  };
</script>

<script lang="ts">
  import Posts from "@blog/posts.svelte";

  export let year: string;
  export let posts: Array<Post>;
</script>

<Posts description="delfick's blog posts from {year}" {posts}>
  Posts from {year}
</Posts>
