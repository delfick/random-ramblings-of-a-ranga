<script lang="ts">
    import HR from "./hr.svelte";
    import ResumeSection from "./resume_section.svelte";
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
