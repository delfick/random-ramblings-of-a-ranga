<script lang="ts">
    import HR from "./hr.svelte";
    import ResumeSection from "./resume_section.svelte";

    export let source: string;
</script>

<HR before_contact />
<ResumeSection title="Contact" print_breakable={true} {source} />
