<script lang="ts" context="module">
  import { loader } from "@blog/meta";
  import type { BlogMeta } from "@blog/meta";

  export const { load, update } = loader((meta: BlogMeta): BlogMeta => {
    meta.title = "When you decide to make a blog";
    meta.published = "June 2022";
    meta.tags = ["blog"];
    meta.tldr =
      "I had some time so I went down a rabbit hole of how to add a static blog to my personal website and now I love sveltekit";
    return meta;
  });
</script>

<script lang="ts">
  import Tweet from "@blog/tweet.svelte";
</script>

<p>Seems all the cool kids have a blog, so let's go make one of those!</p>

<p>
  First step of course is to figure out the technology because for me the point
  is less about actually writing posts and more about playing with my computer.
  I'm under no illusion I'll post to this with any kind of frequency. (or at
  all?)
</p>

<h2>Where to start</h2>

<p>
  Obvious place to start is Hugo but I wanted to first see if there was anything
  out there that would give me some fancy WebGUI and so I spent quite a while
  hunting down a unicorn
</p>

<p>
  There are things that exist for this purpose but they aren't particularly
  good. I imagine there's lots of really cool stuff on those backends, but the
  frontend is what I care about and they all had that feeling of a WYSIWYG in
  that it's only great if you're not familiar with a text editor, otherwise it's
  quite limiting and awkward
</p>

<p>
  For example, take <a href="https://www.netlifycms.org/">Netlify CMS</a> which is
  nice in that it tries to also integrate with github so you still get the nice things
  we get from git. But it's UI doesn't add anything to what I get from writing html.
  Also I couldn't get it to work and it played a pattern I saw with several things
  where the template has so much stuff in it at varying levels of maturity that some
  of it is just broken
</p>

<p>
  Plus that usual JS problem where you realise you need some feature in a
  version of something that is just plain incompatible with everything else
</p>

<p>
  I was also hampered by trying to learn 5 new web technologies at the same time
  and cloning a random template and trying to change it is an awful way to learn
  something!
</p>

<h2>What I already had</h2>

<p>
  Looking at the commit history for the code that sat on delfick.com I decided
  around June 2020 that I should probably revamp my resume. So I went on a
  Journey of making it so I could generate static html using webpack and react.
  What I made was pretty cool. I used yaml to have the content of the resume and
  then used react to turn that yaml into html and then webpack generated static
  HTML.
</p>

<p>
  It wasn't till July 2021 that I actually went about writing that content, but
  it was very helpful to have the infrastructure there!
</p>

<p>
  So When it came to writing a blog I decided to put that in a separate repo and
  then make netlify serve <mark>/blog</mark> as this new repo. This turned out
  to be way more annoying than I anticipated because the frameworks I was trying
  to make work really didn't like me trying to make it serve from
  <mark>/blog</mark>. But I did get it to work eventually.
</p>

<h2>Svekyll</h2>

<Tweet
  tweet="1525703579038003200"
  minheight={273}
  href="https://twitter.com/delfick/status/1525703579038003200"
/>

<p>
  I ended up using <a href="https://svekyll.com/">Svekyll</a> which is a
  <a href="https://kit.svelte.dev/">sveltekit</a> project that behaves similar
  to
  <a href="https://jekyllrb.com/">Jekyll</a>. At this point I hadn't come across
  svelte before, or tailwind, or vite and that was a bit much for me to take in
  all in one go.
</p>

<p>
  So I ended up giving up on svekyll because I couldn't quite figure it out and
  I used svelte, vite and routify by themselves. On a side note, the <a
    href="https://svelte.dev/tutorial/basics">tutorial for svelte</a
  >
  is amazing. Instantly fell in love with svelte, it's incredible. After a while
  I started to struggle to make some things work (like SSR) and I was starting to
  write some rather hacky code and so I gave up on that and decided to
  <a
    href="https://github.com/delfick/random-ramblings-of-a-ranga/commit/14354acd1a9df854dffbd0a243db379294a17f7f"
    >convert it to sveltekit</a
  > which took an entire day and was very worth it.
</p>

<p>
  So what I have now is an absolute joy to work with and I get some very cool
  things like how well SSR and HMR works and how quickly netlify builds the
  production website.
</p>
