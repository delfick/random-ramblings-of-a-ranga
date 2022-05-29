<script lang="ts">
  import avatar from "/assets/avatar.svg";
  import github_logo from "/assets/brands/github.png";
  import linkedin_logo from "/assets/brands/linkedin.png";
  import twitter_logo from "/assets/brands/twitter.png";
  import ThemeToggle from "@app/theme_toggle.svelte";
  import { page } from "@roxi/routify";
</script>

<nav id="header" class="fixed w-full z-10 top-0">
  <div
    class="w-full md:max-w-4xl mx-auto flex flex-wrap items-center justify-between mt-0 py-3 bg-white dark:bg-dark-back"
  >
    <div class="pl-2">
      <a href="/">
        <img
          class="avatar"
          src={avatar}
          style:display="inline"
          style:height="50px"
          alt="The delfick avatar"
        />
      </a>
      <ThemeToggle />
      {#if $page.path.startsWith("/blog/posts")}
        <a class="text" href="/blog">Blog</a>
      {/if}
    </div>

    <div class="flex-grow z-20" id="nav-content">
      <ul class="list-reset flex justify-end flex-1 items-center">
        <li class="mr-3">
          <a href="https://twitter.com/delfick" target="_blank">
            <img class="contact" src={twitter_logo} alt="Twitter logo" />
          </a>
        </li>
        <li class="mr-3">
          <a href="https://github.com/delfick" target="_blank">
            <img class="contact" src={github_logo} alt="Github Mark" />
          </a>
        </li>
        <li class="mr-3">
          <a href="https://www.linkedin.com/in/delfick/" target="_blank">
            <img class="contact" src={linkedin_logo} alt="LinkedIn Logo" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<style lang="postcss">
  body.dark {
    nav {
      .contact {
        filter: invert(1) opacity(0.5) drop-shadow(0 0 0 red);
      }

      .avatar {
        @apply rounded-xl p-1;
        background: #e4e4e4;
        filter: invert(1);
      }
    }
  }
</style>
