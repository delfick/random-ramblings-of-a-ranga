<style lang="scss">
  .resume-section {
    padding-top: 2rem;
  }

  .notoppadding {
    padding-top: 0 !important;
  }

  @media print {
    .print-breakable {
      page-break-inside: avoid;
    }
  }
</style>

<script module>
  export const hydrate = false
</script>

<script lang="ts">
  import Title from './title.svelte'
  import { marked } from 'marked'

  interface Props {
    title: string
    source?: string
    print_breakable?: boolean
    title_color?: string
    notoppadding?: boolean
    children?: import('svelte').Snippet
  }

  let {
    title,
    source = '',
    print_breakable = false,
    title_color = 'black',
    notoppadding = false,
    children
  }: Props = $props()

  let extraClass = $derived(print_breakable ? 'print-breakable' : '')
</script>

<div
  class="resume-section {extraClass}
    {notoppadding ? 'notoppadding' : ''}"
>
  <Title size={2} right color={title_color}>{title}</Title>
  {#if source === ''}
    {@render children?.()}
  {:else}
    {@html marked(source)}
  {/if}
</div>
