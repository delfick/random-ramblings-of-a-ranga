<script lang="ts">
  import '../layout.css'
  import PageTransition from '@app/page_transition.svelte'
  import Nav from '@blog/nav.svelte'
  import ThemeToggle from '@blog/theme_toggle.svelte'

  import { page } from '$app/state'

  let pathname = $derived(page.url.pathname)

  interface Props {
    data: any
    children?: import('svelte').Snippet
  }

  let { children, data }: Props = $props()
  let base = $derived(data.base)
</script>

<svelte:body />

<Nav {base} />

<ThemeToggle hidden />

<PageTransition refresh={pathname}>
  {@render children?.()}
</PageTransition>
