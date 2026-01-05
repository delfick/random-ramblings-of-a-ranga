<script lang="ts">
  import ThemeToggle from './theme_toggle.svelte'
  import avatar from '@assets/avatar.svg'
  import github_logo from '@assets/brands/github.png'
  import linkedin_logo from '@assets/brands/linkedin.png'
  import twitter_logo from '@assets/brands/twitter.png'
  import { fly } from 'svelte/transition'
  import { page } from '$app/state'

  let { base } = $props()

  let pathname = $derived(page.url.pathname)
</script>

<nav id="header" class="fixed top-0 z-10 w-full">
  <div
    style:width="100%"
    style:display="flex"
    class="mx-auto mt-0 flex-wrap items-center justify-between bg-white py-3 md:max-w-4xl dark:bg-dark-back"
  >
    <div class="pl-2" style:display="flex" style="align-items: center">
      <a href="/">
        <img
          class="avatar"
          src={avatar}
          style:height="50px"
          style:min-width="50px"
          alt="The delfick avatar"
          width="50px"
          height="50px"
        />
      </a>
      <ThemeToggle />
      {#if pathname.startsWith(`/${base}/posts`) || pathname.startsWith(`/${base}/tags`)}
        <div transition:fly|global={{ x: -20 }}>
          <a class="text" href="/{base}">
            {base.charAt(0).toUpperCase() + base.slice(1)}
          </a>
        </div>
      {/if}
    </div>

    <div
      id="nav-content"
      style:display="flex"
      style="align-items: center"
      class="z-20 flex-grow"
    >
      <ul
        style="display: flex; justify-content: end; list-style: none"
        class="list-reset flex-1 items-center"
      >
        <li class="mr-3">
          <a href="https://twitter.com/delfick" target="_blank">
            <img
              class="contact"
              src={twitter_logo}
              alt="Twitter logo"
              width="37px"
              height="30px"
            />
          </a>
        </li>
        <li class="mr-3">
          <a href="https://github.com/delfick" target="_blank">
            <img
              class="contact"
              src={github_logo}
              alt="Github Mark"
              width="30px"
              height="30px"
            />
          </a>
        </li>
        <li class="mr-3">
          <a href="https://www.linkedin.com/in/delfick/" target="_blank">
            <img
              class="contact"
              src={linkedin_logo}
              alt="LinkedIn Logo"
              width="35px"
              height="30px"
            />
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
