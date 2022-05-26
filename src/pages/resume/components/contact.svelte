<script lang="ts">
  import ResumeSection from "./resume_section.svelte";
  import HR from "./hr.svelte";

  export let source: string;
</script>

<HR before_contact />
<ResumeSection title="Contact" print_breakable={true} {source} />
