<script lang="ts">
  import avatar from "/avatar.png";
</script>

<main class="flex h-screen">
  <div class="grid grid-cols-1 gap-4 content-center m-auto">
    <div>
      <img src={avatar} style="display:inline" alt="The delfick avatar" />
    </div>
    <div><a href="https://github.com/delfick">Github</a></div>
    <div><a href="https://www.linkedin.com/in/delfick">LinkedIn</a></div>
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>
