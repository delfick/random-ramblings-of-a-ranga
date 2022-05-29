<!-- Inspiration from https://letsbuildui.dev/articles/building-a-dark-mode-theme-toggle -->
<script lang="ts">
  import { theme } from "./theme";
  import Moon from "/assets/moon.svg";
  import Sun from "/assets/sun.svg";
  import DarkMode from "svelte-dark-mode";
  import type { Theme } from "svelte-dark-mode/types/DarkMode.svelte";
  import InlineSVG from "svelte-inline-svg";

  export let hidden = false;

  let val: Theme;

  let toggle = () => (val = val == "light" ? "dark" : "light");

  $: theme.set(val);
  $: isDark = val == "dark";
  $: if (typeof window !== "undefined") {
    document.body.className = val as string;

    const docEl = document.documentElement;

    if (isDark) {
      docEl.style.setProperty("--background", "#839495");
    } else {
      docEl.style.setProperty("--background", "#252525");
    }
  }

  if (typeof window.matchMedia === "undefined") {
    // So that tossr doesn't complain
    window.matchMedia = () =>
      ({
        matches: false,
        media: "light",
        onChange: () => {
          return;
        },
        addEventListener: () => {
          return;
        },
        removeEventListener: () => {
          return;
        },
      } as unknown as MediaQueryList);
  }
</script>

<DarkMode bind:theme={val} />

{#if !hidden}
  <button>
    <div class="icons" on:click={toggle}>
      {#if isDark}
        <InlineSVG src={Sun} />
      {:else}
        <InlineSVG src={Moon} />
      {/if}
    </div>
  </button>
{/if}

<style lang="postcss">
  .icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    margin: 0 5px;
  }

  .icons :global(svg) {
    fill: var(--background);
    z-index: 0;
  }
</style>
