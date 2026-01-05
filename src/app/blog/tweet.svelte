<script module lang="ts">
  import { writable } from 'svelte/store'

  let loaded = writable(false)
  const ready = () => {
    loaded.set(true)
  }
</script>

<script lang="ts">
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'

  import { mode } from 'mode-watcher'
  interface Props {
    href: string
    tweet: string
    minheight: number
  }

  let { href, tweet, minheight }: Props = $props()

  let wrapperWidth = $state(250)

  let el: HTMLElement = $state()
  const targetElementID = $derived(`tweet-container-${tweet}`)

  interface Settings {
    conversation: string
    cards: string
    theme: string
  }

  interface Widgets {
    createTweet: (tweet: string, el: HTMLElement, settings: Settings) => void
  }

  interface Twttr {
    widgets: Widgets
  }

  interface WindowWithTwitter {
    twttr: Twttr
  }

  $effect(() => {
    if (el && $loaded) {
      let widgets = (window as unknown as WindowWithTwitter).twttr.widgets
      el.innerHTML = ''
      widgets.createTweet(tweet, el, {
        conversation: 'none',
        cards: 'hidden',
        theme: mode.current || 'light'
      })
    }
  })

  onMount(() => {
    if (browser && Object.hasOwnProperty.call(window, 'twttr')) {
      loaded.set(true)
    }
  })
</script>

<svelte:head>
  <script
    async
    id="twitter-lib-script"
    data-testid="twitter-lib-script"
    onload={ready}
    src="//platform.twitter.com/widgets.js"
  ></script>
</svelte:head>

<div
  class="flex items-center justify-center"
  style="min-height: {minheight + 10}px"
  bind:clientWidth={wrapperWidth}
>
  {#if $loaded}
    <div
      bind:this={el}
      data-testid={targetElementID}
      id={targetElementID}
      style="min-height: {minheight}px; width: {wrapperWidth < 500
        ? wrapperWidth
        : 500}px"
      style:position="absolute"
      in:fade|global={{ duration: 1500 }}
    ></div>
  {:else}
    <div
      style="min-height: {minheight}px; width: {wrapperWidth < 500
        ? wrapperWidth
        : 500}px"
      style:position="absolute"
      out:fade|global={{ duration: 1000 }}
    >
      <p><a {href}>{href}</a></p>
    </div>
  {/if}
</div>
