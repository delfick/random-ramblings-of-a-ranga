<script lang="ts">
    export let before_contact = false;
</script>

<hr class={before_contact ? "before-contact" : ""} />

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
