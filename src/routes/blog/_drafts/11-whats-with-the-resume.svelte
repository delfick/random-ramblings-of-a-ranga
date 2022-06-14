<script lang="ts" context="module">
  import { loader } from "@blog/meta";
  import type { BlogMeta } from "@blog/meta";

  export const { load, update } = loader((meta: BlogMeta): BlogMeta => {
    meta.title = "So what's with the resume layout?";
    meta.published = "June 2022";
    meta.tags = ["resume", "me"];
    meta.tldr =
      "My resume isn't a normal layout despite people keep on telling me recruiters won't read it";
    return meta;
  });
</script>

<script lang="ts">
  import LinkedIn from "@blog/links/linkedin.svelte";
</script>

<p>
  I've always had a resume that's a little different to the typical format that
  you get. You know that one where the person lists the companies they worked
  for and some buzzwords because recruiters only respond to SEO?
</p>

<p>
  The latest version of my <a href="https://delfick.com/resume/engineer"
    >resume</a
  > is the opposite of that and me trying to explain who I am via story. Though I
  have compromised a little and included some dot points at the top!
</p>

<p>
  And the overwhelming feedback I get is "this is good but no-one will read it".
  So here's what I'm trying to do with my resume. (in dot point so people read
  them)
</p>

<ul>
  <li>Filter for workplaces that want people rather than cogs</li>
  <li>
    Programming is a social sport and attitude is far more important than
    knowledge and I want to showcase attitude
  </li>
  <li>
    The resume itself does not include my name, image or personal attributes. So
    the resume can be handed to my potential colleagues with less risk of
    unconscious bias. Those details can always be found on my <LinkedIn />.
  </li>
  <li>
    I want a career that focuses on me enabling other people and it seems that's
    not a standard role that is available and so I don't have a standard resume
  </li>
  <li>
    I'm taking a gamble that I don't scare away places that I would actually
    enjoy working for
  </li>
</ul>
