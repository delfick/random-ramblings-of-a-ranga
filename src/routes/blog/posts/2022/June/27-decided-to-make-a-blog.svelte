<script lang="ts" context="module">
  import { loader } from "@blog/meta";
  import type { BlogMeta } from "@blog/meta";

  export const { load, update } = loader((meta: BlogMeta): BlogMeta => {
    meta.title = "This blog article rules";
    meta.published = "27 May 2022";
    meta.tags = ["one", "two"];
    meta.tldr = "I decided to make a blog";
    return meta;
  });
</script>

<script lang="ts">
  import { default as Python } from "@app/prism/python.svelte";
  import { dedent } from "ts-dedent";
</script>

<p>👋 Welcome you</p>
<p>The basic blog page layout is good</p>

<blockquote>
  Example of blockquote - Lorem ipsum dolor sit amet, consectetur adipiscing
  elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
</blockquote>

<p>Example code block:</p>

<Python
  source={dedent`
    from people import me

    assert me.bestest
  `}
/>
