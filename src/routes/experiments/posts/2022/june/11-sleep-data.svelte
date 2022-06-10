<script lang="ts" context="module">
  import { loader } from "@blog/meta";
  import type { BlogMeta } from "@blog/meta";

  export const { load, update } = loader((meta: BlogMeta): BlogMeta => {
    meta.title = "Visualization of pairs of bedtime/waketime";
    meta.published = "June 2022";
    meta.tags = ["sleep"];
    meta.tldr =
      "Healthmate can only show this data 7 days at a time and this annoys me";
    return meta;
  });
</script>

<p>wicked</p>
