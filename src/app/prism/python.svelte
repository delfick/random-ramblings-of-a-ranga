<script lang="ts">
    import Prism from "./aa.svelte";
    import "prismjs/components/prism-python.js";

    export let source: string;
</script>

<Prism language="python" {source} />
