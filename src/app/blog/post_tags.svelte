<script lang="ts">
    import TagPill from "@blog/tag_pill.svelte";

    export let tags: Array<string>;
    export let published: string;
    export let margin = "-1rem";
</script>

<div
    class="border-sky-200 text-right border-t-2 full-width min-w-0 mt-2 p-2 !pb-1 bg-white rounded-lg dark:bg-gray-800 dark:shadow-dark-front"
    style={`margin-left: ${margin}; margin-right: ${margin}`}
>
    {#each tags as tag}
        <TagPill {tag} />
    {/each}

    <div class="dark:text-white">
        {published}
    </div>
</div>
