<script lang="ts">
  export let tags: Array<string> = [];
</script>

<div class="text-base md:text-sm text-gray-500 px-4 py-3">
  Tags: {#each tags as tag, i}<a
      href="/blog/tags/{tag}"
      class="text-base md:text-sm text-green-500 no-underline hover:underline"
      >{tag}</a
    >{#if i != tags.length - 1}{", "}{/if}
  {/each}
</div>
