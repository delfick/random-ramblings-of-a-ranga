<script context="module">
    export const hydrate = false;
</script>

<script lang="ts">
    import Title from "./title.svelte";
    import Markdown from "svelte-markdown";

    export let title: string;
    export let source = "";

    export let print_breakable = false;
    export let title_color = "black";

    $: extraClass = print_breakable ? "print-breakable" : "";
</script>

<div class="resume-section {extraClass}">
    <Title size={2} color={title_color}>{title}</Title>
    {#if source === ""}
        <slot />
    {:else}
        <Markdown {source} />
    {/if}
</div>

<style lang="scss">
    .resume-section {
        padding-top: 2rem;
    }

    @media print {
        .print-breakable {
            page-break-inside: avoid;
        }
    }
</style>
