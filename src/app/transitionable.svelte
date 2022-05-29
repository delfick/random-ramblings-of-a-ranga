<script context="module">
  import { started } from "./app_started";
</script>

<script lang="ts">
  export let refresh: string;
  let changeable = false;

  let prev = refresh;

  $: {
    if (prev !== refresh) {
      prev = refresh;
      if ($started) {
        changeable = true;
      }
    }
    $started = true;
  }
</script>

<slot {changeable} />
