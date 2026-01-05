<script lang="ts">
  import TLDR from '@blog/tldr.svelte'

  interface Props {
    tldr: string
    title: string
    published: string
  }

  let { tldr, title, published }: Props = $props()
</script>

<div class="font-sans">
  <h1 class="pt-6 pb-2 font-sans text-3xl font-bold break-normal md:text-4xl">
    {title}
  </h1>

  <TLDR>{tldr}</TLDR>

  <p class="!pt-0 text-right text-sm font-normal md:text-base">
    Published <strong>{published}</strong> - Stephen Moore
  </p>
</div>
