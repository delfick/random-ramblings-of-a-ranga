<style lang="scss">
  ul {
    list-style: none;
  }
</style>

<script lang="ts">
  import HR from './hr.svelte'
  import ResumeSection from './resume_section.svelte'
  interface Props {
    children?: import('svelte').Snippet
  }

  let { children }: Props = $props()
</script>

<HR />
<ResumeSection title="In Short" title_color="#b01919">
  <ul>
    {@render children?.()}
  </ul>
</ResumeSection>
