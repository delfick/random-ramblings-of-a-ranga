<script lang="ts" context="module">
  import { loader } from "../_components/meta";
  import type { BlogMeta } from "../_components/meta";

  const { load, update } = loader((meta: BlogMeta): BlogMeta => {
    meta.title = "This blog article rules";
    meta.published = "27 May 2022";
    meta.tags = ["one", "two"];
    meta.tldr = "I decided to make a blog";
    return meta;
  });

  export { load, update };
</script>

<script lang="ts">
  import Prism from "@app/prism/python";
  import { dedent } from "ts-dedent";
</script>

<p>👋 Welcome you</p>
<p>The basic blog page layout is good</p>

<blockquote>
  Example of blockquote - Lorem ipsum dolor sit amet, consectetur adipiscing
  elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
</blockquote>

<p>Example code block:</p>

<Prism
  language="python"
  source={dedent`
    from people import me

    assert me.bestest
  `}
/>
