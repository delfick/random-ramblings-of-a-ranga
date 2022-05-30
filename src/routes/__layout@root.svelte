<script context="module">
  import ThemeToggle from "./blog/_components/theme_toggle.svelte";
</script>

<script lang="ts">
  import "./layout.postcss";
</script>

<svelte:head>
  <title>Random Ramblings of a Ranga</title>
</svelte:head>

<ThemeToggle hidden />
<slot />
