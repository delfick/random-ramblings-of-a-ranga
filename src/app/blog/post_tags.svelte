<script lang="ts">
  import TagPill from '@blog/tag_pill.svelte'

  interface Props {
    base: string
    tags: Array<string>
    published: string
    margin?: string
  }

  let { base, tags, published, margin = '-1rem' }: Props = $props()
</script>

<div
  class="full-width mt-2 min-w-0 rounded-lg border-t-2 border-sky-200 bg-white p-2 !pb-1 text-right dark:bg-gray-800 dark:shadow-dark-front"
  style={`margin-left: ${margin}; margin-right: ${margin}`}
>
  {#each tags as tag (tag)}
    <TagPill {base} {tag} />
  {/each}

  <div class="dark:text-white">
    {published}
  </div>
</div>
