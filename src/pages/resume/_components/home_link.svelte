<script lang="ts">
  import avatar from "/assets/avatar.svg";

  export let inline = false;

  $: className = inline ? "resume-home-link-inline" : "resume-home-link";
</script>

<a href="/" class={className} style:display="none">
  <img src={avatar} alt="The delfick avatar" />
</a>

<style lang="scss">
  @media screen and (min-width: 769px) {
    .resume-home-link {
      top: 20px;
      left: 20px;
      float: left;
      position: absolute;

      display: block !important;

      img {
        height: 50px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .resume-home-link-inline {
      float: left;

      display: block !important;

      img {
        height: 30px;
        padding-right: 10px;
        margin-bottom: -17px;
      }
    }
  }

  @media screen and (width: 768px) {
    .resume-home-link-inline {
      float: left;

      display: block !important;

      img {
        height: 30px;
        padding-right: 10px;
        margin-bottom: -17px;
      }
    }
  }
</style>
