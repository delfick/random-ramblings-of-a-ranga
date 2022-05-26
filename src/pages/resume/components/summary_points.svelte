<script lang="ts">
  import ResumeSection from "./resume_section.svelte";
  import HR from "./hr.svelte";
</script>

<HR />
<ResumeSection title="In Short" title_color="#b01919">
  <ul>
    <slot />
  </ul>
</ResumeSection>

<style lang="scss">
  ul {
    list-style: none;
  }
</style>
