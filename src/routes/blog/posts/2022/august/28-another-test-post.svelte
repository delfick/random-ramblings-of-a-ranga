<script lang="ts" context="module">
  import { loader } from "@blog/meta";
  import type { BlogMeta } from "@blog/meta";

  export const { load, update } = loader((meta: BlogMeta): BlogMeta => {
    meta.title = "Fantastical test post";
    meta.published = "August 2022";
    meta.tags = ["test", "one", "two"];
    meta.tldr = "I need even more posts for making this blog awesome";
    return meta;
  });
</script>

<p>*insert less <mark>wise</mark> words here*</p>
