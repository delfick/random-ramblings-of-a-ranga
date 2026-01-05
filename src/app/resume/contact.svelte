<script lang="ts">
  import HR from './hr.svelte'
  import ResumeSection from './resume_section.svelte'

  interface Props {
    source: string
  }

  let { source }: Props = $props()
</script>

<HR before_contact />
<ResumeSection title="Contact" print_breakable={true} {source} />
