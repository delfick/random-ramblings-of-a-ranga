<script lang="ts">
  export let tags: Array<string>;
  export let published: string;
</script>

<div
  class="border-sky-200 text-right border-t-2 full-width min-w-0 mt-2 p-2 !pb-1 -ml-4 -mr-4 bg-white rounded-lg dark:bg-gray-800 dark:shadow-dark-front"
>
  {#each tags as tag}
    <a href="/blog/tags/{encodeURIComponent(tag)}">
      <span
        class="float-left inline-block dark:bg-gray-200 bg-black rounded-full px-3 text-sm font-semibold dark:text-gray-700 text-white mr-2"
        >#{tag}</span
      >
    </a>
  {/each}

  <div class="dark:text-white">
    {published}
  </div>
</div>
