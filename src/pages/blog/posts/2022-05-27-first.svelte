<script>
  import Prism from "svelte-prism";

  let haveGrammar = false;
  let gotGrammar = () => {
    haveGrammar = true;
  };
</script>

<!-- routify:options tags=["one", "two"] -->
<!-- routify:options published="27 May 2022" -->
<!-- routify:options title="This blog article rules" -->
<!-- routify:options tldr="I decided to make a blog" -->

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/themes/prism-solarizedlight.min.css"
  />
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/components/prism-python.min.js"
    on:load={gotGrammar}></script>
</svelte:head>

<p>👋 Welcome you</p>
<p>The basic blog page layout is good</p>

<blockquote>
  Example of blockquote - Lorem ipsum dolor sit amet, consectetur adipiscing
  elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
</blockquote>

<p>Example code block:</p>

<Prism
  language={haveGrammar ? "python" : undefined}
  source={`
    from people import me

    assert me.bestest
  `}
/>
