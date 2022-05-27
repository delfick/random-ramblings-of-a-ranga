<script>
  import Nav from "./_components/nav.svelte";
  import Tags from "./_components/tags.svelte";
  import Heading from "./_components/heading.svelte";
</script>

<svelte:body class="bg-gray-100 font-sans leading-normal tracking-normal" />

<Nav />

<div class="w-full max-w-4xl mx-auto pt-20">
  <div
    class="blog-content w-full px-4 md:px-6 text-xl text-gray-800 leading-normal"
    style="font-family:Georgia,serif;"
  >
    <Heading title="This blog article rules" published="27 May 2022" />

    <p>👋 Welcome you</p>
    <p>The basic blog page layout is good</p>

    <blockquote>
      Example of blockquote - Lorem ipsum dolor sit amet, consectetur adipiscing
      elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
    </blockquote>

    <p>Example code block:</p>
  </div>

  <hr class="border-b-2 border-gray-400 mx-4" />

  <Tags tags={["one", "two"]} />
</div>

<style lang="postcss">
  .blog-content {
    :global(p) {
      @apply py-6;
    }

    :global(blockquote) {
      @apply border-l-4 border-green-500 italic my-8 pl-8 md:pl-12;
    }
  }

  @media screen(md) {
    .blog-content {
      :global(blockquote) {
        @apply pl-12;
      }
    }
  }
</style>
