<script context="module">
  import ThemeToggle from "@app/theme_toggle.svelte";
</script>

<script lang="ts">
  import "./layout.postcss";
</script>

<ThemeToggle hidden />
<slot />
