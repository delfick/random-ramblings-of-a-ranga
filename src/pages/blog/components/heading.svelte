<script lang="ts">
  export let title: string;
  export let published: string;
</script>

<div class="font-sans">
  <h1
    class="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl"
  >
    {title}
  </h1>
  <p class="text-sm md:text-base font-normal text-gray-600">
    Published {published}
  </p>
</div>
