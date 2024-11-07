<script lang="ts">
    export let size = 0;
    export let color = "black";
    export let hide_overflow = false;
    export let right = false;

    $: component = `h${size || 1}`;
</script>

<svelte:element
    this={component}
    class="title {size === 0 ? '' : 'is-4'}"
    style:text-align={right ? "right" : "auto"}
    style:color
    style:overflow={hide_overflow ? "hidden" : "auto"}
>
    <slot />
</svelte:element>
