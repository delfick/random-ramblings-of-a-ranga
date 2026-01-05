<style lang="scss">
  hr {
    margin-bottom: 0;
  }

  @media print {
    hr.before-contact {
      display: none;
    }

    hr {
      display: block;
      height: 1px;
      background: transparent;
      width: 100%;
      border: none;
      border-top: solid 1px #aaa;
    }
  }
</style>

<script lang="ts">
  interface Props {
    before_contact?: boolean
  }

  let { before_contact = false }: Props = $props()
</script>

<hr class={before_contact ? 'before-contact' : ''} />
