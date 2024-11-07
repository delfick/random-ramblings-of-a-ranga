<li><slot /></li>

<style lang="scss">
    li::before {
        content: "\2022";
        color: #b01919;
        font-weight: bold;
        display: inline-block;
        width: 1em;
        margin-left: -1em;
    }
</style>
