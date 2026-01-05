<style>
  @media print {
    .is-two-thirds {
      width: 90%;
    }
  }
</style>

<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet
  }

  let { children }: Props = $props()
</script>

<section class="section">
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-two-thirds">
        {@render children?.()}
      </div>
    </div>
  </div>
</section>
