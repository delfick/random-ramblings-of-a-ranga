<script lang="ts" context="module">
  import { loader } from "@blog/meta";
  import type { BlogMeta } from "@blog/meta";

  export const { load, update } = loader((meta: BlogMeta): BlogMeta => {
    meta.title = "A test entry to delete";
    meta.published = "Feb 2023";
    meta.tags = ["test", "other"];
    meta.tldr = "I need multiple posts for making some features";
    return meta;
  });
</script>

<p>*insert <mark>wise</mark> words here*</p>
