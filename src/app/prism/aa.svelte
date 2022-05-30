<script context="module" lang="ts">
  import { browser } from "$app/env";
  import { default as _prism } from "prismjs";

  export const prism = _prism;
  export const highlight = _prism.highlightElement;
  export const globalConfig = {
    transform: (x: string | null): string | null => x,
  };
</script>

<script lang="ts">
  import "prism-svelte";
  import { onMount } from "svelte";

  onMount(() => {
    if (browser) {
      window.Prism = prism;
    }
  });

  export let language = "javascript";
  export let source = "";
  export let transform = (x: string | null) => x;
  let element: HTMLElement;
  let formattedCode: string | null;

  $: $$props && (source || element) && highlightCode();

  function highlightCode() {
    const grammar = prism.languages[language];
    let body = source || element.textContent;
    body = globalConfig.transform(body);
    body = transform(body);
    if (body) {
      formattedCode =
        language === "none" ? body : prism.highlight(body, grammar, language);
    }
  }
</script>

<code bind:this={element} style="display:none">
  <slot />
</code>

<pre class="language-{language}" command-line data-output="2-17"><code
    class="language-{language}"
    >{#if language === "none"}{formattedCode}{:else}{@html formattedCode}{/if}</code
  ></pre>
