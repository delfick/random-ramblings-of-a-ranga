<script lang="ts">
  import Prism from "@app/prism/aa";
  import "@app/prism/python";
  import { isDark } from "@app/theme";
  import dedent from "ts-dedent";
</script>

<!-- routify:options tags=["one", "two"] -->
<!-- routify:options published="27 May 2022" -->
<!-- routify:options title="This blog article rules" -->
<!-- routify:options tldr="I decided to make a blog" -->

<svelte:head>
  {#if $isDark}
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-solarized-dark-atom.min.css"
    />
  {:else}
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/themes/prism-solarizedlight.min.css"
    />
  {/if}
</svelte:head>

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
